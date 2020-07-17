import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const UnitEntryNameTileFormatted = props => {
	let unitObject = props.unitObject
	let unitAuxiliaries = []
	let unitMagicItems = []
	let pointsForEntry = parseInt(unitObject.unit.points) * unitObject.count
	let i2

	for (i2 = 0; i2 < props.selectedAuxiliaries.length; i2++) {
		if (props.selectedAuxiliaries[i2].unitName === unitObject.unit.name) {
			unitAuxiliaries.push(props.selectedAuxiliaries[i2])
			pointsForEntry += parseInt(props.selectedAuxiliaries[i2].auxiliary.points) * props.selectedAuxiliaries[i2].count
		}
	}
	for (i2 = 0; i2 < props.selectedMagicItems.length; i2++) {
		if (props.selectedMagicItems[i2].unitName === unitObject.unit.name) {
			unitMagicItems.push(props.selectedMagicItems[i2])
			pointsForEntry += parseInt(props.selectedMagicItems[i2].magicItem.points) * props.selectedMagicItems[i2].count
		}
	}

	let auxiliaryDisplay
	if (unitAuxiliaries.length > 0) {
		auxiliaryDisplay = unitAuxiliaries.map(auxiliaryObject => {
			return (
				<div key={parseInt(auxiliaryObject.auxiliary.id) + 1500000}>
					{' -- '}<i>{auxiliaryObject.auxiliary.display_name}{' ('}{auxiliaryObject.count}{')'}</i>
				</div>
			)
		})
	}

	let magicItemDisplay
	if (unitMagicItems.length > 0) {
		magicItemDisplay = unitMagicItems.map(magicItemObject => {
			return (
				<div key={parseInt(magicItemObject.magicItem.id) + 3500000}>
					{' -- '}<i>{magicItemObject.magicItem.display_name}</i>
				</div>
			)
		})
	}

	return (
		<div className={style['formatted-list-entry']}>
			<div>{pointsForEntry}{', '}{unitObject.unit.list_name}{' ('}{unitObject.count}{')'}</div>
			{magicItemDisplay}
			{auxiliaryDisplay}
		</div>
	)
}

export default UnitEntryNameTileFormatted