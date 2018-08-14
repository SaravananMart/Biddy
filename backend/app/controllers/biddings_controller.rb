class BiddingsController < ApplicationController
  # before_action :authenticate_request!

  before_action :set_bidding, only: [:show, :update, :destroy]

  def index
    @biddings = Bidding.all
  end

  def show
  end

  def get_all_bid_dates
    dates = BiddingService.get_all_bid_dates(params)
    render json: dates
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
    approval = BiddingService.approve_bid_dates(params)
    render json: approval
  end

  def get_bid_details_for_date
    details = BiddingService.get_bid_details_for_date(params)
    render json: details
  end

  def get_approved_dates
    dates = BiddingService.get_approved_dates(params)
    render json: dates
  end

  def create
    count = 0
    days = ((Date.parse(bidding_params[:to_date]).mjd - (Date.parse(bidding_params[:from_date])).mjd)).to_i + 1
    date = Date.parse(bidding_params[:from_date])
    (1..days).each do |d|
      @bidding = Bidding.new(:from_date => date, :to_date => date, :days => days, :markup => bidding_params[:markup], :user_id => bidding_params[:user_id], :product_id => bidding_params[:product_id], :status => 0, :from => bidding_params[:from_date], :to => bidding_params[:to_date])
       date = date + 1.days
      if @bidding.save
        count = count + 1
      end
    end

    if count == days
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
