require 'httparty'
class ProductsController < ApplicationController
  # Directly proxy the Gumroad /products/search endpoint
  def search
    render plain: HTTParty.get("https://gumroad.com/products/search?#{request.query_string}")
  end
end