import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const AuxiliarySelectionLabel = props => {
	let extraSpace
	if (parseInt(props.auxiliary.points) < 10) {
		extraSpace = <span className={style['hidden']}>{'_'}</span>
	}

	let className
	let highlightingAction
	if (props.highlighted === true && props.greyedOut === true) {
		className = style['highlighted-unit-option']
		highlightingAction = 'none'
	}
	if (props.highlighted === true && props.greyedOut === false) {
		className = style['unit-option-selection-label-highlighted-unit-option']
		highlightingAction = 'remove'
	}
	if (props.highlighted === false && props.greyedOut === true) {
		className = style['nothing-class']
		highlightingAction = 'none'
	}
	if (props.highlighted === false && props.greyedOut === false) {
		className = style['unit-option-selection-label']
		highlightingAction = 'add'
	}

	let display
	if (props.greyedOut === false) {
		display =				
			<div className={style['unit-option-selection-tile-row']} id={parseInt(props.auxiliary.id)}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span className={style['unit-option-points-label-kow']}>{parseInt(props.auxiliary.points)}</span>
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
						{props.auxiliary.display_name}
					</span>
				</div>
			</div>
				
			
	} else {
		display =
			<div  className={style['unit-option-selection-tile-row-greyed-out']} id={parseInt(props.auxiliary.id)}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span>{parseInt(props.auxiliary.points)}</span>
				</div>
				<div className={style['unit-option-label-div']}>
					<span className={className}>{props.auxiliary.display_name}</span>
				</div>
			</div>
	}

	return (
		<div>
			{display}
		</div>		
	)
}

export default AuxiliarySelectionLabel