class CreateCollectionAccesses < ActiveRecord::Migration[7.1]
  def change
    create_table :collection_accesses do |t|
      t.integer :collection_id
      t.integer :organization_id
      t.text :data_agreement

      t.timestamps
    end
  end
end
