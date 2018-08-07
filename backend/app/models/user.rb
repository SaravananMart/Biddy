class User < ApplicationRecord
  devise :database_authenticatable, :recoverable, :rememberable, :validatable
  has_many :user_assets
  accepts_nested_attributes_for :user_assets
  default_scope {where(:status => true)}
end
