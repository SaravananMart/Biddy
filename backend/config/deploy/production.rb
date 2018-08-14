set :branch, 'master' # git branch 
	set :stage, :production
	set :rails_env, :production

	set :normalize_asset_timestamps, %{public/images public/javascripts
	public/stylesheets}

	role :app, %w{ubuntu@18.188.8.132}    # replace with your server IP

	set :ssh_options, {
	  keys: %w(/home/aravind/ArAvInD/WoRk/Biddy/biddy.pem),  # replace with pemkey file path in local
	}