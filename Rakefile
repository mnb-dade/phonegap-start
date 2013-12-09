require 'rubygems'
require 'bundler'
require 'pathname'
require 'logger'
require 'fileutils'
 
Bundler.require
 
module Sprockets
  class StaticCompiler
    attr_accessor :env, :target, :paths
 
    def initialize(env, target, paths, options = {})
      @env = env
      @target = target
      @paths = paths
      @digest = options.key?(:digest) ? options.delete(:digest) : true
      @manifest = options.key?(:manifest) ? options.delete(:manifest) : true
      @manifest_path = options.delete(:manifest_path) || target
      @zip_files = options.delete(:zip_files) || /\.(?:css|html|js|svg|txt|xml)$/
    end
 
    def compile
      manifest = {}
      env.each_logical_path do |logical_path|
        next unless compile_path?(logical_path)
        if asset = env.find_asset(logical_path)
          manifest[logical_path] = write_asset(asset)
        end
      end
      write_manifest(manifest) if @manifest
    end
 
    def write_manifest(manifest)
      FileUtils.mkdir_p(@manifest_path)
      File.open("#{@manifest_path}/manifest.yml", 'wb') do |f|
        YAML.dump(manifest, f)
      end
    end
 
    def write_asset(asset)
      path_for(asset).tap do |path|
        filename = File.join(target, path)
        FileUtils.mkdir_p File.dirname(filename)
        asset.write_to(filename)
      end
    end
 
    def compile_path?(logical_path)
      paths.each do |path|
        case path
        when Regexp
          return true if path.match(logical_path)
        when Proc
          return true if path.call(logical_path)
        else
          return true if File.fnmatch(path.to_s, logical_path)
        end
      end
      false
    end
 
    def path_for(asset)
      @digest ? asset.digest_path : asset.logical_path
    end
  end
end
 
ROOT        = Pathname(File.dirname(__FILE__))
LOGGER      = Logger.new(STDOUT)
BUNDLES     = %w( application.css application.js )
BUILD_DIR   = ROOT.join("www/assets")
SOURCE_DIR  = ROOT.join("assets")
 
task :compile do
  enviorment = Sprockets::Environment.new(ROOT) do |env|
    env.logger = LOGGER
  end
 
  enviorment.append_path(SOURCE_DIR.join('javascripts').to_s)
  enviorment.append_path(SOURCE_DIR.join('stylesheets').to_s)
  enviorment.append_path(SOURCE_DIR.join('images').to_s)
  
  bootstrap_path = `bundle show bootstrap-sass`
  enviorment.append_path(File.join(bootstrap_path.strip, 'vendor', 'assets', 'javascripts'))
  enviorment.append_path(File.join(bootstrap_path.strip, 'vendor', 'assets', 'stylesheets'))
 
  comp = Sprockets::StaticCompiler.new enviorment, BUILD_DIR, [/\.(png|jpg)$/, /^(application|ie)\.(css|js)$/], {:digest => false, :zip_files => false, :manifest => false }
  comp.compile
end