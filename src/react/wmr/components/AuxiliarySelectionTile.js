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

	updateHighlightedAuxiliaries(auxiliary, highlightingAction) {
		let selectedAuxiliaries = this.props.selectedAuxiliaries
		let highlightedAuxiliaries = this.state.highlightedAuxiliaries
		let i2



		if (highlightingAction === 'remove') {
			let newHighlightedAuxiliaries = []
			for (i2 = 0; i2 < highlightedAuxiliaries.length; i2++) {
				if (highlightedAuxiliaries[i2].name !== auxiliary.name) {
					newHighlightedAuxiliaries.push(highlightedAuxiliaries[i2])
				}
			}
			highlightedAuxiliaries = newHighlightedAuxiliaries
		}
		if (highlightingAction === 'add') {
			if (
				 (
					auxiliary.special_rules.includes('not independent') === false ||
					auxiliary.special_rules.includes('not independent') === 'f'
				)
			) {
				for (i2 = 0; i2 < highlightedAuxiliaries.length; i2++) {
					if (
						highlightedAuxiliaries.length >= this.props.unitObject.count && (
							highlightedAuxiliaries[i2].special_rules.includes('not independent') === false ||
							highlightedAuxiliaries[i2].special_rules.includes('not independent') === 'f'
						)
					) {
						highlightedAuxiliaries.splice(highlightedAuxiliaries.indexOf(highlightedAuxiliaries[i2]), 1)
					}
				}
			}			
			highlightedAuxiliaries.push(auxiliary)
		}

		let sortedHighlightedAuxiliaries = highlightedAuxiliaries.sort((a, b) => {
			return ( parseInt(a.id) - parseInt(b.id) )
		})
		highlightedAuxiliaries = sortedHighlightedAuxiliaries

		this.setState({	highlightedAuxiliaries: highlightedAuxiliaries })
	}

	render() {
		let unitObject = this.props.unitObject
		let auxiliaries = this.props.auxiliaries
		let highlightedAuxiliaries = this.state.highlightedAuxiliaries
		let nonMounts = []
		let mounts = []
		let i2

		for (i2 = 0; i2 < auxiliaries.length; i2++) {
			if (auxiliaries[i2].used_by.includes(unitObject.unit.name)) {
				if (
					auxiliaries[i2].special_rules.includes('not independent') === false ||
					auxiliaries[i2].special_rules.includes('not independent') === 'f'
					) {
					mounts.push(auxiliaries[i2])
				} else {
					nonMounts.push(auxiliaries[i2])
				}
			}
		}
		let sortedMounts = mounts.sort((a, b) => {
			return (parseInt(a.order_within_army) - parseInt(b.order_within_army))
		})
		let sortedNonMounts = nonMounts.sort((a, b) => {
			return (parseInt(a.order_within_army) - parseInt(b.order_within_army))
		})
		
		let mountDisplay = sortedMounts.map(auxiliary => {
			let highlighted = false
			let duplicateAuxiliaryCount = 0

			for (i2 = 0; i2 < highlightedAuxiliaries.length; i2++) {
				if (highlightedAuxiliaries[i2].name === auxiliary.name) {
					highlighted = true
					duplicateAuxiliaryCount += 1
				}
			}

			return (
				<AuxiliarySelectionLabel
					key={parseInt(auxiliary.id) + 20000}
					id={parseInt(auxiliary.id)}
					auxiliary={auxiliary}
					unitObject={unitObject}
					updateHighlightedAuxiliaries={this.updateHighlightedAuxiliaries}
					highlighted={highlighted}
					duplicateAuxiliaryCount={duplicateAuxiliaryCount}
				/>
			)
		})

		let nonMountDisplay = sortedNonMounts.map(auxiliary => {
			let highlighted = false
			let duplicateAuxiliaryCount = 0

			for (i2 = 0; i2 < highlightedAuxiliaries.length; i2++) {
				if (highlightedAuxiliaries[i2].name === auxiliary.name) {
					highlighted = true
					duplicateAuxiliaryCount += 1
				}
			}

			return (
				<AuxiliarySelectionLabel
					key={parseInt(auxiliary.id)}
					id={parseInt(auxiliary.id)}
					auxiliary={auxiliary}
					unitObject={unitObject}
					updateHighlightedAuxiliaries={this.updateHighlightedAuxiliaries}
					highlighted={highlighted}
					duplicateAuxiliaryCount={duplicateAuxiliaryCount}
				/>
			)
		})
		let question
		if (unitObject.unit.unit_type === 'Hero' || unitObject.unit.unit_type === 'Wizard') {
			if (unitObject.count > 1) {
				question = `What option(s) will be given to ${unitObject.unit.option_screen_name}?`
			} else {
				question = `What option(s) will be given to ${unitObject.unit.singular_name}?`
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
					{nonMountDisplay}
					{mountDisplay}<br /><br />
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