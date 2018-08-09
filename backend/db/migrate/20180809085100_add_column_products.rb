class AddColumnProducts < ActiveRecord::Migration[5.2]
  def change
  	add_column :products, :price, :string
  	add_column :products, :image_url, :string
  end
end
