class ExtendForBotToStores < ActiveRecord::Migration[5.2]
  def change
    add_column :stores, :call_id, :string
    add_index :stores, :call_id, :unique => false
  end
end
