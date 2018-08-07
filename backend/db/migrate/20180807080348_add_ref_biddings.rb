class AddRefBiddings < ActiveRecord::Migration[5.2]
  def change
  	add_reference :biddings, :user, index: true
  	add_reference :biddings, :product, index: true
  end
end
