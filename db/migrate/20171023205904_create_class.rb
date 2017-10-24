class CreateClass < ActiveRecord::Migration[5.1]
  def change
    create_table :classes do |t|
      t.belongs_to :level, index: true
      t.string :name
    end
  end
end
