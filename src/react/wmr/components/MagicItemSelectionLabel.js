import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const MagicItemSelectionLabel = props => {
	let extraSpace
	if (parseInt(props.magicItem.points) < 10) {
		extraSpace = <span className={style['hidden']}>{'__'}</span>
	}
	if (parseInt(props.magicItem.points) >= 10 && parseInt(props.magicItem.points) < 100) {
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

	let countDisplay
	if (props.count > 0) {
		countDisplay = `${props.count}x `
	}

	let display
	if (props.greyedOut === false) {
		display =
			<div className={style['unit-option-selection-tile-row']} id={parseInt(props.magicItem.id)}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span className={style['magic-item-points-label-wmr']}>{props.magicItem.points}</span>
				</div>
				<div className={style['unit-option-label-div']}>
					<span
						onClick={() => props.updateHighlightedMagicItems(props.magicItem)}				
						className={className}
						id={parseInt(props.magicItem.id)}
					>
						{countDisplay}{props.magicItem.display_name}
					</span>
				</div>
			</div>
	} else {
		display =
			<div  className={style['unit-option-selection-tile-row-greyed-out']} id={parseInt(props.magicItem.id)}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span className={style['unit-option-points-label-greyed-out']}>{
						parseInt(props.magicItem.points)}
					</span>
				</div>
				<div className={style['unit-option-label-div']}>
					<span className={className}>{props.magicItem.display_name}</span>
				</div>
			</div>	
	}

	return (
		<div>{display}</div>
	)
}

export default MagicItemSelectionLabel