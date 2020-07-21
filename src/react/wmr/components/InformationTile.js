import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const InformationTile = props => {
	let unsortedUnitSpecialRules = []
	let i2

	for (i2 = 0; i2 < props.specialRules.length; i2++) {
		if (props.specialRules[i2].unit_name === props.unitWhoseInformationIsShown.name) {
			unsortedUnitSpecialRules.push(props.specialRules[i2])
		}
	}

	let unitSpecialRules = unsortedUnitSpecialRules.sort((a, b) => {
		return ( a.order_within_unit - b.order_within_unit )
	})

	let unitSpecialRuleDisplay = unitSpecialRules.map(specialRule => {
		return (
			<div
				key={parseInt(specialRule.id)}
				className={style['special-rule-entry']}
			>
				{specialRule.description}
			</div>
		)
	})

	let goBack = () => {
		props.toggleInformation()
	}

	return (
		<div onDoubleClick={goBack} className={style['information-tile']}>
			<h4 className={style['information-title-wmr']}>
				{props.unitWhoseInformationIsShown.list_name}
			</h4><br />
			<span 
				onClick={props.toggleInformation}
				className={style['clear-or-cancel-label']}
			>
				Back
			</span><br /><br />		
			{unitSpecialRuleDisplay}
		</div>
	)
}

export default InformationTile