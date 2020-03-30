class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.integer :section_id
      t.string :title
      t.string :description
      t.string :kind

      t.timestamps
    end
  end
end
