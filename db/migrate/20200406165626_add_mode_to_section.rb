class AddModeToSection < ActiveRecord::Migration[5.2]
  def change
  	add_column :sections, :mode, :string
  end
end
