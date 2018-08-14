require 'test_helper'

class BiddingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bidding = biddings(:one)
  end

  test "should get index" do
    get biddings_url, as: :json
    assert_response :success
  end

  test "should create bidding" do
    assert_difference('Bidding.count') do
      post biddings_url, params: { bidding: { days: @bidding.days, from_date: @bidding.from_date, markup: @bidding.markup, to_date: @bidding.to_date } }, as: :json
    end

    assert_response 201
  end

  test "should show bidding" do
    get bidding_url(@bidding), as: :json
    assert_response :success
  end

  test "should update bidding" do
    patch bidding_url(@bidding), params: { bidding: { days: @bidding.days, from_date: @bidding.from_date, markup: @bidding.markup, to_date: @bidding.to_date } }, as: :json
    assert_response 200
  end

  test "should destroy bidding" do
    assert_difference('Bidding.count', -1) do
      delete bidding_url(@bidding), as: :json
    end

    assert_response 204
  end
end
