class ApiController < ApplicationController
  before_action :authenticate_request!

  def info
    render json: {
        'name': current_user.name,
        'email': current_user.email
    }
  end
end
