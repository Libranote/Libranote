class CreateLevel < ActiveRecord::Migration[5.1]
  def change
    create_table :levels do |t|
      t.belongs_to :school, index: true
      t.string :name
    end
  end
end
