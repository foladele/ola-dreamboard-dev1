class CreateTexts < ActiveRecord::Migration[5.2]
  def change
    create_table :texts do |t|
      t.integer :section_id
      t.string :title
      t.string :kind
      t.text :content

      t.timestamps
    end
  end
end
