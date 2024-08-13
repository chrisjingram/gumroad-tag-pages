class AddUniqueIndexToSearchPageDescriptions < ActiveRecord::Migration[7.2]
  def change
    add_index :search_page_descriptions, [:breadcrumbs, :tags], unique: true
  end
end
