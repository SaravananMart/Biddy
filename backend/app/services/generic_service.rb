class GenericService
  def initialize(params)
    @user = params[:user]
  end

  def user_assets
    asset_array = []
    @user.user_assets.each do |asset|
      asset_json = {
          "id" => asset.id,
          "name" => asset.name,
          "count" => asset.count,
          "status" => asset.status,
          "returned" => asset.returned
      }
      asset_array << asset_json
    end
    asset_array
  end

  def get_company_assets
    asset_array = []
    CompanyAsset.all.each do |asset|
      asset_json = {
          "id" => asset.id,
          "name" => asset.name,
          "count" => asset.count
      }
      asset_array << asset_json
    end
    asset_array
  end

end