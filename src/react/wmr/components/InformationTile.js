import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const InformationTile = props => {
	let unsortedUnitSpecialRules = []
	let minimum = props.unitWhoseInformationIsShown.minimum
	let maximum = props.unitWhoseInformationIsShown.maximum
	let minMaxLine
	let i2

	if (props.unitWhoseInformationIsShown.minimum === null) {
		minimum = '-'
	}
	if (props.unitWhoseInformationIsShown.maximum === null) {
		maximum = '-'
	}
	if (
		props.unitWhoseInformationIsShown.has_special_rules === true ||
		props.unitWhoseInformationIsShown.has_special_rules === 't'
	) {
		minMaxLine = <div>{'Min/Max: '}{minimum}{'/'}{maximum}<br /><br /></div>
	} else {
		minMaxLine = <div>{'Min/Max: '}{minimum}{'/'}{maximum}<br /></div>
	}

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
			<div className={style['special-rule-entry']}>
				Type: {props.unitWhoseInformationIsShown.unit_type}<br />
				Attacks: {props.unitWhoseInformationIsShown.attacks}<br />
				Hits: {props.unitWhoseInformationIsShown.hits}<br />
				Armor: {props.unitWhoseInformationIsShown.armor}<br />
				Command: {props.unitWhoseInformationIsShown.command}<br />
				Unit Size: {props.unitWhoseInformationIsShown.unit_size}<br />
				Points: {props.unitWhoseInformationIsShown.points}<br />
				{minMaxLine}
			</div>
			{unitSpecialRuleDisplay}
		</div>
	)
}

export default InformationTile