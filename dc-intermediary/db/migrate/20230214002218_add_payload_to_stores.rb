class AddPayloadToStores < ActiveRecord::Migration[5.2]
  def change
    add_column :stores, :payload, :text
  end
end