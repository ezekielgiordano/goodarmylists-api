import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const AuxiliarySelectionLabel = props => {
	let extraSpace
	if (parseInt(props.auxiliary.points) < 10) {
		extraSpace = <span className={style['hidden']}>{'__'}</span>
	}
	if (parseInt(props.auxiliary.points) >= 10 && parseInt(props.auxiliary.points) < 100) {
		extraSpace = <span className={style['hidden']}>{'_'}</span>
	}

	let className
	if (props.highlighted === true && props.greyedOut === true) {
		className = style['highlighted-unit-option']
	}
	if (props.highlighted === true && props.greyedOut === false) {
		className = style['unit-option-selection-label-highlighted-unit-option']
	}
	if (props.highlighted === false && props.greyedOut === true) {
		className = style['nothing-class']
	}
	if (props.highlighted === false && props.greyedOut === false) {
		className = style['unit-option-selection-label']
	}

	let pointDisplay
	if (props.count >= 2) {
		pointDisplay = props.auxiliary.points * props.count
	} else {
		pointDisplay = props.auxiliary.points
	}

	let countDisplay
	if (props.count > 0) {
		countDisplay = `${props.count}x `
	}

	let display
	if (props.greyedOut === false) {
		display =
			<div className={style['unit-option-selection-tile-row']} id={parseInt(props.auxiliary.id)}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span className={style['auxiliary-points-label-wmr']}>{pointDisplay}</span>
				</div>
				<div className={style['unit-option-label-div']}>
					<span
						onClick={() => props.updateHighlightedAuxiliaries(props.auxiliary)}		
						className={className}
						id={parseInt(props.auxiliary.id)}
					>
						{countDisplay}{props.auxiliary.display_name}
					</span>
				</div>
			</div>
	} else {
		display =
			<div  className={style['unit-option-selection-tile-row-greyed-out']} id={parseInt(props.auxiliary.id)}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span className={style['unit-option-points-label-greyed-out']}>{
						parseInt(props.auxiliary.points)}
					</span>
				</div>
				<div className={style['unit-option-label-div']}>
					<span className={className}>{props.auxiliary.display_name}</span>
				</div>
			</div>		
	}

	return (
		<div>{display}</div>
	)
}

export default AuxiliarySelectionLabel