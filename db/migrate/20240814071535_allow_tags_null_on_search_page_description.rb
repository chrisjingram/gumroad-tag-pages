class AllowTagsNullOnSearchPageDescription < ActiveRecord::Migration[7.2]
  def change
    change_column :search_page_descriptions, :tags, :string, null: true
  end
end
