class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :name
      t.string :category
      t.string :age_group
      t.string :format

      #total number of pages not including front and back cover (n-2)
      t.integer :page_count
    end
  end
end
