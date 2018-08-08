class AuthenticationController < ApplicationController

  def authenticate_user
    if params[:username].present?
      email_credentials = params[:username]
    else
      email_credentials = params[:email]
    end
    user = User.find_for_database_authentication(email: email_credentials)
    if user.present? and user.valid_password?(params[:password])
      render json: payload(user)
    else
      render json: {errors: ['Invalid Username/Password']}, status: :unauthorized
    end
  end

  private

  def payload(user)
    return nil unless user and user.id
    {
        access_token: JsonWebToken.encode({user_id: user.id}),
        user_id: user.id
    }
  end
end