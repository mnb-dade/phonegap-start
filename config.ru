require 'bundler/setup'
Bundler.require
 
project_root = File.expand_path(File.dirname(__FILE__))
web_root = File.join(project_root, 'www')
 
assets = Sprockets::Environment.new(project_root) do |env|
  env.logger = Logger.new(STDOUT)
end
 
assets.append_path(File.join(project_root, 'assets'))
assets.append_path(File.join(project_root, 'assets', 'javascripts'))
assets.append_path(File.join(project_root, 'assets', 'stylesheets'))
assets.append_path(File.join(project_root, 'assets', 'images'))

bootstrap_path = `bundle show bootstrap-sass`
assets.append_path(File.join(bootstrap_path.strip, 'vendor', 'assets', 'javascripts'))
assets.append_path(File.join(bootstrap_path.strip, 'vendor', 'assets', 'stylesheets'))
 
map "/assets" do
  run assets
end

# Serve these directories direclty through Rack
use Rack::Static, root: web_root, urls: ["/public", "/pages"]
 
run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('www/index.html', File::RDONLY)
  ]
}