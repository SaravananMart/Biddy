class RenameColumnUserAsset < ActiveRecord::Migration[5.2]
  def change
    rename_column :user_assets, :asset_name, :name
  end
end
