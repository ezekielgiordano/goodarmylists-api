import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const AuxiliarySelectionLabel = props => {
	let extraSpace
	if (parseInt(props.auxiliary.points) < 10) {
		extraSpace = <span className={style['hidden']}>{'_'}</span>
	}

	let className
	let highlightingAction
	if (props.auxiliary.special_rules.includes('not independent')) {
		if (props.highlighted === true) {
			className = style['unit-option-selection-label-highlighted-unit-option']
			if (props.unitObject.count > (props.duplicateAuxiliaryCount)) {
				highlightingAction = 'add'				
			} else {
				highlightingAction = 'remove'
			}
		}
		if (props.highlighted === false) {
			className = style['unit-option-selection-label']
			highlightingAction = 'add'
		}
	} else {
		if (props.highlighted === true) {
			className = style['unit-option-selection-label-highlighted-unit-option']
			highlightingAction = 'remove'
		}
		if (props.highlighted === false) {
			className = style['unit-option-selection-label']
			highlightingAction = 'add'
		}
	}

	let pointDisplay
	if (props.duplicateAuxiliaryCount >= 2) {
		pointDisplay = props.auxiliary.points * props.duplicateAuxiliaryCount
	} else {
		pointDisplay = props.auxiliary.points
	}

	let countDisplay
	if (props.duplicateAuxiliaryCount > 0 && props.auxiliary.special_rules.includes('not independent')) {
		countDisplay = `${props.duplicateAuxiliaryCount}x `
	}

	return (
		<div className={style['unit-option-selection-tile-row']} id={parseInt(props.auxiliary.id)}>
			<div className={style['unit-option-label-div']}>
				{extraSpace}
				<span className={style['auxiliary-points-label-wmr']}>{pointDisplay}</span>
			</div>
			<div className={style['unit-option-label-div']}>
				<span
					onClick={() => props.updateHighlightedAuxiliaries(
						props.auxiliary,
						highlightingAction
					)}				
					className={className}
					id={parseInt(props.auxiliary.id)}
				>
					{countDisplay}{props.auxiliary.display_name}
				</span>
			</div>
		</div>
	)
}

export default AuxiliarySelectionLabel