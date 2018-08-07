class ChangeReturnedToBooleanInUserAssets < ActiveRecord::Migration[5.2]
  def change
    change_column :user_assets, :returned, :boolean, :default => false
  end
end
