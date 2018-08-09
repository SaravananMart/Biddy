class AddColumnProducts < ActiveRecord::Migration[5.2]
  def change
  	add_column :user_products, :price, :string
  	add_column :user_products, :image_url, :string
  end
end
