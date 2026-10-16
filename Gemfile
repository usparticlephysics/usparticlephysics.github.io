# frozen_string_literal: true

source 'https://rubygems.org'

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem 'jekyll', '~> 4.3'

group :development do
  # Check resulting HTML for dead links and other issues
  gem 'html-proofer', require: false

  # Allow running this with rake (especially for rake check)
  gem 'rake', require: false

  # Verify good coding practices in Ruby files
  gem 'rubocop', require: false
end

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem 'jekyll-feed', '~> 0.17'
  gem 'jekyll-seo-tag'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: :windows

# Performance-booster for watching directories on Windows
gem 'wdm', '~> 0.1.0' if Gem.win_platform?

gem 'ffi', '~> 1.17'

# Gems removed from Ruby default stdlib in Ruby 3.4+
gem 'csv'
gem 'base64'
gem 'bigdecimal'
gem 'mutex_m'
gem 'webrick'

gem "kramdown-parser-gfm"

