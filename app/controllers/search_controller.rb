class SearchController < ApplicationController
  def index
    # request.format = :json
    respond_to do |format|
      format.html
      format.json {
        if params[:top_level_category] == "3d"
          render json: ProductData.three_d
        else
          render json: ProductData.send(params[:top_level_category].underscore)
        end

      }
    end
  end

  class CategoryConstraints
    TOP_LEVEL_CATEGORIES = [
      "3d",
      "drawing-and-painting"
    ]
    def matches?(request)
      TOP_LEVEL_CATEGORIES.include?(request.params[:top_level_category])
    end
  end
end