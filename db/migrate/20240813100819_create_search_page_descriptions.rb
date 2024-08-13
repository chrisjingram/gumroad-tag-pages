class CreateSearchPageDescriptions < ActiveRecord::Migration[7.2]
  def change
    create_table :search_page_descriptions do |t|
      t.string :breadcrumbs, null: false
      t.string :tags, null: false
      t.text :description, null: false
      t.timestamps
    end
  end
end
