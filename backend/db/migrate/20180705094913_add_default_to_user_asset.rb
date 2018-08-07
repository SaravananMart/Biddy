class AddDefaultToUserAsset < ActiveRecord::Migration[5.2]
  def change
    change_column :user_assets, :status, :string, :default => "-1"
  end
end