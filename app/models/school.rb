class School < ApplicationRecord
  has_many :levels
  has_many :admins
end
