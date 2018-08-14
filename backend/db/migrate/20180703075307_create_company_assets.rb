class CreateCompanyAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :company_assets do |t|
      t.string :name
      t.integer :count

      t.timestamps
    end
  end
end
