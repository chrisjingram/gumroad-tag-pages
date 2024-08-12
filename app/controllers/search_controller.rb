class SearchController < ApplicationController
  def index
    # request.format = :json
    if params[:top_level_category] == "3d"
      @product_data = ProductData.three_d
    else
      @product_data = ProductData.send(params[:top_level_category].underscore)
    end
    @initial_selected_tags = params[:tags]&.split(",")
    respond_to do |format|
      format.html
      format.json {
        if params[:top_level_category] == "3d"
          render json: @product_data
        else
          render json: @product_data
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