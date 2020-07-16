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

	let display
	if (props.greyedOut === false) {
		display =
			<div className={style['unit-option-selection-tile-row']}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span className={style['magic-item-points-label-wmr']}>{parseInt(props.magicItem.points)}</span>
				</div>
				<div className={style['unit-option-label-div']}>
					<span
						onClick={() => props.selectMagicItem(props.unitObject, props.magicItem)}
						className={style['unit-option-selection-label']}
					>
						{props.magicItem.display_name}
					</span>
				</div>
			</div>
	} else {
		display =
			<div className={style['unit-option-selection-tile-row-greyed-out']}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span>{parseInt(props.magicItem.points)}</span>
				</div>
				<div className={style['unit-option-label-div']}>
					<span>
						{props.magicItem.display_name}
					</span>
				</div>
			</div>	
	}

	return (
		<div>{display}</div>
	)
}

export default MagicItemSelectionLabel