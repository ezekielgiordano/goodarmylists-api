import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const ArtifactSelectionLabel = props => {
	let extraSpace
	if (parseInt(props.artifact.points) < 10) {
		extraSpace = <span className={style['hidden']}>{'_'}</span>
	}

	let display
	if (props.greyedOut === false) {
		display =
			<div className={style['unit-option-selection-tile-row']}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span className={style['unit-option-points-label-kow']}>{parseInt(props.artifact.points)}</span>
				</div>
				<div className={style['unit-option-label-div']}>
					<span
						onClick={() => props.selectArtifact(props.unitObject, props.artifact)}
						className={style['unit-option-selection-label']}
					>
						{props.artifact.display_name}
					</span>
				</div>
			</div>
	} else {
		display =
			<div className={style['unit-option-selection-tile-row-greyed-out']}>
				<div className={style['unit-option-label-div']}>
					{extraSpace}
					<span>{parseInt(props.artifact.points)}</span>
				</div>
				<div className={style['unit-option-label-div']}>
					<span>
						{props.artifact.display_name}
					</span>
				</div>
			</div>	
	}

	return (
		<div>{display}</div>
	)
}

export default ArtifactSelectionLabel