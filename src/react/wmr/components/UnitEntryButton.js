import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const UnitEntryButton = props => {
	let extraSpace
	if (parseInt(props.unit.points) < 100) {
		extraSpace = <span className={style['hidden']}>{'_'}</span>
	}
	let greyedOut = false
	let i2
	for (i2 = 0; i2 < props.greyedOutUnits.length; i2++) {
		if (props.greyedOutUnits[i2].name === props.unit.name) {
			greyedOut = true
		}
	}

	let pointDisplay
	let unitNameDisplay
	if (greyedOut === false) {
		if (props.unit.has_special_rules === true || props.unit.has_special_rules === 't') {
			pointDisplay =
				<span
					onClick={() => props.updateUnitWhoseInformationIsShown(props.unit)}
					className={style['unit-entry-button-point-value-label-wmr']}
				>
					{parseInt(props.unit.points)}
				</span>
		} else {
			pointDisplay =
				<span className={style['unit-entry-button-point-value-no-special']}>
					{parseInt(props.unit.points)}
				</span>
		}
		unitNameDisplay =
			<span
				onClick={() => props.addUnit(props.unit)}
				className={style['unit-entry-button-label']}
			>
				{props.unit.display_name}
			</span>
	} else {
		if (props.unit.has_special_rules === true || props.unit.has_special_rules === 't') {
			pointDisplay =
				<span
					onClick={() => props.updateUnitWhoseInformationIsShown(props.unit)}
					className={style['unit-entry-button-point-value-label-greyed-out']}
				>
					{parseInt(props.unit.points)}
				</span>
		} else {
			pointDisplay =
				<span className={style['unit-entry-button-point-value-no-special-greyed-out']}>
					{parseInt(props.unit.points)}
				</span>
		}
		unitNameDisplay =
			<span className={style['unit-entry-button-label-greyed-out']}>
				{props.unit.display_name}
			</span>
	}

	return (
		<div className={style['unit-entry-button']}>
			<div className={style['unit-entry-button-row']}>
				<div className={style['unit-entry-button-point-value-div']}>
					{extraSpace}
					{pointDisplay}
					<span>{' '}</span>
				</div>
				<div className={style['unit-entry-button-label-div']}>
					{unitNameDisplay}
				</div>
			</div>	
		</div>
	)
}

export default UnitEntryButton