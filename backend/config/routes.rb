Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users

  post 'auth_user' => 'authentication#authenticate_user'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    get 'info' => 'api#info'
    # resources :user_assets
    # resources :users
    # resources :company_assets
  get "/404" => "error#not_found"
  get "/500" => "error#exception"
end
