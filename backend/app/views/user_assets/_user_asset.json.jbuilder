json.extract! user_asset, :id, :asset_name, :count, :status, :returned, :user_id, :created_at, :updated_at
json.url user_asset_url(user_asset, format: :json)
