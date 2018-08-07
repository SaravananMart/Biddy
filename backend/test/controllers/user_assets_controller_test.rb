require 'test_helper'

class UserAssetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_asset = user_assets(:one)
  end

  test "should get index" do
    get user_assets_url
    assert_response :success
  end

  test "should get new" do
    get new_user_asset_url
    assert_response :success
  end

  test "should create user_asset" do
    assert_difference('UserAsset.count') do
      post user_assets_url, params: { user_asset: { asset_name: @user_asset.asset_name, count: @user_asset.count, returned: @user_asset.returned, status: @user_asset.status, user_id: @user_asset.user_id } }
    end

    assert_redirected_to user_asset_url(UserAsset.last)
  end

  test "should show user_asset" do
    get user_asset_url(@user_asset)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_asset_url(@user_asset)
    assert_response :success
  end

  test "should update user_asset" do
    patch user_asset_url(@user_asset), params: { user_asset: { asset_name: @user_asset.asset_name, count: @user_asset.count, returned: @user_asset.returned, status: @user_asset.status, user_id: @user_asset.user_id } }
    assert_redirected_to user_asset_url(@user_asset)
  end

  test "should destroy user_asset" do
    assert_difference('UserAsset.count', -1) do
      delete user_asset_url(@user_asset)
    end

    assert_redirected_to user_assets_url
  end
end
