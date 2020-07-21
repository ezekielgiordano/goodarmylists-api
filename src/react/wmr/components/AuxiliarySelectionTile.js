import style from '../../../assets/stylesheets/index.module.css'
import React, { Component } from 'react'
import AuxiliarySelectionLabel from './AuxiliarySelectionLabel'

class AuxiliarySelectionTile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			highlightedAuxiliaries: [],
			highlightedAuxiliariesNamesOnly: [],
			pointsOfAllHighlighted: 0,
			alreadySelectedByThisUnit: [],
			optionPointTotalForThisUnit: 0
		}
		this.updateHighlightedAuxiliaries = this.updateHighlightedAuxiliaries.bind(this)
	}

	componentDidMount() {
		let alreadySelectedByThisUnit = []
		let namesOnly = []
		let optionPointTotalForThisUnit = 0
		let i2
		for (i2 = 0; i2 < this.props.selectedAuxiliaries.length; i2++) {
			if (this.props.selectedAuxiliaries[i2].unitName === this.props.unitObject.unit.name) {
				alreadySelectedByThisUnit.push(this.props.selectedAuxiliaries[i2])
			}
		}
		for (i2 = 0; i2 < alreadySelectedByThisUnit.length; i2++) {
			optionPointTotalForThisUnit += parseInt(alreadySelectedByThisUnit[i2].auxiliary.points) * alreadySelectedByThisUnit[i2].count
			namesOnly.push(alreadySelectedByThisUnit[i2].auxiliary.name)
		}
		this.setState({
			alreadySelectedByThisUnit: namesOnly,
			optionPointTotalForThisUnit: optionPointTotalForThisUnit
		})	
	}

	updateHighlightedAuxiliaries(auxiliary) {
		let highlightedAuxiliaries = this.state.highlightedAuxiliaries
		let highlightedAuxiliariesNamesOnly = []
		let auxiliaryObject
		let duplicateCount = 0
		let totalCount = 0
		let pointsOfAllHighlighted = 0
		let i2
		for (i2 = 0; i2 < highlightedAuxiliaries.length; i2++) {
			if (highlightedAuxiliaries[i2].auxiliary.name === auxiliary.name) {
				highlightedAuxiliaries[i2].count += 1
				duplicateCount = highlightedAuxiliaries[i2].count
			}
		}
		if (duplicateCount === 0) {
			auxiliaryObject = {
				unitName: this.props.unitObject.unit.name,
				count: 1,
				auxiliary: auxiliary
			}
			highlightedAuxiliaries.push(auxiliaryObject)			
		} 

		let allSeparateCounts = highlightedAuxiliaries.map(auxiliary => auxiliary.count)
		for (i2 = 0; i2 < allSeparateCounts.length; i2++) {
			totalCount += allSeparateCounts[i2]
		}
		for (i2 = highlightedAuxiliaries.length - 1; i2 >= 0; i2--) {
			if (
				highlightedAuxiliaries[i2].count > 1 && (
					highlightedAuxiliaries[i2].auxiliary.is_unique === true ||
					highlightedAuxiliaries[i2].auxiliary.is_unique === 't'
				)
			) {
				highlightedAuxiliaries.splice(highlightedAuxiliaries.indexOf(highlightedAuxiliaries[i2]), 1)
			}
		}
		for (i2 = highlightedAuxiliaries.length - 1; i2 >= 0; i2--) {
			if (
				parseInt(highlightedAuxiliaries[i2].auxiliary.maximum) * highlightedAuxiliaries[i2].count >
				this.props.calculateMaximumCount(this.props.pointTotal + (parseInt(highlightedAuxiliaries[i2].auxiliary.points)) * highlightedAuxiliaries[i2].count - this.state.optionPointTotalForThisUnit + this.state.pointsOfAllHighlighted)
			) {
				highlightedAuxiliaries.splice(highlightedAuxiliaries.indexOf(highlightedAuxiliaries[i2]), 1)
			}
		}
		for (i2 = highlightedAuxiliaries.length - 1; i2 >= 0; i2--) {
			if (highlightedAuxiliaries[i2].auxiliary.special_rules.includes('not independent')) {
				if (!this.props.determineIfValidAfterPointIncrease(parseInt(highlightedAuxiliaries[i2].auxiliary.points) * highlightedAuxiliaries[i2].count - this.state.optionPointTotalForThisUnit)) {
					highlightedAuxiliaries.splice(highlightedAuxiliaries.indexOf(highlightedAuxiliaries[i2]), 1)
				}
			} else {
				if (!this.props.determineIfValidAfterPointIncrease(parseInt(highlightedAuxiliaries[i2].auxiliary.points) * highlightedAuxiliaries[i2].count - this.state.optionPointTotalForThisUnit + this.state.pointsOfAllHighlighted)) {
					highlightedAuxiliaries.splice(highlightedAuxiliaries.indexOf(highlightedAuxiliaries[i2]), 1)
				}				
			}
		}
		if (totalCount > this.props.unitObject.count) { 
			for (i2 = highlightedAuxiliaries.length - 1; i2 >= 0; i2--) {
				if (highlightedAuxiliaries[i2].auxiliary.name === auxiliary.name) {
					if (
						(auxiliary.name === 'Bear (Kislev)' && this.props.unitObject.unit.unit_type === 'General') ||
						(auxiliary.name === 'Great Taurus (Chaos Dwarfs)' && this.props.unitObject.unit.unit_type === 'General') ||
						(auxiliary.name === 'Were Kin (Norse)' && this.props.unitObject.unit.unit_type === 'Wizard') ||
						auxiliary.name === 'Demonic Wings (Demons)' ||
						auxiliary.name === 'Favor of the Gods (Demons)'
					) {
						if (highlightedAuxiliaries[i2].count > this.props.unitObject.count) {
							highlightedAuxiliaries.splice(highlightedAuxiliaries.indexOf(highlightedAuxiliaries[i2]), 1)
						}
					} else {
						highlightedAuxiliaries.splice(highlightedAuxiliaries.indexOf(highlightedAuxiliaries[i2]), 1)
					}
				}
			}
		}

		for (i2 = 0; i2 < highlightedAuxiliaries.length; i2++) {
			highlightedAuxiliariesNamesOnly.push(highlightedAuxiliaries[i2].auxiliary.name)
			pointsOfAllHighlighted += parseInt(highlightedAuxiliaries[i2].auxiliary.points) * highlightedAuxiliaries[i2].count
		}

		this.setState({
			highlightedAuxiliaries: highlightedAuxiliaries,
			highlightedAuxiliariesNamesOnly: highlightedAuxiliariesNamesOnly,
			pointsOfAllHighlighted: pointsOfAllHighlighted
		})
	}

	render() {
		let unitObject = this.props.unitObject
		let highlightedAuxiliaries = this.state.highlightedAuxiliaries
		let availableAuxiliaries = []
		let i2

		let sortedAuxiliaries = this.props.auxiliaries.sort((a, b) => {
			return ( parseInt(a.order_within_army) - parseInt(b.order_within_army) )
		})

		for (i2 = 0; i2 < sortedAuxiliaries.length; i2++) {
			if (sortedAuxiliaries[i2].used_by.includes(unitObject.unit.name)) {
				availableAuxiliaries.push(sortedAuxiliaries[i2])
			}
		}

		let auxiliaryDisplay = availableAuxiliaries.map(auxiliary => {
			let selectedAuxiliaries = this.props.selectedAuxiliaries
			let greyedOut = false
			let highlighted = false
			let timesUsedByOthers = 0
			let count = 0

			for (i2 = 0; i2 < selectedAuxiliaries.length; i2++) {
				if (
					selectedAuxiliaries[i2].auxiliary.name === auxiliary.name &&
					selectedAuxiliaries[i2].unitName !== unitObject.unit.name
				) {
					timesUsedByOthers += selectedAuxiliaries[i2].count
				}
			}

			if (timesUsedByOthers >= this.props.calculateMaximumCount(this.props.pointTotal + parseInt(auxiliary.points) - this.state.optionPointTotalForThisUnit + this.state.pointsOfAllHighlighted)) {
				greyedOut = true
			}

			if (
				!this.state.highlightedAuxiliariesNamesOnly.includes(auxiliary.name) &&
				!this.props.determineIfValidAfterPointIncrease(parseInt(auxiliary.points) - this.state.optionPointTotalForThisUnit + this.state.pointsOfAllHighlighted)
			) {
				greyedOut = true
			}

			for (i2 = 0; i2 < highlightedAuxiliaries.length; i2++) {
				if (highlightedAuxiliaries[i2].auxiliary.name === auxiliary.name) {
					highlighted = true
					count = highlightedAuxiliaries[i2].count
				}
			}

			return (
				<AuxiliarySelectionLabel
					key={parseInt(auxiliary.id) + 20000}
					id={parseInt(auxiliary.id)}
					unitObject={unitObject}
					auxiliary={auxiliary}
					updateHighlightedAuxiliaries={this.updateHighlightedAuxiliaries}
					greyedOut={greyedOut}
					highlighted={highlighted}
					count={count}
				/>
			)
		})

		let question
		if (
			unitObject.unit.unit_type === 'General' ||
			unitObject.unit.unit_type === 'Hero' ||
			unitObject.unit.unit_type === 'Wizard'
		) {
			if (unitObject.count > 1) {
				question = `What option(s) will be given to ${unitObject.unit.option_screen_name}?`
			} else {
				question = `What option(s) will be given to the ${unitObject.unit.list_name}?`
			}
		} else {
			question = `What option(s) will be given to ${unitObject.unit.option_screen_name}?`
		}

		return (
			<div>
				<h4 className={style['auxiliary-title-wmr']}>
					{question}
				</h4><br />
				<div className={style['unit-option-selections']}>
					{auxiliaryDisplay}<br /><br />
				</div>
				<div>
					<span 
						onClick={() => this.props.addAuxiliary(
							unitObject,
							this.state.highlightedAuxiliaries
						)}
						className={style['clear-or-cancel-label']}
					>
						Select
					</span>	
					<span 
						onClick={this.props.toggleAuxiliaries}
						className={style['clear-or-cancel-label']}
					>
						Cancel
					</span>
				</div>
			</div>
		)
	}
}

export default AuxiliarySelectionTile