require 'httparty'
class ProductsController < ApplicationController
  def search
    render plain: HTTParty.get("https://gumroad.com/products/search?#{request.query_string}")
  end
end