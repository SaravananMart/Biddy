class BiddingsController < ApplicationController
  # before_action :authenticate_request!

  before_action :set_bidding, only: [:show, :update, :destroy]

  def index
    @biddings = Bidding.all
  end

  def show
  end

  def free_bid_dates
    dates = BiddingService.get_free_bid_dates(params)
    render json: dates
  end

  def total_bid_count
    bid_count = BiddingService.total_bid_count(params)
    render json: bid_count
  end

  def bid_approval
    approval = BiddingService.approve_bid_dates
    render json: approval
  end

  def get_bid_details
    details = BiddingService.get_bid_details_for_date
    render json: details
  end

  def create
    @bidding = Bidding.new(bidding_params)

    if @bidding.save
      render json: "success"
    else
      render json: @bidding.errors, status: :unprocessable_entity
    end
  end

  def update
    if @bidding.update(bidding_params)
      render :show, status: :ok, location: @bidding
    else
      render json: @bidding.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @bidding.destroy
  end

  private
    def set_bidding
      @bidding = Bidding.find(params[:id])
    end
    
    def bidding_params
      params.require(:bidding).permit(:from_date, :to_date, :days, :markup, :user_id, :product_id, :status)
    end
end
