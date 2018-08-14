class AddStatusColumnBidding < ActiveRecord::Migration[5.2]
  def change
  	add_column :biddings, :status, :integer
  end
end
