class User < ApplicationRecord
  devise :database_authenticatable, :recoverable, :rememberable, :validatable
  has_many :products
  has_many :user_products
  has_many :biddings
end
