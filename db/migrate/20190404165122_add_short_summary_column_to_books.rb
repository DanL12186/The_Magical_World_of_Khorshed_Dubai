class AddShortSummaryColumnToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :short_summary, :string
  end
end
