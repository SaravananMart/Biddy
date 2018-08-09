json.extract! user_product, :id, :created_at, :updated_at
json.url user_product_url(user_product, format: :json)
