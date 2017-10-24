# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171023210234) do

  create_table "admins", force: :cascade do |t|
    t.integer "school_id"
    t.string "username", null: false
    t.string "real_name"
    t.string "password", null: false
    t.index ["school_id"], name: "index_admins_on_school_id"
  end

  create_table "classes", force: :cascade do |t|
    t.integer "level_id"
    t.string "name"
    t.index ["level_id"], name: "index_classes_on_level_id"
  end

  create_table "levels", force: :cascade do |t|
    t.integer "school_id"
    t.string "name"
    t.index ["school_id"], name: "index_levels_on_school_id"
  end

  create_table "schools", force: :cascade do |t|
    t.string "name"
    t.string "adress"
  end

end
