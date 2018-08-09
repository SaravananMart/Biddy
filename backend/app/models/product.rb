class Product < ApplicationRecord
	has_many :users
	has_many :user_products
	has_many :biddings
end
