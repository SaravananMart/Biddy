require "application_system_test_case"

class CompanyAssetsTest < ApplicationSystemTestCase
  setup do
    @company_asset = company_assets(:one)
  end

  test "visiting the index" do
    visit company_assets_url
    assert_selector "h1", text: "Company Assets"
  end

  test "creating a Company asset" do
    visit company_assets_url
    click_on "New Company Asset"

    fill_in "Count", with: @company_asset.count
    fill_in "Name", with: @company_asset.name
    click_on "Create Company asset"

    assert_text "Company asset was successfully created"
    click_on "Back"
  end

  test "updating a Company asset" do
    visit company_assets_url
    click_on "Edit", match: :first

    fill_in "Count", with: @company_asset.count
    fill_in "Name", with: @company_asset.name
    click_on "Update Company asset"

    assert_text "Company asset was successfully updated"
    click_on "Back"
  end

  test "destroying a Company asset" do
    visit company_assets_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Company asset was successfully destroyed"
  end
end
