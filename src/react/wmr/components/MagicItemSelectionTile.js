import style from '../../../assets/stylesheets/index.module.css'
import React, { Component } from 'react'
import MagicItemSelectionLabel from './MagicItemSelectionLabel'

class MagicItemSelectionTile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			highlightedMagicItems: []
		}
		this.updateHighlightedMagicItems = this.updateHighlightedMagicItems.bind(this)
	}

	updateHighlightedMagicItems(magicItem) {
		let highlightedMagicItems = this.state.highlightedMagicItems
		let magicItemObject
		let duplicateCount = 0
		let totalCount = 0
		let i2
		for (i2 = 0; i2 < highlightedMagicItems.length; i2++) {
			if (highlightedMagicItems[i2].magicItem.name === magicItem.name) {
				highlightedMagicItems[i2].count += 1
				duplicateCount = highlightedMagicItems[i2].count
			}
		}
		if (duplicateCount === 0) {
			magicItemObject = {
				unitName: this.props.unitObject.unit.name,
				count: 1,
				magicItem: magicItem
			}
			highlightedMagicItems.push(magicItemObject)			
		} 

		let allSeparateCounts = highlightedMagicItems.map(magicItem => magicItem.count)
		for (i2 = 0; i2 < allSeparateCounts.length; i2++) {
			totalCount += allSeparateCounts[i2]
		}
		for (i2 = highlightedMagicItems.length - 1; i2 >= 0; i2--) {
			if (highlightedMagicItems[i2].count > 1) {
				highlightedMagicItems.splice(highlightedMagicItems.indexOf(highlightedMagicItems[i2]), 1)
			}
		}
		if (totalCount > this.props.unitObject.count) {
			for (i2 = highlightedMagicItems.length - 1; i2 >= 0; i2--) {
				if (highlightedMagicItems[i2].magicItem.name === magicItem.name) {
					highlightedMagicItems.splice(highlightedMagicItems.indexOf(highlightedMagicItems[i2]), 1)
				}
			}
		}

		this.setState({	highlightedMagicItems: highlightedMagicItems })		
	}

	render() {
		let unitObject = this.props.unitObject
		let selectedAuxiliaries = this.props.selectedAuxiliaries
		let highlightedMagicItems = this.state.highlightedMagicItems
		let magicStandards = []
		let magicWeapons = []
		let devicesOfPower = []
		let tzarina = false
		let sorcererLord = false
		let i2

		for (i2 = 0; i2 < selectedAuxiliaries.length; i2++) {
			if (selectedAuxiliaries[i2].auxiliary.name === 'Tzarina (Kislev)') {
				tzarina = true
			}
			if (selectedAuxiliaries[i2].auxiliary.name === 'Sorcerer Lord (Chaos Dwarfs)') {
				sorcererLord = true
			}
		}

		let sortedMagicItems = this.props.magicItems.sort((a, b) => {
			return ( parseInt(a.id) - parseInt(b.id) )
		})

		for (i2 = 0; i2 < sortedMagicItems.length; i2++) {
			if (
				sortedMagicItems[i2].magic_item_type === 'Magic Standard' && (
					unitObject.unit.unit_type === 'Infantry' ||
					unitObject.unit.unit_type === 'Cavalry' ||
					unitObject.unit.unit_type === 'Chariot'
				)
			) {
				magicStandards.push(sortedMagicItems[i2])
			}
			if (
				sortedMagicItems[i2].magic_item_type === 'Magic Weapon' && (
					unitObject.unit.unit_type === 'Infantry' ||
					unitObject.unit.unit_type === 'Cavalry' ||
					unitObject.unit.unit_type === 'Chariot' ||
					unitObject.unit.unit_type === 'General' ||
					unitObject.unit.unit_type === 'Hero' ||
					unitObject.unit.unit_type === 'Wizard'										
				)
			) {
				magicWeapons.push(sortedMagicItems[i2])
			}
			if (sortedMagicItems[i2].magic_item_type === 'Device of Power') {
				if (sortedMagicItems[i2].only_for.includes('General')) {
					if (unitObject.unit.unit_type === 'General') {
						devicesOfPower.push(sortedMagicItems[i2])
					}
				}
				if (sortedMagicItems[i2].only_for.includes('Wizard')) {
					if (unitObject.unit.unit_type === 'Wizard') {
						devicesOfPower.push(sortedMagicItems[i2])
					}
					if (tzarina === true || sorcererLord === true) {
						if (unitObject.unit.unit_type === 'General') {
							devicesOfPower.push(sortedMagicItems[i2])
						}
					}
				}
				if (sortedMagicItems[i2].only_for.includes('Runesmith')) {
					if (unitObject.unit.name.includes('Runesmith')) {
						devicesOfPower.push(sortedMagicItems[i2])
					}
				}
			}
		}

		let magicStandardDisplay = magicStandards.map(magicItem => {
			let highlighted = false
			let count = 0
			for (i2 = 0; i2 < highlightedMagicItems.length; i2++) {
				if (highlightedMagicItems[i2].magicItem.name === magicItem.name) {
					highlighted = true
					count = highlightedMagicItems[i2].count
				}
			}
			return (
				<MagicItemSelectionLabel
					key={parseInt(magicItem.id)}
					id={parseInt(magicItem.id)}
					unitObject={unitObject}
					magicItem={magicItem}
					updateHighlightedMagicItems={this.updateHighlightedMagicItems}
					highlighted={highlighted}
					count={count}
				/>
			)
		})
		let magicWeaponDisplay = magicWeapons.map(magicItem => {
			let highlighted = false
			let count = 0
			for (i2 = 0; i2 < highlightedMagicItems.length; i2++) {
				if (highlightedMagicItems[i2].magicItem.name === magicItem.name) {
					highlighted = true
					count = highlightedMagicItems[i2].count
				}
			}
			return (
				<MagicItemSelectionLabel
					key={parseInt(magicItem.id)}
					id={parseInt(magicItem.id)}
					unitObject={unitObject}
					magicItem={magicItem}
					updateHighlightedMagicItems={this.updateHighlightedMagicItems}
					highlighted={highlighted}
					count={count}
				/>
			)
		})
		let deviceOfPowerDisplay = devicesOfPower.map(magicItem => {
			let highlighted = false
			let count = 0
			for (i2 = 0; i2 < highlightedMagicItems.length; i2++) {
				if (highlightedMagicItems[i2].magicItem.name === magicItem.name) {
					highlighted = true
					count = highlightedMagicItems[i2].count
				}
			}
			return (
				<MagicItemSelectionLabel
					key={parseInt(magicItem.id)}
					id={parseInt(magicItem.id)}
					unitObject={unitObject}
					magicItem={magicItem}
					updateHighlightedMagicItems={this.updateHighlightedMagicItems}
					highlighted={highlighted}
					count={count}
				/>
			)
		})

		let question
		if (unitObject.unit.unit_type === 'Hero' || unitObject.unit.unit_type === 'Wizard') {
			if (unitObject.count > 1) {
				question = `What Magic Item(s) will be given to ${unitObject.unit.option_screen_name}?`
			} else {
				question = `What Magic Item will be given to the ${unitObject.unit.list_name}?`
			}
		} else if (unitObject.unit.unit_type === 'General') {
			question = `What Magic Item will be given to ${unitObject.unit.option_screen_name}?`
		} else {
			question = `What Magic Item(s) will be given to the ${unitObject.unit.option_screen_name}?`
		}

		return (
			<div>
				<h4 className={style['magic-item-title-wmr']}>
					{question}
				</h4><br />
				<div className={style['artifact-selections']}>
					{magicStandardDisplay}
					{magicWeaponDisplay}
					{deviceOfPowerDisplay}<br /><br />
				</div>
				<div>
					<span 
						onClick={() => this.props.addMagicItem(
							unitObject,
							this.state.highlightedMagicItems
						)}
						className={style['clear-or-cancel-label']}
					>
						Select
					</span>
					<span 
						onClick={this.props.toggleMagicItems}
						className={style['clear-or-cancel-label']}
					>
						Cancel
					</span>
				</div>
			</div>
		)
	}
}

export default MagicItemSelectionTile