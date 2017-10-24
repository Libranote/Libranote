class Api::SchoolController < ActionController::API
  def show
    school = School.first
    render json: {
      'name' => school.name,
      'adress' => school.adress
    }
  end
end
