class CreateUserAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :user_assets do |t|
      t.string :asset_name
      t.integer :count
      t.string :status
      t.string :returned
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
