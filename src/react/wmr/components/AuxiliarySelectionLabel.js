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
	if (props.highlighted === true) {
		className = style['unit-option-selection-label-highlighted-unit-option']
	} else {
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

	return (
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
	)
}

export default AuxiliarySelectionLabel