class AddDefaultValueBiddings < ActiveRecord::Migration[5.2]
  def change
  	change_column :biddings, :status, :integer, :default => 0
  end
end
