import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'
import MagicItemSelectionLabel from './MagicItemSelectionLabel'

const MagicItemSelectionTile = props => {
	let magicItems = props.magicItems
	let availableMagicItems = []
	let i





	

	let sortedMagicItems = availableMagicItems.sort((a, b) => {
		return ( parseInt(a.points) - parseInt(b.points) )
	})

	let selectedMagicItemPoints = 0
	for (i = 0; i < props.selectedMagicItems.length; i++) {
		if (props.selectedMagicItems[i].index === props.unitObject.index) {
			selectedMagicItemPoints += parseInt(props.selectedMagicItems[i].magicItem.points)
		}
	}

	let magicItemDisplay = sortedMagicItems.map(magicItem => {
		let greyedOut = false

		return (
			<MagicItemSelectionLabel
				key={parseInt(magicItem.id)}
				unitObject={props.unitObject}
				magicItem={magicItem}
				selectMagicItem={props.selectMagicItem}
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