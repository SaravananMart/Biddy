Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  post 'auth_user' => 'authentication#authenticate_user'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    get 'info' => 'api#info'
    # resources :user_assets
    # resources :users
    # resources :company_assets

  get '/products' => 'products#search'
  resources :products

  get '/biddings/admin' => 'biddings#get_all_bid_dates'
  get '/biddings/best' => 'biddings#free_bid_dates'
  get '/biddings/total_bid' => 'biddings#total_bid_count'
  get 'biddings/bid_details' => 'biddings#get_bid_details_for_date'
  get 'biddings/approved_dates' => 'biddings#get_approved_dates'
  post '/biddings/approve_bid' => 'biddings#bid_approval'
  resources :biddings


  get '/user_products/products' => 'user_products#user_products'
  resources :user_products

  get "/404" => "error#not_found"
  get "/500" => "error#exception"
end
