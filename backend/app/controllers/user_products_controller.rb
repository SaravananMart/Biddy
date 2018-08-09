class UserProductsController < ApplicationController
  before_action :set_user_product, only: [:show, :update, :destroy]

  # GET /user_products
  # GET /user_products.json
  def index
    @user_products = UserProduct.all
  end

  # GET /user_products/1
  # GET /user_products/1.json
  def show
  end

  # POST /user_products
  # POST /user_products.json
  def create
    @user_product = UserProduct.new(user_product_params)

    if @user_product.save
      render :show, status: :created, location: @user_product
    else
      render json: @user_product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_products/1
  # PATCH/PUT /user_products/1.json
  def update
    if @user_product.update(user_product_params)
      render :show, status: :ok, location: @user_product
    else
      render json: @user_product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_products/1
  # DELETE /user_products/1.json
  def destroy
    @user_product.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_product
      @user_product = UserProduct.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_product_params
      params.fetch(:user_product, {})
    end
end
