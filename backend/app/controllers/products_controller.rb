class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]
  
  def index
    @products = Product.all
  end

  
  def show
  end

  def search
    binding.pry
    search_key = params[:q]
    products = Product.where("name LIKE '%#{search_key}%'")
    render json: products
  end

  
  def create
    @product = Product.new(product_params)
    status = ''
    if @product.save
      status = "true"
    else
      status = "false"
    end
    render json: status
  end

  
  def update
    if @product.update(product_params)
      render :show, status: :ok, location: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  
  def destroy
    @product.destroy
  end

  private
  
  def set_product
    @product = Product.find(params[:id])
  end

  
  def product_params
    params.require(:product).permit(:name)
  end
end
