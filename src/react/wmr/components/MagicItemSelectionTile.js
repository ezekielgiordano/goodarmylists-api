import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'
import MagicItemSelectionLabel from './MagicItemSelectionLabel'

const MagicItemSelectionTile = props => {
	let magicItems = props.magicItems
	let availableMagicItems = []
	let i2

	let sortedMagicItems = availableMagicItems.sort((a, b) => {
		return ( parseInt(a.id) - parseInt(b.id) )
	})

	let selectedMagicItemPoints = 0
	for (i2 = 0; i2 < props.selectedMagicItems.length; i2++) {
		if (props.selectedMagicItems[i2].index === props.unitObject.index) {
			selectedMagicItemPoints += parseInt(props.selectedMagicItems[i2].magicItem.points)
		}
	}

	let magicItemDisplay = sortedMagicItems.map(magicItem => {
		let greyedOut = false

		return (
			<MagicItemSelectionLabel
				key={parseInt(magicItem.id)}
				unitObject={props.unitObject}
				magicItem={magicItem}
				selectMagicItem={props.addMagicItem}
				greyedOut={greyedOut}
			/>
		)
	})

	return (
		<div>
			<h4 className={style['magic-item-title-wmr']}>
				What Magic Item will<br />
				{props.unitObject.unit.display_name} have?
			</h4><br />
			<div>
				<span 
					onClick={props.toggleMagicItems}
					className={style['clear-or-cancel-label']}
				>
					Cancel
				</span>
			</div><br />
			<div className={style['artifact-selections']}>{magicItemDisplay}</div>
		</div>
	)
}

export default MagicItemSelectionTile