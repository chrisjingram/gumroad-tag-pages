class CategoryData
  def self.all_categories
    [
      "3D",
      "Design",
      "Drawing & Painting",
      "Software Development",
      "Self Improvement",
      "Fitness & Health",
      "Music & Sound Design",
      "Photography",
      "Writing & Publishing",
      "Business & Money",
      "Education",
      "Comics & Graphic Novels",
      "Fiction Books",
      "Audio",
      "Recorded Music",
      "Films",
      "Gaming",
      "Other"
    ]
  end
  def self.all_categories_slugs
    all_categories.map { |category| category.downcase.gsub("&", "and").parameterize }
  end
end