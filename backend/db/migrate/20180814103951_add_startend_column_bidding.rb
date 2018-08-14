class AddStartendColumnBidding < ActiveRecord::Migration[5.2]
  def change
  	add_column :biddings , :from, :datetime
  	add_column :biddings , :to, :datetime
  end
end
