class AddBookPixelDimensions < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :pixel_width, :integer
    add_column :books, :pixel_height, :integer    
  end
end
