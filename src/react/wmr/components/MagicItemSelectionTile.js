import style from '../../../assets/stylesheets/index.module.css'
import React, { Component } from 'react'
import MagicItemSelectionLabel from './MagicItemSelectionLabel'

class MagicItemSelectionTile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			highlightedMagicItems: [],
			highlightedMagicItemsNamesOnly: [],
			pointsOfAllHighlighted: 0,
			alreadySelectedByThisUnit: [],
			optionPointTotalForThisUnit: 0
		}
		this.updateHighlightedMagicItems = this.updateHighlightedMagicItems.bind(this)
	}

	componentDidMount() {
		let alreadySelectedByThisUnit = []
		let namesOnly = []
		let optionPointTotalForThisUnit = 0
		let i2
		for (i2 = 0; i2 < this.props.selectedMagicItems.length; i2++) {
			if (this.props.selectedMagicItems[i2].unitName === this.props.unitObject.unit.name) {
				alreadySelectedByThisUnit.push(this.props.selectedMagicItems[i2])
			}
		}
		for (i2 = 0; i2 < alreadySelectedByThisUnit.length; i2++) {
			optionPointTotalForThisUnit += parseInt(alreadySelectedByThisUnit[i2].magicItem.points) * alreadySelectedByThisUnit[i2].count
			namesOnly.push(alreadySelectedByThisUnit[i2].magicItem.name)
		}
		this.setState({
			alreadySelectedByThisUnit: namesOnly,
			optionPointTotalForThisUnit: optionPointTotalForThisUnit
		})	
	}

	updateHighlightedMagicItems(magicItem) {
		let highlightedMagicItems = this.state.highlightedMagicItems
		let highlightedMagicItemsNamesOnly = []
		let magicItemObject
		let duplicateCount = 0
		let totalCount = 0
		let pointsOfAllHighlighted = 0
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
		for (i2 = highlightedMagicItems.length - 1; i2 >= 0; i2--) {
			if (!this.props.determineIfValidAfterPointIncrease(parseInt(highlightedMagicItems[i2].magicItem.points) * highlightedMagicItems[i2].count - this.state.optionPointTotalForThisUnit + this.state.pointsOfAllHighlighted)) {
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

		for (i2 = 0; i2 < highlightedMagicItems.length; i2++) {
			highlightedMagicItemsNamesOnly.push(highlightedMagicItems[i2].magicItem.name)
			pointsOfAllHighlighted += parseInt(highlightedMagicItems[i2].magicItem.points) * highlightedMagicItems[i2].count
		}

		this.setState({
			highlightedMagicItems: highlightedMagicItems,
			highlightedMagicItemsNamesOnly: highlightedMagicItemsNamesOnly,
			pointsOfAllHighlighted: pointsOfAllHighlighted
		})		
	}

	render() {
		let unitObject = this.props.unitObject
		let selectedAuxiliaries = this.props.selectedAuxiliaries
		let highlightedMagicItems = this.state.highlightedMagicItems
		let availableMagicItems = []
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
				availableMagicItems.push(sortedMagicItems[i2])
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
				availableMagicItems.push(sortedMagicItems[i2])
			}
			if (sortedMagicItems[i2].magic_item_type === 'Device of Power') {
				if (sortedMagicItems[i2].only_for.includes('General')) {
					if (unitObject.unit.unit_type === 'General') {
						availableMagicItems.push(sortedMagicItems[i2])
					}
				}
				if (sortedMagicItems[i2].only_for.includes('Wizard')) {
					if (unitObject.unit.unit_type === 'Wizard') {
						availableMagicItems.push(sortedMagicItems[i2])
					}
					if (tzarina === true || sorcererLord === true) {
						if (unitObject.unit.unit_type === 'General') {
							availableMagicItems.push(sortedMagicItems[i2])
						}
					}
				}
				if (sortedMagicItems[i2].only_for.includes('Runesmith')) {
					if (unitObject.unit.name.includes('Runesmith')) {
						availableMagicItems.push(sortedMagicItems[i2])
					}
				}
			}
		}

		let magicItemDisplay = availableMagicItems.map(magicItem => {
			let greyedOut = false
			let highlighted = false
			let count = 0

			if (
				!this.state.highlightedMagicItemsNamesOnly.includes(magicItem.name) &&
				!this.props.determineIfValidAfterPointIncrease(parseInt(magicItem.points) - this.state.optionPointTotalForThisUnit + this.state.pointsOfAllHighlighted)
			) {
				greyedOut = true
			}

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
					greyedOut={greyedOut}
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
					{magicItemDisplay}<br /><br />
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