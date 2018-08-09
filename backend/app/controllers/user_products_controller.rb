class UserProductsController < ApplicationController
  before_action :set_user_product, only: [:show, :update, :destroy]

  def index
    @user_products = UserProduct.all
  end

  def show
  end

  def create
    @user_product = UserProduct.new(user_product_params)

    if @user_product.save
      render :show, status: :created, location: @user_product
    else
      render json: @user_product.errors, status: :unprocessable_entity
    end
  end

  def user_products
    count = BiddingService.get_bid_count(params)
    products = UserProduct.where(:user_id => params[:uid]).to_json(:include => {:product => { }})
    render json: {"products" => JSON.parse(products), "count"=>count}
  end

  def update
    if @user_product.update(user_product_params)
      render :show, status: :ok, location: @user_product
    else
      render json: @user_product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user_product.destroy
  end

  private
    def set_user_product
      @user_product = UserProduct.find(params[:id])
    end

    def user_product_params
      params.fetch(:user_product, {})
    end
end
