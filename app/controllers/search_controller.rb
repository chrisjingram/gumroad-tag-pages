class SearchController < ApplicationController
  def index
    @initial_selected_tag_keys = params[:tags]&.split(",")
    @search_page_description = SearchPageDescription.find_by(breadcrumbs: params[:top_level_category], tags: params[:tags])&.description
    respond_to do |format|
      format.html
    end
  end

  class CategoryConstraints
    def matches?(request)
      CategoryData.all_categories_slugs.include?(request.params[:top_level_category])
    end
  end
end