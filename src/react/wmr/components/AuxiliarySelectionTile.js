import style from '../../../assets/stylesheets/index.module.css'
import React, { Component } from 'react'
import AuxiliarySelectionLabel from './AuxiliarySelectionLabel'

class AuxiliarySelectionTile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			highlightedAuxiliaries: []
		}
		this.updateHighlightedAuxiliaries = this.updateHighlightedAuxiliaries.bind(this)
	}

	updateHighlightedAuxiliaries(auxiliary) {
		let highlightedAuxiliaries = this.state.highlightedAuxiliaries
		let auxiliaryObject
		let duplicateCount = 0
		let totalCount = 0
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
				highlightedAuxiliaries[i2].count > 1 &&
				highlightedAuxiliaries[i2].auxiliary.special_rules.includes('no matter how large, can have no more than one')
			) {
				highlightedAuxiliaries.splice(highlightedAuxiliaries.indexOf(highlightedAuxiliaries[i2]), 1)
			}
		}
		for (i2 = highlightedAuxiliaries.length - 1; i2 >= 0; i2--) {
			if (!this.props.determineIfValidAfterPointIncrease(parseInt(highlightedAuxiliaries[i2].auxiliary.points) * highlightedAuxiliaries[i2].count)) {
				highlightedAuxiliaries.splice(highlightedAuxiliaries.indexOf(highlightedAuxiliaries[i2]), 1)
			}
		}
		if (totalCount > this.props.unitObject.count) { 
			for (i2 = highlightedAuxiliaries.length - 1; i2 >= 0; i2--) {
				if (highlightedAuxiliaries[i2].auxiliary.name === auxiliary.name) {
					highlightedAuxiliaries.splice(highlightedAuxiliaries.indexOf(highlightedAuxiliaries[i2]), 1)
				}
			}
		}

		this.setState({	highlightedAuxiliaries: highlightedAuxiliaries })
	}

	render() {
		let unitObject = this.props.unitObject
		let allAuxiliaries = this.props.auxiliaries
		let highlightedAuxiliaries = this.state.highlightedAuxiliaries
		let unsortedAuxiliaries = []
		let i2

		for (i2 = 0; i2 < allAuxiliaries.length; i2++) {
			if (allAuxiliaries[i2].used_by.includes(unitObject.unit.name)) {
				unsortedAuxiliaries.push(allAuxiliaries[i2])
			}
		}
		let auxiliaries = unsortedAuxiliaries.sort((a, b) => {
			return (parseInt(a.order_within_army) - parseInt(b.order_within_army))
		})

		let auxiliaryDisplay = auxiliaries.map(auxiliary => {
			let greyedOut = false
			let highlighted = false
			let count = 0

			if (!this.props.determineIfValidAfterPointIncrease(parseInt(auxiliary.points))) {
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
				question = `What option will be given to the ${unitObject.unit.list_name}?`
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