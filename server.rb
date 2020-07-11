require 'sinatra'
require 'sinatra/json'
require 'json'
require 'pg'
require 'pry' if development? || test?

# DATA

data = PG.connect(dbname: 'goodarmylists_api', user: 'etgfiles')

games = data.exec('SELECT * FROM games;')
games_array = []
games.each do |row|
	games_array << row
end
games_json = games_array.to_json

# Kings of War

kow_armies = data.exec('SELECT * FROM kow_armies;')
kow_armies_array = []
kow_armies.each do |row|
	kow_armies_array << row
end
kow_armies_json = kow_armies_array.to_json

kow_units = data.exec('SELECT * FROM kow_units;')
kow_units_array = []
kow_units.each do |row|
	kow_units_array << row
end
kow_units_json = kow_units_array.to_json

kow_unit_options = data.exec('SELECT * FROM kow_unit_options;')
kow_unit_options_array = []
kow_unit_options.each do |row|
	kow_unit_options_array << row
end
kow_unit_options_json = kow_unit_options_array.to_json

kow_artifacts = data.exec('SELECT * FROM kow_artifacts;')
kow_artifacts_array = []
kow_artifacts.each do |row|
	kow_artifacts_array << row
end
kow_artifacts_json = kow_artifacts_array.to_json

# Warmaster Reform

wmr_armies = data.exec('SELECT * FROM wmr_armies;')
wmr_armies_array = []
wmr_armies.each do |row|
	wmr_armies_array << row
end
wmr_armies_json = wmr_armies_array.to_json

wmr_generals = data.exec('SELECT * FROM wmr_generals;')
wmr_generals_array = []
wmr_generals.each do |row|
	wmr_generals_array << row
end
wmr_generals_json = wmr_generals_array.to_json

wmr_units = data.exec('SELECT * FROM wmr_units;')
wmr_units_array = []
wmr_units.each do |row|
	wmr_units_array << row
end
wmr_units_json = wmr_units_array.to_json

wmr_auxiliaries = data.exec('SELECT * FROM wmr_auxiliaries;')
wmr_auxiliaries_array = []
wmr_auxiliaries.each do |row|
	wmr_auxiliaries_array << row
end
wmr_auxiliaries_json = wmr_auxiliaries_array.to_json

wmr_spells = data.exec('SELECT * FROM wmr_spells;')
wmr_spells_array = []
wmr_spells.each do |row|
	wmr_spells_array << row
end
wmr_spells_json = wmr_spells_array.to_json

wmr_magic_items = data.exec('SELECT * FROM wmr_magic_items;')
wmr_magic_items_array = []
wmr_magic_items.each do |row|
	wmr_magic_items_array << row
end
wmr_magic_items_json = wmr_magic_items_array.to_json

# ROUTES

get '/api/v1/games' do
	content_type :json
	games_json
end

# Kings of War

get '/api/v1/kow_armies' do
	content_type :json
	kow_armies_json
end

get '/api/v1/kow_units' do
	content_type :json
	kow_units_json
end

get '/api/v1/kow_unit_options' do
	content_type :json
	kow_unit_options_json
end

get '/api/v1/kow_artifacts' do
	content_type :json
	kow_artifacts_json
end

# Warmaster Revolution

get '/api/v1/wmr_armies' do
	content_type :json
	wmr_armies_json
end

get '/api/v1/wmr_generals' do
	content_type :json
	wmr_generals_json
end

get '/api/v1/wmr_units' do
	content_type :json
	wmr_units_json
end

get '/api/v1/wmr_auxiliaries' do
	content_type :json
	wmr_auxiliaries_json
end

get '/api/v1/wmr_spells' do
	content_type :json
	wmr_spells_json
end

get '/api/v1/wmr_magic_items' do
	content_type :json
	wmr_magic_items_json
end
