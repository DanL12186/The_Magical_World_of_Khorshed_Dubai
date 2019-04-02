class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :name
      t.string :category
      t.string :age_group
      t.string :format

      t.integer :page_count
    end
  end
end
