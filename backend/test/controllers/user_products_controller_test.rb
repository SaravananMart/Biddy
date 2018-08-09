require 'test_helper'

class UserProductsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_product = user_products(:one)
  end

  test "should get index" do
    get user_products_url, as: :json
    assert_response :success
  end

  test "should create user_product" do
    assert_difference('UserProduct.count') do
      post user_products_url, params: { user_product: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show user_product" do
    get user_product_url(@user_product), as: :json
    assert_response :success
  end

  test "should update user_product" do
    patch user_product_url(@user_product), params: { user_product: {  } }, as: :json
    assert_response 200
  end

  test "should destroy user_product" do
    assert_difference('UserProduct.count', -1) do
      delete user_product_url(@user_product), as: :json
    end

    assert_response 204
  end
end
