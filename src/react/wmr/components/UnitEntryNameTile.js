import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const UnitEntryNameTile = props => {
	let allSelectedMagicItems = props.selectedMagicItems.sort((a, b) => {
		return (parseInt(a.points) - parseInt(b.points))
	})
	let magicWeapons = []
	let magicStandards = []
	let devicesOfPower = []
	let i
	for (i = 0; i < allSelectedMagicItems.length; i++) {
		if (allSelectedMagicItems[i].magicItem.magic_item_type === 'Magic Weapon') {
			magicWeapons.push(allSelectedMagicItems[i])
		}
		if (allSelectedMagicItems[i].magicItem.magic_item_type === 'Magic Standard') {
			magicStandards.push(allSelectedMagicItems[i])
		}
		if (allSelectedMagicItems[i].magicItem.magic_item_type === 'Device of Power') {
			devicesOfPower.push(allSelectedMagicItems[i])
		}
	}

	let magicWeaponText
	let magicStandardText
	let deviceOfPowerText
	if (magicWeapons.length > 0) {
		magicWeaponText = magicWeapons.map((magicItemObject, index) => {
			return (
				<div key={index + 15000} >
					<span						
						className={style['unit-option-entry-label']}
						onClick={() => props.removeMagicItem(magicItemObject)}
					>
						{' -- '}{magicItemObject.magicItem.display_name}
					</span>
				</div>

			)
		})
	}
	if (magicStandards.length > 0) {
		magicStandardText = magicStandards.map((magicItemObject, index) => {
			return (
				<div key={index + 15000} >
					<span						
						className={style['unit-option-entry-label']}
						onClick={() => props.removeMagicItem(magicItemObject)}
					>
						{' -- '}{magicItemObject.magicItem.display_name}
					</span>
				</div>

			)
		})
	}
	if (devicesOfPower.length > 0) {
		deviceOfPowerText = devicesOfPower.map((magicItemObject, index) => {
			return (
				<div key={index + 15000} >
					<span						
						className={style['unit-option-entry-label']}
						onClick={() => props.removeMagicItem(magicItemObject)}
					>
						{' -- '}{magicItemObject.magicItem.display_name}
					</span>
				</div>

			)
		})
	}

	return (
		<div className={style['list-entry-div']}>
			<div>
				<span 
					onClick={() => props.removeUnitFromList(props.unitObject)}
					className={style['list-entry-label']}
				>
					{props.unitObject.unit.display_name}
				</span>
			</div>
				{magicWeaponText}
				{magicStandardText}
				{deviceOfPowerText}
		</div>
	)
}

export default UnitEntryNameTile