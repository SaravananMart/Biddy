class BiddingsController < ApplicationController
  before_action :set_bidding, only: [:show, :update, :destroy]

  # GET /biddings
  # GET /biddings.json
  def index
    @biddings = Bidding.all
  end

  # GET /biddings/1
  # GET /biddings/1.json
  def show
  end

  def free_bid_dates
    dates = BiddingService.get_free_bid_dates
    render json: dates
  end

  # POST /biddings
  # POST /biddings.json
  def create
    @bidding = Bidding.new(bidding_params)

    if @bidding.save
      render :show, status: :created, location: @bidding
    else
      render json: @bidding.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /biddings/1
  # PATCH/PUT /biddings/1.json
  def update
    if @bidding.update(bidding_params)
      render :show, status: :ok, location: @bidding
    else
      render json: @bidding.errors, status: :unprocessable_entity
    end
  end

  # DELETE /biddings/1
  # DELETE /biddings/1.json
  def destroy
    @bidding.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bidding
      @bidding = Bidding.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def bidding_params
      params.require(:bidding).permit(:from_date, :to_date, :days, :markup)
    end
end
