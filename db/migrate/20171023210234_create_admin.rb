class CreateAdmin < ActiveRecord::Migration[5.1]
  def change
    create_table :admins do |t|
      t.belongs_to :school, index: true
      t.string :username, null: false
      t.string :real_name
      t.string :password, null: false
    end
  end
end
