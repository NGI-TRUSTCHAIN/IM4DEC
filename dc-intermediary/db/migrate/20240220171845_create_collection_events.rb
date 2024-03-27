class CreateCollectionEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :collection_events do |t|
      t.integer :collection_id
      t.integer :user_id
      t.datetime :timestamp
      t.integer :event_type
      t.text :event_object
      t.string :event

      t.timestamps
    end
  end
end