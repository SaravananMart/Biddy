namespace :database_migration do
  task :empty_returned_column => :environment do
    UserAsset.all.each do |asset|
      asset.update_attributes(:returned=>"1")
    end
  end

  task :fix_status_column => :environment do
    UserAsset.all.each do |asset|
      if asset.status.nil? || asset.status == 'not_issued'
        asset.update_attributes(:status => '-1')
      else
        asset.update_attributes(:status => '0')
      end
    end
  end
end