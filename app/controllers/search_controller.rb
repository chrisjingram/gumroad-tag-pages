class SearchController < ApplicationController
  def index
    # Pass initially selected tags and search page description to the React view as props
    @initial_selected_tag_keys = params[:tags]&.split(",")
    # Pass descriptions for tag and category to the React view as props
    @search_page_description_for_tag = SearchPageDescription.find_by(breadcrumbs: params[:top_level_category], tags: params[:tags])&.description
    @search_page_description_for_category = SearchPageDescription.find_by(breadcrumbs: params[:top_level_category], tags: nil)&.description
    respond_to do |format|
      format.html
    end
  end

  # Used in routes.rb constrain the route to only valid categories
  # Because category pages are accessed on the the root for example /drawing-and-painting
  class CategoryConstraints
    def matches?(request)
      CategoryData.all_categories_slugs.include?(request.params[:top_level_category])
    end
  end
end