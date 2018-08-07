class CreateBiddings < ActiveRecord::Migration[5.2]
  def change
    create_table :biddings do |t|
      t.datetime :from_date
      t.datetime :to_date
      t.integer :days
      t.integer :markup

      t.timestamps
    end
  end
end
