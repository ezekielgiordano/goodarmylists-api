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
unsorted_kow_armies_array = []
kow_armies.each do |row|
	unsorted_kow_armies_array << row
end
kow_armies_array = unsorted_kow_armies_array.sort {
            |x, y| x['name'].sub(/^(A|An|The)\s/i, "").downcase <=>
            y['name'].sub(/^(A|An|The)\s/i, "").downcase
        }
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
unsorted_wmr_armies_array = []
wmr_armies.each do |row|
	unsorted_wmr_armies_array << row
end
wmr_armies_array = unsorted_wmr_armies_array.sort {
            |x, y| x['display_name'].sub(/^(A|An|The)\s/i, "").downcase <=>
            y['display_name'].sub(/^(A|An|The)\s/i, "").downcase
        }
wmr_armies_json = wmr_armies_array.to_json

wmr_units = data.exec('SELECT * FROM wmr_units;')
wmr_units_array = []
wmr_units.each do |row|
	wmr_units_array << row
end
wmr_units_json = wmr_units_array.to_json

wmr_special_rules = data.exec('SELECT * FROM wmr_special_rules;')
wmr_special_rules_array = []
wmr_special_rules.each do |row|
	wmr_special_rules_array << row
end
wmr_special_rules_json = wmr_special_rules_array.to_json

wmr_auxiliaries = data.exec('SELECT * FROM wmr_auxiliaries;')
wmr_auxiliaries_array = []
wmr_auxiliaries.each do |row|
	wmr_auxiliaries_array << row
end
wmr_auxiliaries_json = wmr_auxiliaries_array.to_json

wmr_magic_items = data.exec('SELECT * FROM wmr_magic_items;')
wmr_magic_items_array = []
wmr_magic_items.each do |row|
	wmr_magic_items_array << row
end
wmr_magic_items_json = wmr_magic_items_array.to_json

# Epic Armageddon

# ea_armies = data.exec('SELECT * FROM ea_armies;')
# unsorted_ea_armies_array = []
# ea_armies.each do |row|
# 	unsorted_ea_armies_array << row
# end
# ea_armies_array = unsorted_ea_armies_array.sort {
#             |x, y| x['display_name'].sub(/^(A|An|The)\s/i, "").downcase <=>
#             y['display_name'].sub(/^(A|An|The)\s/i, "").downcase
#         }
# ea_armies_json = ea_armies_array.to_json

# ea_formations = data.exec('SELECT * FROM ea_formations;')
# ea_formations_array = []
# ea_formations.each do |row|
# 	ea_formations_array << row
# end
# ea_formations_json = ea_formations_array.to_json

# ea_upgrades = data.exec('SELECT * FROM ea_upgrades;')
# ea_upgrades_array = []
# ea_upgrades.each do |row|
# 	ea_upgrades_array << row
# end
# ea_upgrades_json = ea_upgrades_array.to_json

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

get '/api/v1/wmr_units' do
	content_type :json
	wmr_units_json
end

get '/api/v1/wmr_special_rules' do
	content_type :json
	wmr_special_rules_json
end

get '/api/v1/wmr_auxiliaries' do
	content_type :json
	wmr_auxiliaries_json
end

get '/api/v1/wmr_magic_items' do
	content_type :json
	wmr_magic_items_json
end

# Epic Armageddon

# get '/api/v1/ea_armies' do
# 	content_type :json
# 	ea_armies_json
# end

# get '/api/v1/ea_formations' do
# 	content_type :json
# 	ea_formations_json
# end

# get '/api/v1/ea_upgrades' do
# 	content_type :json
# 	ea_upgrades_json
# end

