class AddReferenceUserProduct < ActiveRecord::Migration[5.2]
  def change
  	add_reference :user_products, :user, index: true
  	add_reference :user_products, :product, index: true
  end
end
