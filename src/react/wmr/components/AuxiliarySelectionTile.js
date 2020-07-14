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

	componentDidMount() {
		let unitObject = this.props.unitObject
		let auxiliaries = this.props.auxiliaries
		let selectedAuxiliaries = this.props.selectedAuxiliaries
		let highlightedAuxiliaries = []
		let i2
		let i3
		for (i2 = 0; i2 < selectedAuxiliaries.length; i2++) {
			for (i3 = 0; i3 < auxiliaries.length; i3++) {	
				if (
					selectedAuxiliaries[i2].index === unitObject.index &&
					selectedAuxiliaries[i2].auxiliary.name === auxiliaries[i3].name
				) {
					highlightedAuxiliaries.push(selectedAuxiliaries[i2].auxiliary)
				}
			}
		}
		this.setState({ highlightedAuxiliaries: highlightedAuxiliaries })
	}

	updateHighlightedAuxiliaries(auxiliary, highlightingAction) {
		let highlightedAuxiliaries = this.state.highlightedAuxiliaries
		let i2

		if (highlightingAction === 'remove') {
			for (i2 = 0; i2 < highlightedAuxiliaries.length; i2++) {
				if (parseInt(highlightedAuxiliaries[i2].id) === parseInt(auxiliary.id)) {
					highlightedAuxiliaries.splice(highlightedAuxiliaries.indexOf(auxiliary), 1)
				}
			}
		}

		if (highlightingAction === 'add') {
			if (auxiliary.name.includes('to replace')) {
				for (i2 = 0; i2 < highlightedAuxiliaries.length; i2++) {
					if (auxiliary.display_name.includes(highlightedAuxiliaries[i2].display_name)) {
						highlightedAuxiliaries.splice(highlightedAuxiliaries.indexOf(highlightedAuxiliaries[i2]), 1)
					}
				}
			}
			highlightedAuxiliaries.push(auxiliary)
		}

		this.setState({ highlightedAuxiliaries: highlightedAuxiliaries })
	}

	render() {
		let unitObject
		let auxiliaries = this.props.auxiliaries
		let highlightedAuxiliaries = this.state.highlightedAuxiliaries
		let selectButton
		let nonMounts = []
		let mounts = []
		let i2

		unitObject = this.props.unitObject
		selectButton =
			<span 
				onClick={() => this.props.addAuxiliary(
					unitObject,
					this.state.highlightedAuxiliaries
				)}
				className={style['clear-or-cancel-label']}
			>
				Select
			</span>		

		for (i2 = 0; i2 < auxiliaries.length; i2++) {
			if (parseInt(auxiliaries[i2].kow_unit_id) === parseInt(unitObject.unit.id)) {
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
		let sortedNonMounts = nonMounts.sort((a, b) => {
			return (parseInt(a.points) - parseInt(b.points))
		})
		let sortedMounts = mounts.sort((a, b) => {
			return (parseInt(a.points) - parseInt(b.points))
		})
		let nonMountDisplay = sortedNonMounts.map(auxiliary => {
			let highlighted = false
			let greyedOut = false

			for (i2 = 0; i2 < highlightedAuxiliaries.length; i2++) {
				if (parseInt(highlightedAuxiliaries[i2].id) === parseInt(auxiliary.id)) {
					highlighted = true
				}
			}

			return (
				<AuxiliarySelectionLabel
					key={parseInt(auxiliary.id)}
					id={parseInt(auxiliary.id)}
					auxiliary={auxiliary}
					updateHighlightedAuxiliaries={this.updateHighlightedAuxiliaries}
					greyedOut={greyedOut}
					highlighted={highlighted}
				/>
			)
		})
		
		let mountDisplay = sortedMounts.map(auxiliary => {
			let highlighted = false
			let greyedOut = false

			for (i2 = 0; i2 < highlightedAuxiliaries.length; i2++) {
				if (parseInt(highlightedAuxiliaries[i2].id) === parseInt(auxiliary.id)) {
					highlighted = true
				}
			}

			return (
				<AuxiliarySelectionLabel
					key={parseInt(auxiliary.id) + 20000}
					id={parseInt(auxiliary.id)}
					auxiliary={auxiliary}
					updateHighlightedAuxiliaries={this.updateHighlightedAuxiliaries}
					greyedOut={greyedOut}
					highlighted={highlighted}
				/>
			)
		})

		return (
			<div>
				<h4 className={style['auxiliary-title-wmr']}>
					What option(s) will be given<br />
					{unitObject.unit.display_name} have?
				</h4><br />
				<div className={style['unit-option-selections']}>
					{nonMountDisplay}
					{mountDisplay}<br /><br />
				</div>
				<div>
					{selectButton}
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