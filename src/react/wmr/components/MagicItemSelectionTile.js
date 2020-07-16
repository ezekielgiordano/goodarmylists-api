import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'
import MagicItemSelectionLabel from './MagicItemSelectionLabel'

const MagicItemSelectionTile = props => {
	let magicStandards = []
	let magicWeapons = []
	let devicesOfPower = []
	let i2

	let sortedMagicItems = props.magicItems.sort((a, b) => {
		return ( parseInt(a.id) - parseInt(b.id) )
	})

	for (i2 = 0; i2 < sortedMagicItems.length; i2++) {
		if (sortedMagicItems[i2].magic_item_type === 'Magic Standard') {
			magicStandards.push(sortedMagicItems[i2])
		}
		if (sortedMagicItems[i2].magic_item_type === 'Magic Weapon') {
			magicWeapons.push(sortedMagicItems[i2])
		}
		if (sortedMagicItems[i2].magic_item_type === 'Device of Power') {
			devicesOfPower.push(sortedMagicItems[i2])
		}
	}

	let magicStandardDisplay = magicStandards.map(magicItem => {
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
	let magicWeaponDisplay = magicWeapons.map(magicItem => {
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
	let deviceOfPowerDisplay = devicesOfPower.map(magicItem => {
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
				What Magic Item will be given to {props.unitObject.unit.option_screen_name}?
			</h4><br />
			<div>
				<span 
					onClick={props.toggleMagicItems}
					className={style['clear-or-cancel-label']}
				>
					Cancel
				</span>
			</div><br />
			<div className={style['artifact-selections']}>
				{magicStandardDisplay}<br />
				{magicWeaponDisplay}<br />
				{deviceOfPowerDisplay}
			</div>
		</div>
	)
}

export default MagicItemSelectionTile