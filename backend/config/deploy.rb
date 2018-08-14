set :application, 'biddy'     # app name
set :repo_url, 'git@github.com:SaravananMart/Biddy.git'   # git repo url
set :deploy_to, '/var/www/Backend'    # app folder in server
set :keep_releases, 2
set :format, :pretty
set :log_level, :debug	
set :pty, true
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets
vendor/bundle public/system public/pdfs}
set :stages, %w(production development)
set :default_stage, "production"    # choosen development stage

# Force rake through bundle exec
SSHKit.config.command_map[:rake] = "bundle exec rake"

# Force rails through bundle exec
SSHKit.config.command_map[:rails] = "bundle exec rails"

set :migration_role, 'app' # Defaults to 'db'
set :assets_roles, [:app] # Defaults to [:web]


# Shared directories over different deployments
set :linked_dirs, %w(pids log)
set :linked_files, %w(config/database.yml)