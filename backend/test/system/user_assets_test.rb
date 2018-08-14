require "application_system_test_case"

class UserAssetsTest < ApplicationSystemTestCase
  setup do
    @user_asset = user_assets(:one)
  end

  test "visiting the index" do
    visit user_assets_url
    assert_selector "h1", text: "User Assets"
  end

  test "creating a User asset" do
    visit user_assets_url
    click_on "New User Asset"

    fill_in "Asset Name", with: @user_asset.asset_name
    fill_in "Count", with: @user_asset.count
    fill_in "Returned", with: @user_asset.returned
    fill_in "Status", with: @user_asset.status
    fill_in "User", with: @user_asset.user_id
    click_on "Create User asset"

    assert_text "User asset was successfully created"
    click_on "Back"
  end

  test "updating a User asset" do
    visit user_assets_url
    click_on "Edit", match: :first

    fill_in "Asset Name", with: @user_asset.asset_name
    fill_in "Count", with: @user_asset.count
    fill_in "Returned", with: @user_asset.returned
    fill_in "Status", with: @user_asset.status
    fill_in "User", with: @user_asset.user_id
    click_on "Update User asset"

    assert_text "User asset was successfully updated"
    click_on "Back"
  end

  test "destroying a User asset" do
    visit user_assets_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "User asset was successfully destroyed"
  end
end
