class CreateSections < ActiveRecord::Migration[5.2]
  def change
    create_table :sections do |t|
      t.string :title
      t.string :color
      t.boolean :collapse
      t.string :kind

      t.timestamps
    end
  end
end
