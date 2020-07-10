import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const UnitEntryNameTileFormatted = props => {
	let nonSpells = []
	let spells = []
	let pointsForEntry = parseInt(props.unitObject.unit.points)
	let i
	for (i = 0; i < props.selectedUnitOptions.length; i++) {
		if (
			(
				props.selectedUnitOptions[i].unitOption.is_spell === false ||
				props.selectedUnitOptions[i].unitOption.is_spell === 'f'
			) &&
			props.selectedUnitOptions[i].index === props.unitObject.index
		) {
			nonSpells.push(props.selectedUnitOptions[i])
			pointsForEntry += parseInt(props.selectedUnitOptions[i].unitOption.points)
		}
		if (
			(
				props.selectedUnitOptions[i].unitOption.is_spell === true ||
				props.selectedUnitOptions[i].unitOption.is_spell === 't'
			) &&
			props.selectedUnitOptions[i].index === props.unitObject.index
		) {
			spells.push(props.selectedUnitOptions[i])
			pointsForEntry += parseInt(props.selectedUnitOptions[i].unitOption.points)
		}	
	}
	let artifact
	let artifactDisplay
	if (props.selectedArtifacts !== undefined) {
		for (i = 0; i < props.selectedArtifacts.length; i++) {
			if (props.selectedArtifacts[i].index === props.unitObject.index) {
				artifact = props.selectedArtifacts[i].artifact
				pointsForEntry += parseInt(props.selectedArtifacts[i].artifact.points)
			}
		}
		if (artifact !== undefined && artifact !== null) {
			artifactDisplay =
				<div>
					--{' '}<i>{artifact.display_name}</i>
				</div>
		}
	}

	let nonSpellDisplay
	if (nonSpells.length > 0) {
		nonSpellDisplay = nonSpells.map(unitOptionObject => {
			return (
				<div key={unitOptionObject.index + parseInt(unitOptionObject.unitOption.id) + 70000}>
					--{' '}<i>{unitOptionObject.unitOption.display_name}</i>
				</div>
			)
		})
	}

	let spellDisplay
	if (spells.length > 0) {
		spellDisplay = spells.map(unitOptionObject => {
			return (
				<div key={unitOptionObject.index + parseInt(unitOptionObject.unitOption.id) + 100000}>
					--{' '}<i>{unitOptionObject.unitOption.display_name}</i>	
				</div>
			)
		})
	}

	return (
		<div className={style['formatted-list-entry']}>
			<div>{pointsForEntry},{' '}{props.unitObject.unit.display_name}</div>
			{artifactDisplay}
			{nonSpellDisplay}
			{spellDisplay}
		</div>
	)
}

export default UnitEntryNameTileFormatted