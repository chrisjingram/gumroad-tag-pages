class SearchPageDescription < ApplicationRecord
  validates :breadcrumbs, presence: true
  validates :description, presence: true

  # Script to generate category/search page descriptions
  # Calls Claude API for top-level categories and top-level category + tag
  # /drawing-and-painting will have a different description to /drawing-and-painting?tags=procreate
  def self.generate_descriptions
    CategoryData.all_categories.each do |category|
      category_slug = category.gsub("&", "and").parameterize
      # Get all tags for a category from Gumroad API
      response = HTTParty.get("https://gumroad.com/products/search?taxonomy=#{category_slug}")
      tags = JSON.parse(response.body)['tags_data'].map { |tag_data| tag_data['key'] }

      # Generate descriptions for single tags
      # Skip if already generated
      tags.each do |tag|
        next if find_by(breadcrumbs: category_slug, tags: tag).present?
        description = call_claude_api(category_slug, [tag])
        create!(
          breadcrumbs: category_slug,
          tags: tag,
          description: description
        )
        sleep(1.5) # 50 requests per minute to claude 3.5 sonnet
      end

      # Generate description for no tags
      # Skip if already generated
      next if find_by(breadcrumbs: category_slug, tags: nil).present?
      description = call_claude_api(category_slug, [])
      create!(
        breadcrumbs: category_slug,
        tags: nil,
        description: description
      )
      sleep(1.5) # 50 requests per minute to claude 3.5 sonnet
    end
  end

  private

  def self.call_claude_api(category, tags)
    client = Anthropic::Client.new(
      access_token: Rails.application.credentials.dig(:claude_api_key)
    )

    # Prompt for Claude API to generate category descriptions with SEO in mind for a category and tag combination
    # AI likes to oversell things, so I've told it to "not make it too fun" which always seems push it more towards feeling human-written
    # It's never a good idea to publish AI content directly, so in reality we'd want a human copywriter to review and edit the content
    system_prompt = "You are an AI assistant tasked with writing introduction/summary paragraphs for category pages for the Gumroad marketplace. Your goal is to create content that is optimized for search engine ranking while providing valuable information to users. Do not make it too fun. Do not 'welcome' people as the first sentence'"
    user_prompt = "Write an introduction paragraph for a marketplace page with:\nCategory: #{category}\nTag(s): #{tags.join(', ')}\n\nAim for 100 words."

    begin
      response = client.messages(
        parameters: {
          model: 'claude-3-5-sonnet-20240620',
          system: system_prompt,
          messages: [
            { "role": "user", "content": user_prompt }
          ],
          max_tokens: 300
        }
      )
      response.with_indifferent_access.dig(:content, 0, :text).strip
    rescue Faraday::ServerError, Faraday::ClientError => e
      # Retry on server error or client error (5xx or 4xx)
      # Anthropic API is often overloaded and returns 529
      Rails.logger.error("Error calling Claude API: #{e.message}")
      Rails.logger.info("Retrying...")
      retry
    rescue Anthropic::Error => e
      Rails.logger.error("Error calling Claude API: #{e.message}")
      raise "Unable to generate description for #{category} - #{tags.join(', ')}."
    end
  end
end