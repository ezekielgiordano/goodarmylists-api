import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const UnitEntryNameTile = props => {
	let selectedAuxiliaries = []
	let i2
	for (i2 = 0; i2 < props.selectedAuxiliaries.length; i2++) {
		if (props.selectedAuxiliaries[i2].unitName === props.unitObject.unit.name) {
			selectedAuxiliaries.push(props.selectedAuxiliaries[i2])
		}
	}

	let auxiliaryText
	if (selectedAuxiliaries.length > 0) {
		auxiliaryText = selectedAuxiliaries.map((auxiliaryObject, index) => {
			return (
				<div key={index + 15000} >
					<span						
						className={style['auxiliary-entry-label-wmr']}
						onClick={() => props.removeAuxiliary(auxiliaryObject)}
					>
						{'('}{auxiliaryObject.count}{'x '}{auxiliaryObject.auxiliary.display_name}{')'}
					</span>
				</div>				
			)
		})
	}	

	let allSelectedMagicItems = props.selectedMagicItems.sort((a, b) => {
		return (parseInt(a.id) - parseInt(b.id))
	})
	let magicWeapons = []
	let magicStandards = []
	let devicesOfPower = []
	for (i2 = 0; i2 < allSelectedMagicItems.length; i2++) {
		if (allSelectedMagicItems[i2].magicItem.magic_item_type === 'Magic Weapon') {
			magicWeapons.push(allSelectedMagicItems[i2])
		}
		if (allSelectedMagicItems[i2].magicItem.magic_item_type === 'Magic Standard') {
			magicStandards.push(allSelectedMagicItems[i2])
		}
		if (allSelectedMagicItems[i2].magicItem.magic_item_type === 'Device of Power') {
			devicesOfPower.push(allSelectedMagicItems[i2])
		}
	}

	let magicWeaponText
	let magicStandardText
	let deviceOfPowerText
	if (magicWeapons.length > 0) {
		magicWeaponText = magicWeapons.map((magicItemObject, index) => {
			return (
				<div key={index + 615000} >
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
				<div key={index + 625000} >
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
				<div key={index + 635000} >
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
					onClick={() => props.removeUnit(props.unitObject)}
					className={style['list-entry-label-wmr']}
				>
					{props.unitObject.count}{'x '}{props.unitObject.unit.display_name}
				</span>
			</div>
				{magicWeaponText}
				{magicStandardText}
				{deviceOfPowerText}
				{auxiliaryText}
		</div>
	)
}

export default UnitEntryNameTile