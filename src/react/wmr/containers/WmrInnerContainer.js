import style from '../../../assets/stylesheets/index.module.css'
import paypal from '../../../assets/images/paypal.gif'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import Modal from 'react-modal'
import FormattedList from '../components/FormattedList'
import UnitEntryButton from '../components/UnitEntryButton'
import UnitEntryNameTile from '../components/UnitEntryNameTile'
import AuxiliaryIcon from '../components/AuxiliaryIcon'
import MagicItemIcon from '../components/MagicItemIcon'
import InformationTile from '../components/InformationTile'
import AuxiliarySelectionTile from '../components/AuxiliarySelectionTile'
import MagicItemSelectionTile from '../components/MagicItemSelectionTile'

class WmrInnerContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedArmy: '',
			listedUnits: [],
			selectedAuxiliaries: [],
			selectedMagicItems: [],
			pointTotal: 0,
			unitCount: 0,
			breakPoint: 0,
			maximumCount: 0,
			informationVisible: false,
			formattedListVisible: false,
			auxiliariesVisible: false,
			magicItemsVisible: false,
			unitWhoseInformationIsShown: '',
			unitBeingGivenAuxiliary: '',
			unitBeingGivenMagicItem: ''

		}
		this.updateSelectedArmy = this.updateSelectedArmy.bind(this)
		this.updateMaximumCount = this.updateMaximumCount.bind(this)
		this.clearList = this.clearList.bind(this)
		this.determineIfGreyedOut = this.determineIfGreyedOut.bind(this)
		this.addUnit = this.addUnit.bind(this)
		this.removeUnit = this.removeUnit.bind(this)
		this.addAuxiliary = this.addAuxiliary.bind(this)
		this.removeAuxiliary = this.removeAuxiliary.bind(this)
		this.addMagicItem = this.addMagicItem.bind(this)
		this.removeMagicItem = this.removeMagicItem.bind(this)
		this.toggleInformation = this.toggleInformation.bind(this)
		this.toggleFormattedList = this.toggleFormattedList.bind(this)
		this.toggleAuxiliaries = this.toggleAuxiliaries.bind(this)
		this.toggleMagicItems = this.toggleMagicItems.bind(this)
		this.updateUnitWhoseInformationIsShown = this.updateUnitWhoseInformationIsShown.bind(this)
		this.updateUnitBeingGivenAuxiliary = this.updateUnitBeingGivenAuxiliary.bind(this)
		this.updateUnitBeingGivenMagicItem = this.updateUnitBeingGivenMagicItem.bind(this)
	}

	updateSelectedArmy(army) {
		this.setState({ selectedArmy: army.value })
		this.clearList(army.value, 2)
	}

	updateMaximumCount(maximumCount) {
		this.setState({ maximumCount: maximumCount.value })
		this.clearList(this.state.selectedArmy, maximumCount.value)
	}

	clearList(selectedArmy, maximumCount) {
		let coreUnits

		if (selectedArmy.name === 'The Empire') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 1,
						name: 'Halberdiers (The Empire)',
						display_name: 'Halberdier unit',
						option_screen_name: 'Halberdiers',
						list_name: 'Halberdiers',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 45,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true
					}
				},
				{
					count: maximumCount * 2,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 1,
						name: 'Crossbowmen (The Empire)',
						display_name: 'Crossbowman unit',
						option_screen_name: 'Crossbowmen',
						list_name: 'Crossbowmen',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 3,
						attacks: '3/1',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 55,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 1,
						name: 'General (The Empire)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 11,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Tomb Kings') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 2,
						name: 'Skeletons (Tomb Kings)',
						display_name: 'Skeleton unit',
						option_screen_name: 'Skeletons',
						list_name: 'Skeletons',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '2',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 30,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount * 2,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 2,
						name: 'Skeleton Bowmen (Tomb Kings)',
						display_name: 'Skeleton Bowman unit',
						option_screen_name: 'Skeleton Bowmen',
						list_name: 'Skeleton Bowmen',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '2/1',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 45,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 2,
						name: 'Tomb King (Tomb Kings)',
						display_name: 'Tomb King',
						option_screen_name: 'the Tomb King',
						list_name: 'Tomb King',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 10,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 130,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Chaos') {
			coreUnits = [
				{
					count: maximumCount,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 3,
						name: 'Chaos Warriors (Chaos)',
						display_name: 'Chaos Warrior unit',
						option_screen_name: 'Chaos Warriors',
						list_name: 'Chaos Warriors',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '4',
						hits: '4',
						armor: '4+',
						command: '-',
						unit_size: '3',
						points: 140,
						minimum: 1,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 3,
						name: 'Chaos Marauders (Chaos)',
						display_name: 'Chaos Marauder unit',
						option_screen_name: 'Chaos Marauders',
						list_name: 'Chaos Marauders',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '3',
						hits: '3',
						armor: '5+',
						command: '-',
						unit_size: '3',
						points: 60,
						minimum: 1,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 3,
						name: 'General (Chaos)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 12,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Orcs') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 4,
						name: 'Orc Warriors (Orcs)',
						display_name: 'Orc Warrior unit',
						option_screen_name: 'Orc Warriors',
						list_name: 'Orc Warriors',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '2',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 60,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount * 2,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 4,
						name: 'Goblins (Orcs)',
						display_name: 'Goblin unit',
						option_screen_name: 'Goblins',
						list_name: 'Goblins',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 3,
						attacks: '2/1',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 30,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 4,
						name: 'Orc General (Orcs)',
						display_name: 'Orc General',
						option_screen_name: 'the Orc General',
						list_name: 'Orc General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 11,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '8',
						unit_size: '1',
						points: 95,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'High Elves') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 5,
						name: 'Spearmen (High Elves)',
						display_name: 'Spearman unit',
						option_screen_name: 'Spearmen',
						list_name: 'Spearmen',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '3',
						armor: '5+',
						command: '-',
						unit_size: '3',
						points: 60,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 5,
						name: 'Archers (High Elves)',
						display_name: 'Archer unit',
						option_screen_name: 'Archers',
						list_name: 'Archers',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '3/1',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 75,
						minimum: 1,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 5,
						name: 'General (High Elves)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 9,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '10',
						unit_size: '1',
						points: 180,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Dwarfs') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 6,
						name: 'Warriors (Dwarfs)',
						display_name: 'Warrior unit',
						option_screen_name: 'Warriors',
						list_name: 'Warriors',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '4',
						armor: '4+',
						command: '-',
						unit_size: '3',
						points: 110,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 6,
						name: 'General (Dwarfs)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 8,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '10',
						unit_size: '1',
						points: 155,
						minimum: 1,
						maximum: 1,
						special_rules: '',
						can_have_aux: false,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Skaven') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 7,
						name: 'Clanrats (Skaven)',
						display_name: 'Clanrat unit',
						option_screen_name: 'Clanrats',
						list_name: 'Clanrats',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 40,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount * 2,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 7,
						name: 'Rat Swarms (Skaven)',
						display_name: 'Rat Swarm unit',
						option_screen_name: 'Rat Swarms',
						list_name: 'Rat Swarms',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 5,
						attacks: '2',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 25,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 7,
						name: 'Grey Seer (Skaven)',
						display_name: 'Grey Seer',
						option_screen_name: 'the Grey Seer',
						list_name: 'Grey Seer',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 10,
						attacks: '+1',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 130,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Lizardmen') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 8,
						name: 'Skinks (Lizardmen)',
						display_name: 'Skink unit',
						option_screen_name: 'Skinks',
						list_name: 'Skinks',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '2/1',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 35,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true
					}
				},
				{
					count: maximumCount * 2,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 8,
						name: 'Saurus (Lizardmen)',
						display_name: 'Saurus unit',
						option_screen_name: 'Saurus',
						list_name: 'Saurus',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '4',
						hits: '3',
						armor: '5+',
						command: '-',
						unit_size: '3',
						points: 75,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 8,
						name: 'Slann Mage Priest (Lizardmen)',
						display_name: 'Slann Mage Priest',
						option_screen_name: 'the Slann Mage Priest',
						list_name: 'Slaan Mage Priest',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 9,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '0',
						unit_size: '1',
						points: 95,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Bretonnia') {
			coreUnits = [
				{
					count: maximumCount,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 9,
						name: 'Men-at-Arms (Bretonnia)',
						display_name: 'Man-at-Arms unit',
						option_screen_name: 'Men-at-Arms',
						list_name: 'Men-at-Arms',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '3',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 45,
						minimum: 1,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount,
					unit: {
						id: 2,
						game_id: 2,
						wmr_army_id: 9,
						name: 'Squires (Bretonnia)',
						display_name: 'Squire unit',
						option_screen_name: 'Squires',
						list_name: 'Squires',
						unit_type: 'Cavalry',
						unit_type_index: 2,
						is_unique: false,
						order_within_army: 4,
						attacks: '3/1',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 90,
						minimum: 1,
						maximum: 4,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 9,
						name: 'Knights (Bretonnia)',
						display_name: 'Knight unit',
						option_screen_name: 'Knights',
						list_name: 'Knights',
						unit_type: 'Cavalry',
						unit_type_index: 2,
						is_unique: false,
						order_within_army: 5,
						attacks: '3',
						hits: '3',
						armor: '4+',
						command: '-',
						unit_size: '3',
						points: 110,
						minimum: 1,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 9,
						name: 'General (Bretonnia)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 9,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Kislev') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 10,
						name: 'Horse Archers (Kislev)',
						display_name: 'Horse Archer unit',
						option_screen_name: 'Horse Archers',
						list_name: 'Horse Archers',
						unit_type: 'Cavalry',
						unit_type_index: 2,
						is_unique: false,
						order_within_army: 2,
						attacks: '3/1',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 75,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount * 2,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 10,
						name: 'Axemen (Kislev)',
						display_name: 'Axeman unit',
						option_screen_name: 'Axemen',
						list_name: 'Axemen',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 6,
						attacks: '3',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 45,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 10,
						name: 'General (Kislev)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 9,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true
					}
				}
			]
		}
		if (selectedArmy.name === 'Dark Elves') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 11,
						name: 'Spearmen (Dark Elves)',
						display_name: 'Spearman unit',
						option_screen_name: 'Spearmen',
						list_name: 'Spearmen',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '3',
						armor: '5+',
						command: '-',
						unit_size: '3',
						points: 60,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 11,
						name: 'Crossbowmen (Dark Elves)',
						display_name: 'Crossbowman unit',
						option_screen_name: 'Crossbowmen',
						list_name: 'Crossbowmen',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '3/2',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 75,
						minimum: 1,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 11,
						name: 'General (Dark Elves)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 9,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 155,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Demons') {
			coreUnits = [
				{
					count: maximumCount * 3,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 12,
						name: 'Demon Hordes (Demons)',
						display_name: 'Demon Horde unit',
						option_screen_name: 'Demon Hordes',
						list_name: 'Demon Hordes',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '4',
						hits: '3',
						armor: '5+',
						command: '-',
						unit_size: '3',
						points: 75,
						minimum: 3,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 12,
						name: 'Demon Overlord (Demons)',
						display_name: 'Demon Overlord',
						option_screen_name: 'the Demon Overlord',
						list_name: 'Demon Overlord',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 9,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Araby') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 13,
						name: 'Spearmen (Araby)',
						display_name: 'Spearman unit',
						option_screen_name: 'Spearmen',
						list_name: 'Spearmen',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 45,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount * 2,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 13,
						name: 'Bowmen (Araby)',
						display_name: 'Bowman unit',
						option_screen_name: 'Bowmen',
						list_name: 'Bowmen',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '3/1',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 55,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 13,
						name: 'General (Araby)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 9,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Vampire Counts') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 14,
						name: 'Skeletons (Vampire Counts)',
						display_name: 'Skeleton unit',
						option_screen_name: 'Skeletons',
						list_name: 'Skeletons',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '2',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 30,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount * 2,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 14,
						name: 'Zombies (Vampire Counts)',
						display_name: 'Zombie unit',
						option_screen_name: 'Zombies',
						list_name: 'Zombies',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '2',
						hits: '4',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 35,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 14,
						name: 'Vampire Lord (Vampire Counts)',
						display_name: 'Vampire Lord',
						option_screen_name: 'the Vampire Lord',
						list_name: 'Vampire Lord',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 9,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 150,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Dogs of War') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 15,
						name: 'Pikemen (Dogs of War)',
						display_name: 'Pikeman unit',
						option_screen_name: 'Pikemen',
						list_name: 'Pikemen',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 60,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount * 2,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 15,
						name: 'Crossbowmen (Dogs of War)',
						display_name: 'Crossbowman unit',
						option_screen_name: 'Crossbowmen',
						list_name: 'Crossbowmen',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '3/1',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 55,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 15,
						name: 'General (Dogs of War)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 13,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Ogre Kingdoms') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 16,
						name: 'Bull Ogres (Ogre Kingdoms)',
						display_name: 'Bull Ogre unit',
						option_screen_name: 'Bull Ogres',
						list_name: 'Bull Ogres',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '4',
						hits: '4',
						armor: '5+',
						command: '-',
						unit_size: '3',
						points: 105,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 16,
						name: 'Tyrant (Ogre Kingdoms)',
						display_name: 'Tyrant',
						option_screen_name: 'the Tyrant',
						list_name: 'Tyrant',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 10,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Albion') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 17,
						name: 'Warriors (Albion)',
						display_name: 'Warrior unit',
						option_screen_name: 'Warriors',
						list_name: 'Warriors',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '3',
						armor: '5+',
						command: '-',
						unit_size: '3',
						points: 60,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 17,
						name: 'Slingers (Albion)',
						display_name: 'Slinger unit',
						option_screen_name: 'Slingers',
						list_name: 'Slingers',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '2/1',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 40,
						minimum: 2,
						maximum: 6,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 17,
						name: 'General (Albion)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 9,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Goblins') {
			coreUnits = [
				{
					count: maximumCount * 4,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 18,
						name: 'Goblins (Goblins)',
						display_name: 'Goblin unit',
						option_screen_name: 'Goblins',
						list_name: 'Goblins',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '2/1',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 30,
						minimum: 4,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount * 2,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 18,
						name: 'Wolf Riders (Goblins)',
						display_name: 'Wolf Rider unit',
						option_screen_name: 'Wolf Riders',
						list_name: 'Wolf Riders',
						unit_type: 'Cavalry',
						unit_type_index: 2,
						is_unique: false,
						order_within_army: 4,
						attacks: '2/1',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 60,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 18,
						name: 'Goblin Warboss (Goblins)',
						display_name: 'Goblin Warboss',
						option_screen_name: 'the Goblin Warboss',
						list_name: 'Goblin Warboss',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 10,
						attacks: '+1',
						hits: '-',
						armor: '-',
						command: '8',
						unit_size: '1',
						points: 80,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Witch Hunters') {
			coreUnits = [
				{
					count: maximumCount * 3,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 12,
						name: 'Zealots (Witch Hunters)',
						display_name: 'Zealot unit',
						option_screen_name: 'Zealots',
						list_name: 'Zealots',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 35,
						minimum: 3,
						maximum: null,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 12,
						name: 'General (Witch Hunters)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 10,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Chaos Dwarfs') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 20,
						name: 'Chaos Dwarfs (Chaos Dwarfs)',
						display_name: 'Chaos Dwarf unit',
						option_screen_name: 'Chaos Dwarfs',
						list_name: 'Chaos Dwarfs',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '4',
						armor: '4+',
						command: '-',
						unit_size: '3',
						points: 110,
						minimum: 2,
						maximum: 4,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 20,
						name: 'General (Chaos Dwarfs)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 11,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Wood Elves') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 21,
						name: 'Glade Guard (Wood Elves)',
						display_name: 'Glade Guard unit',
						option_screen_name: 'Glade Guard',
						list_name: 'Glade Guard',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3/1',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 65,
						minimum: 2,
						maximum: 4,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true
					}
				},
				{
					count: maximumCount,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 21,
						name: 'Dryads (Wood Elves)',
						display_name: 'Dryad unit',
						option_screen_name: 'Dryad',
						list_name: 'Dryad',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 5,
						attacks: '4',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 60,
						minimum: 1,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 21,
						name: 'General (Wood Elves)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 11,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '10',
						unit_size: '1',
						points: 155,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Beastmen') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 22,
						name: 'Beastherd (Beastmen)',
						display_name: 'Beastherd unit',
						option_screen_name: 'Beastherds',
						list_name: 'Beastherd',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 45,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount * 2,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 22,
						name: 'Herdkin (Beastmen)',
						display_name: 'Herdkin unit',
						option_screen_name: 'Herdkin',
						list_name: 'Herdkin',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '3/1',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 55,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 22,
						name: 'Beastlord (Beastmen)',
						display_name: 'Beastlord',
						option_screen_name: 'the Beastlord',
						list_name: 'Beastlord',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 11,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}
		if (selectedArmy.name === 'Norse') {
			coreUnits = [
				{
					count: maximumCount * 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 23,
						name: 'Bondsmen (Norse)',
						display_name: 'Bondsman unit',
						option_screen_name: 'Bondsmen',
						list_name: 'Bondsmen',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '3',
						armor: '5+',
						command: '-',
						unit_size: '3',
						points: 60,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: maximumCount,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 23,
						name: 'Huscarls (Norse)',
						display_name: 'Huscarl unit',
						option_screen_name: 'Huscarls',
						list_name: 'Huscarls',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '4',
						hits: '3',
						armor: '4+',
						command: '-',
						unit_size: '3',
						points: 100,
						minimum: 1,
						maximum: 4,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 23,
						name: 'Jarl (Norse)',
						display_name: 'Jarl',
						option_screen_name: 'the Jarl',
						list_name: 'Jarl',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 10,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			]
		}

		this.setState({
			listedUnits: coreUnits,
			selectedAuxiliaries: [],
			selectedMagicItems: [],
			pointTotal: this.props.calculatePointTotal(coreUnits, [], []),
			unitCount: this.props.calculateUnitCount(coreUnits),
			breakPoint: this.props.calculateBreakPoint(coreUnits),
			maximumCount: maximumCount,
			informationVisible: false,
			formattedListVisible: false,
			auxiliariesVisible: false,
			magicItemsVisible: false,
			unitWhoseInformationIsShown: '',
			unitBeingGivenAuxiliary: '',
			unitBeingGivenMagicItem: ''
		})
	}

	determineIfGreyedOut(unitArray) {
		let unitsInArmy = []
		let greyedOutUnits = []
		let selectedArmy = this.state.selectedArmy
		let allUnits = this.props.units
		let listedUnits = this.state.listedUnits
		let pointTotal = this.state.pointTotal
		let maximumCount= this.state.maximumCount
		let calculateCoreUnitCounts = this.props.calculateCoreUnitCounts
		let locked = false
		let i2
		let i3

		for (i2 = 0; i2 < allUnits.length; i2++) {
			if (parseInt(allUnits[i2].wmr_army_id) === parseInt(selectedArmy.id)) {
				unitsInArmy.push(allUnits[i2])
			}
		}

		let coreUnitCounts = calculateCoreUnitCounts(listedUnits, selectedArmy.name, maximumCount)

		for (i2 = 0; i2 < unitsInArmy.length; i2++) {
			for (i3 = 0; i3 < unitArray.length; i3++) {
				if (unitArray[i3].unit.name === unitsInArmy[i2].name) {
					if (unitsInArmy[i2].is_unique === true || unitsInArmy[i2].is_unique === 't') {
						locked = true
					}
					if (unitArray[i3].unit.maximum !== null) {
						if (
							unitArray[i3].count >= maximumCount &&
							unitArray[i3].count >= parseInt(unitArray[i3].unit.maximum) * maximumCount
						) {
							locked = true
						}
					}
				}
			}

			if (unitsInArmy[i2].name === 'Handgunners (The Empire)') {
				if (locked === true) {
					if (coreUnitCounts.empireCrossbowmanCount >= maximumCount) {
						locked = false
					}
				}
			}

			if (parseInt(unitsInArmy[i2].points) + pointTotal > maximumCount * 1000 + 999) {
				locked = true
			}

			if (locked === true) {
				greyedOutUnits.push(unitsInArmy[i2])
			}
			locked = false
		}

		return greyedOutUnits
	}

	addUnit(unitToAdd) {
		let listedUnits = this.state.listedUnits
		let duplicateCount = 0
		let i2
		for (i2 = 0; i2 < listedUnits.length; i2++) {
			if (listedUnits[i2].unit.name === unitToAdd.name) {
				listedUnits[i2].count += 1
				duplicateCount += 1
			}
		}
		if (duplicateCount === 0) {
			let unitObject = {
				count: 1,
				unit: unitToAdd
			}
			listedUnits.push(unitObject)
		}
		this.setState({
			listedUnits: listedUnits,
			pointTotal: this.props.calculatePointTotal(listedUnits, this.state.selectedAuxiliaries, this.state.selectedMagicItems),
			unitCount: this.props.calculateUnitCount(listedUnits),
			auxiliariesVisible: false,
			magicItemsVisible: false
		})
	}

	removeUnit(unitToRemove) {
		let selectedArmy = this.state.selectedArmy
		let listedUnits = this.state.listedUnits
		let maximumCount = this.state.maximumCount
		let coreUnitCounts = this.props.calculateCoreUnitCounts(listedUnits, selectedArmy.name, maximumCount)
		let selectedAuxiliaries = this.state.selectedAuxiliaries
		let i2
		let i3

		for (i2 = 0; i2 < listedUnits.length; i2++) {
			if (listedUnits[i2].unit.name === unitToRemove.unit.name) {
				if (unitToRemove.unit.unit_type !== 'General') {
					if (selectedArmy.name === 'The Empire') {
						if (unitToRemove.unit.name === 'Halberdiers (The Empire)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Crossbowmen (The Empire)') {
							if (listedUnits[i2].count + coreUnitCounts.handgunnerOrMax - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Tomb Kings') {
						if (unitToRemove.unit.name === 'Skeletons (Tomb Kings)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Skeleton Bowmen (Tomb Kings)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Chaos') {
						if (unitToRemove.unit.name === 'Chaos Warriors (Chaos)') {
							if (listedUnits[i2].count - 1 >= maximumCount) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Chaos Marauders (Chaos)') {
							if (listedUnits[i2].count - 1 >= maximumCount) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Orcs') {
						if (unitToRemove.unit.name === 'Orc Warriors (Orcs)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Goblins (Orcs)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'High Elves') {
						if (unitToRemove.unit.name === 'Spearmen (High Elves)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Archers (High Elves)') {
							if (listedUnits[i2].count - 1 >= maximumCount) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Dwarfs') {
						if (unitToRemove.unit.name === 'Warriors (Dwarfs)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Skaven') {
						if (unitToRemove.unit.name === 'Clanrats (Skaven)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Rat Swarms (Skaven)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Lizardmen') {
						if (unitToRemove.unit.name === 'Skinks (Lizardmen)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Saurus (Lizardmen)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Bretonnia') {
						if (unitToRemove.unit.name === 'Men-at-Arms (Bretonnia)') {
							if (listedUnits[i2].count - 1 >= maximumCount) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Squires (Bretonnia)') {
							if (listedUnits[i2].count - 1 >= maximumCount) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Knights (Bretonnia)') {
							if (listedUnits[i2].count - 1 >= maximumCount) {
								listedUnits[i2].count -= 1
							}							
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Kislev') {
						if (unitToRemove.unit.name === 'Horse Archers (Kislev)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Axemen (Kislev)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Dark Elves') {
						if (unitToRemove.unit.name === 'Spearmen (Dark Elves)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Crossbowmen (Dark Elves)') {
							if (listedUnits[i2].count - 1 >= maximumCount) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Demons') {
						if (unitToRemove.unit.name === 'Demon Hordes (Demons)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 3) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Araby') {
						if (unitToRemove.unit.name === 'Spearmen (Araby)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Bowmen (Araby)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Vampire Counts') {
						if (unitToRemove.unit.name === 'Skeletons (Vampire Counts)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Zombies (Vampire Counts)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Dogs of War') {
						if (unitToRemove.unit.name === 'Pikemen (Dogs of War)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Crossbowmen (Dogs of War)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Ogre Kingdoms') {
						if (unitToRemove.unit.name === 'Bull Ogres (Ogre Kingdoms)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Albion') {
						if (unitToRemove.unit.name === 'Warriors (Albion)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Slingers (Albion)') {
							if (listedUnits[i2].count - 1 >= maximumCount) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Goblins') {
						if (unitToRemove.unit.name === 'Goblins (Goblins)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 4) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Wolf Riders (Goblins)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Witch Hunters') {
						if (unitToRemove.unit.name === 'Zealots (Witch Hunters)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 3) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Chaos Dwarfs') {
						if (unitToRemove.unit.name === 'Chaos Dwarfs (Chaos Dwarfs)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Wood Elves') {
						if (unitToRemove.unit.name === 'Glade Guard (Wood Elves)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Dryads (Wood Elves)') {
							if (listedUnits[i2].count - 1 >= maximumCount) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Beastmen') {
						if (unitToRemove.unit.name === 'Beastherd (Beastmen)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Herdkin (Beastmen)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
					if (selectedArmy.name === 'Norse') {
						if (unitToRemove.unit.name === 'Bondsmen (Norse)') {
							if (listedUnits[i2].count - 1 >= maximumCount * 2) {
								listedUnits[i2].count -= 1
							}
						} else if (unitToRemove.unit.name === 'Huscarls (Norse)') {
							if (listedUnits[i2].count - 1 >= maximumCount) {
								listedUnits[i2].count -= 1
							}
						} else {
							if (listedUnits[i2].count > 1) {
								listedUnits[i2].count -= 1
							} else {
								for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
									if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
										selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
									}
								}
								listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
							}
						}
					}
				}
			}
			
			for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
				if (
					selectedAuxiliaries[i3].unitName === unitToRemove.unit.name &&
					listedUnits.length !== this.state.listedUnits.length
				) {
					if (selectedAuxiliaries[i3].count > listedUnits[i2].count) {
						selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
					}
				}
			}
		}

		this.setState({
			listedUnits: listedUnits,
			selectedAuxiliaries: selectedAuxiliaries,
			pointTotal: this.props.calculatePointTotal(listedUnits, selectedAuxiliaries, this.state.selectedMagicItems),
			unitCount: this.props.calculateUnitCount(listedUnits),
			auxiliariesVisible: false,
			magicItemsVisible: false
		})
	}

	addAuxiliary(unitObject, highlightedAuxiliaries) {
		let selectedAuxiliaries = []
		let i2

		for (i2 = 0; i2 < this.state.selectedAuxiliaries.length; i2++) {
			if (this.state.selectedAuxiliaries[i2].unitName !== unitObject.unit.name) {
				selectedAuxiliaries.push(this.state.selectedAuxiliaries[i2])
			}
		}

		selectedAuxiliaries = selectedAuxiliaries.concat(highlightedAuxiliaries)

		this.setState({
			selectedAuxiliaries: selectedAuxiliaries,
			pointTotal: this.props.calculatePointTotal(this.state.listedUnits, selectedAuxiliaries, this.state.selectedMagicItems),
			unitBeingGivenAuxiliary: ''
		})
		this.toggleAuxiliaries()
	}

	removeAuxiliary(auxiliaryToRemove) {
		let selectedAuxiliaries = this.state.selectedAuxiliaries
		let i2

		for (i2 = selectedAuxiliaries.length - 1; i2 >= 0; i2--) {
			if (
				selectedAuxiliaries[i2].auxiliary.name === auxiliaryToRemove.auxiliary.name &&
				selectedAuxiliaries[i2].unitName === auxiliaryToRemove.unitName
			) {
				if (auxiliaryToRemove.count > 1) {
					selectedAuxiliaries[i2].count -= 1
				} else {
					selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i2]), 1)
				}
			}
		}

		this.setState({
			selectedAuxiliaries: selectedAuxiliaries,
			pointTotal: this.props.calculatePointTotal(this.state.listedUnits, selectedAuxiliaries, this.state.selectedMagicItems)
		})
	}

	addMagicItem(unitObject, highlightedMagicItems) {
		let selectedMagicItems = []
		let i2
		let i3

		for (i2 = 0; i2 < this.state.selectedMagicItems.length; i2++) {
			if (this.state.selectedMagicItems[i2].unitName !== unitObject.unit.name) {
				selectedMagicItems.push(this.state.selectedMagicItems[i2])
			}
		}

		selectedMagicItems = selectedMagicItems.concat(highlightedMagicItems)

		for (i2 = selectedMagicItems.length - 1; i2 >= 0; i2--) {
			for (i3 = highlightedMagicItems.length - 1; i3 >= 0; i3--) {
				if (
					selectedMagicItems[i2].magicItem.name === highlightedMagicItems[i3].magicItem.name &&
					selectedMagicItems[i2].unitName !== unitObject.unit.name
				) {
					selectedMagicItems.splice(selectedMagicItems.indexOf(selectedMagicItems[i2]), 1)
				}
			}
		}

		this.setState({
			selectedMagicItems: selectedMagicItems,
			pointTotal: this.props.calculatePointTotal(this.state.listedUnits, this.state.selectedAuxiliaries, selectedMagicItems),
			unitBeingGivenMagicItem: ''
		})
		this.toggleMagicItems()
	}

	removeMagicItem(magicItemToRemove) {
		let selectedMagicItems = this.state.selectedMagicItems
		let i2

		for (i2 = selectedMagicItems.length - 1; i2 >= 0; i2--) {
			if (
				selectedMagicItems[i2].magicItem.name === magicItemToRemove.magicItem.name &&
				selectedMagicItems[i2].unitName === magicItemToRemove.unitName
			) {
				if (magicItemToRemove.count > 1) {
					selectedMagicItems[i2].count -= 1
				} else {
					selectedMagicItems.splice(selectedMagicItems.indexOf(magicItemToRemove), 1)
				}
			}
		}

		this.setState({
			selectedMagicItems: selectedMagicItems,
			pointTotal: this.props.calculatePointTotal(this.state.listedUnits, this.state.selectedAuxiliaries, selectedMagicItems)
		})
	}

	toggleInformation() {
		let isAboutToBeVisible
		if (this.state.informationVisible === false) {
			isAboutToBeVisible = true
		} else {
			isAboutToBeVisible = false
		}
		this.setState({ informationVisible: isAboutToBeVisible })
	}

	toggleFormattedList() {
		let isAboutToBeVisible
		if (this.state.formattedListVisible === false) {
			isAboutToBeVisible = true
		} else {
			isAboutToBeVisible = false
		}
		this.setState({ formattedListVisible: isAboutToBeVisible })
	}

	toggleAuxiliaries() {
		if (this.state.auxiliariesVisible === false) {
			this.setState({ auxiliariesVisible: true })
		} else {
			this.setState({
				auxiliariesVisible: false,
				unitBeingGivenAuxiliary: ''
			})
		}
	}

	toggleMagicItems() {
		if (this.state.magicItemsVisible === false) {
			this.setState({ magicItemsVisible: true })
		} else {
			this.setState({
				magicItemsVisible: false,
				unitBeingGivenMagicItem: ''
			})
		}
	}

	updateUnitWhoseInformationIsShown(unit) {
		this.setState({ unitWhoseInformationIsShown: unit })
		this.toggleInformation()
	}

	updateUnitBeingGivenAuxiliary(unit) {
		this.setState({ unitBeingGivenAuxiliary: unit })
		this.toggleAuxiliaries()
	}

	updateUnitBeingGivenMagicItem(unit) {
		this.setState({ unitBeingGivenMagicItem: unit })
		this.toggleMagicItems()
	}	

	render() {
		let appElement = document.getElementById('app')
		let selectedArmy = this.state.selectedArmy
		let unsortedUnitsInArmy = []
		let specialRules = []
		let displayNoneBottom
		let i2

		for (i2 = 0; i2 < this.props.units.length; i2++) {
			if (parseInt(this.props.units[i2].wmr_army_id) === parseInt(this.state.selectedArmy.id)) {
				unsortedUnitsInArmy.push(this.props.units[i2])
			}
		}
		let unitsInArmy = unsortedUnitsInArmy.sort((a, b) => {
			return ( parseInt(a.order_within_army) - parseInt(b.order_within_army) )
		})
		for (i2 = 0; i2 < this.props.specialRules.length; i2++) {
			if (this.props.specialRules[i2].army_name === this.state.selectedArmy.name) {
				specialRules.push(this.props.specialRules[i2])
			}
		}

		let auxiliarySelectionTile
		let magicItemSelectionTile
		if (this.state.auxiliariesVisible === true) {
			auxiliarySelectionTile =
				<div className={style['auxiliary-selection-tile']}>
					<AuxiliarySelectionTile
						unitObject={this.state.unitBeingGivenAuxiliary}
						auxiliaries={this.props.auxiliaries}
						selectedAuxiliaries={this.state.selectedAuxiliaries}
						pointTotal={this.state.pointTotal}
						maximumCount={this.state.maximumCount}
						addAuxiliary={this.addAuxiliary}
						toggleAuxiliaries={this.toggleAuxiliaries}
					/>
				</div>
		}		
		if (this.state.magicItemsVisible === true) {
			magicItemSelectionTile = 
				<div className={style['magic-item-selection-tile']}>
					<MagicItemSelectionTile
						unitObject={this.state.unitBeingGivenMagicItem}
						magicItems={this.props.magicItems}
						selectedAuxiliaries={this.state.selectedAuxiliaries}
						selectedMagicItems={this.state.selectedMagicItems}
						pointTotal={this.state.pointTotal}
						maximumCount={this.state.maximumCount}
						addMagicItem={this.addMagicItem}
						toggleMagicItems={this.toggleMagicItems}
					/>
				</div>
		}



		let clearListDiv
		let unitEntryButtonTitle
		let greyedOutUnits
		let	unitEntryButtonDisplay
		let listOutputSide
		let pointTotalDisplay
		let listedUnits
		let listedUnitTileDisplay
		let viewListButtonDisplay
		if (this.state.selectedArmy === '') {
			document.body.style.overflow = 'hidden'
			displayNoneBottom = style['display-none']
		} else {
			document.body.style.overflow = 'visible'
			displayNoneBottom = ''

			clearListDiv =
				<div className={style['clear-list-div']}>
					<span
						className={style['clear-or-cancel-label']}
						onClick={() => this.clearList(selectedArmy, this.state.maximumCount)}
					>
						Clear List
					</span>
				</div>

			unitEntryButtonTitle = 
				<div className={style['unit-entry-button-title-bar-wmr']}>
					<h3 className={style['unit-entry-button-title']}>Available Units</h3>
				</div>

			greyedOutUnits = this.determineIfGreyedOut(this.state.listedUnits)

			if (this.state.informationVisible === false) {
				unitEntryButtonDisplay = unitsInArmy.map(unit => {
					return (
						<UnitEntryButton
							key={parseInt(unit.id)}
							id={parseInt(unit.id)}
							unit={unit}
							addUnit={this.addUnit}
							greyedOutUnits={greyedOutUnits}
							updateUnitWhoseInformationIsShown={this.updateUnitWhoseInformationIsShown}
						/>
					)			
				})
			} else {
				unitEntryButtonDisplay =
					<InformationTile
						unitWhoseInformationIsShown={this.state.unitWhoseInformationIsShown}
						specialRules={specialRules}
						toggleInformation={this.toggleInformation}
					/>
			}

			pointTotalDisplay =
				<div className={style['point-total']}>
					Points: <span className={style['bold']}>{this.state.pointTotal}</span><br />
					Unit Count: <span className={style['bold']}>{this.state.unitCount}</span><br />
					Break Point: <span className={style['bold']}>{this.state.breakPoint}</span><br />
				</div>

			listedUnits = this.state.listedUnits.sort((a, b) => {
				return ( parseInt(a.unit.order_within_army) - parseInt(b.unit.order_within_army) )
			})

			listedUnitTileDisplay = listedUnits.map(unitObject => {
				return (
					<div
						key={unitObject.unit.order_within_army}
						id={unitObject.unit.order_within_army}
						className={style['list-output-side-row']}
					>
						<div className={style['list-entry-div']}>
							<MagicItemIcon
								key={parseInt(unitObject.unit.order_within_army)}
								id={parseInt(unitObject.unit.order_within_army)}
								unitObject={unitObject}
								updateUnitBeingGivenMagicItem={this.updateUnitBeingGivenMagicItem}
							/>
							<AuxiliaryIcon
								key={parseInt(unitObject.unit.order_within_army) + 20000}
								id={parseInt(unitObject.unit.order_within_army)}
								unitObject={unitObject}
								updateUnitBeingGivenAuxiliary={this.updateUnitBeingGivenAuxiliary}
							/>
						</div>
						<div className={style['spacer-div']}>_</div>
						<UnitEntryNameTile
							key={unitObject.unit.order_within_army}
							id={unitObject.unit.order_within_army}
							unitObject={unitObject}
							selectedAuxiliaries={this.state.selectedAuxiliaries}
							selectedMagicItems={this.state.selectedMagicItems}
							removeUnit={this.removeUnit}
							removeAuxiliary={this.removeAuxiliary}
							removeMagicItem={this.removeMagicItem}
						/>
					</div>
				)
			})

			viewListButtonDisplay =
				<div className={style['view-list-button-div']}>
					<br /><br />
					<span onClick={this.toggleFormattedList} className={style['view-list-button']}>
						View List
					</span>
				</div>

			
			if (auxiliarySelectionTile !== undefined && magicItemSelectionTile === undefined) {
				listOutputSide = auxiliarySelectionTile
			}
			if (auxiliarySelectionTile === undefined && magicItemSelectionTile !== undefined) {
				listOutputSide = magicItemSelectionTile
			}
	 		if (auxiliarySelectionTile === undefined && magicItemSelectionTile === undefined) {
				listOutputSide =
					<div>
						{pointTotalDisplay}<br />
						{listedUnitTileDisplay}
						{viewListButtonDisplay}
					</div>
			}
		}



		return (
			<div
				id="everything-except-print-section-id"
				className={style['everything-except-print-section']}
			>
				<div id="army-dropdown-section-id" className={style['army-dropdown-section']}>
					<div className={style['to-main-page-link']}>
						<span className={style['to-main-page-link-label']}>
							<Link to="/">-- Good Army Lists --</Link>
						</span>
					</div>
					<div className={style['main-title-box-wmr']}>
						<h2 className={style['main-title']}>Make a Good Warmaster* List</h2>
					</div>
					<div className={style['copyright-notice']}>
						All content is unofficial and unendorsed by Games Workshop Limited
					</div>
					<Select
						placeholder="Select army..."
						options={this.props.armyOptions}
						isSearchable={false}
						styles={this.props.dropdownStyle}
						onChange={this.updateSelectedArmy}
					/>
				</div>
				<div className={displayNoneBottom}>
					{clearListDiv}	
					<div className={style['everything-after-army-dropdown']}>
						<div>
							<div className={style['unit-entry-buttons']}>
								{unitEntryButtonTitle}<br />
								<Select
									defaultValue={{ label: '2000-2999 Points', value: 2 }}
									options={this.props.maximumCountOptions}
									isSearchable={false}
									styles={this.props.dropdownStyle}
									onChange={this.updateMaximumCount}								
								/><br />
								{unitEntryButtonDisplay}
							</div>
						</div>
						<div>
							<div className={style['list-output-side']}>
								<div className={style['list-title-bar-wmr']}>
									<h3 className={style['list-title']}>{selectedArmy.display_name}</h3>
								</div><br />
								{listOutputSide}
							</div>
						</div>
					</div>
					<div className={style['email-div']} id="email-div-id">
						<span>Email:{' '}admin@goodarmylists.com</span>
						<form className={style['paypal-form']} action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
							<input type="hidden" name="cmd" value="_donations" />
							<input type="hidden" name="business" value="admin@goodarmylists.com" />
							<input type="hidden" name="currency_code" value="USD" />
							<input type="image" src={paypal} border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
							<img alt="" border="0" src={paypal} width="1" height="1" />
						</form>
					</div>
				</div>
				<Modal
					appElement={appElement}
					isOpen={this.state.formattedListVisible}
					onRequestClose={this.toggleFormattedList}
					shouldCloseOnOverlayClick={true}
					className={style['formatted-list-modal']}
					ariaHideApp={false}
				>
					<FormattedList
						selectedArmy={selectedArmy}
						listedUnits={listedUnits}
						selectedAuxiliaries={this.state.selectedAuxiliaries}
						selectedMagicItems={this.state.selectedMagicItems}
						pointTotal={this.state.pointTotal}
						unitCount={this.state.unitCount}
						breakPoint={this.state.breakPoint}
						toggleFormattedList={this.toggleFormattedList}
					/>
				</Modal>				
			</div>	
		)
	}
}

export default WmrInnerContainer