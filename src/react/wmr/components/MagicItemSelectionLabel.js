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
	if (props.highlighted === true) {
		className = style['unit-option-selection-label-highlighted-unit-option']
	} else {
		className = style['unit-option-selection-label']
	}

	let countDisplay
	if (props.count > 0) {
		countDisplay = `${props.count}x `
	}

	return (
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
	)
}

export default MagicItemSelectionLabel