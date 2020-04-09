class RemovePaperclipColumnsFromImages < ActiveRecord::Migration[5.2]
  def change
  	remove_column :images, :image_file_name
    remove_column :images, :image_content_type
    remove_column :images, :image_file_size
    remove_column :images, :image_updated_at
  end
end
