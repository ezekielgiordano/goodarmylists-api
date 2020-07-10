import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const UnitEntryNameTile = props => {
	let allSelectedUnitOptions = props.selectedUnitOptions.sort((a, b) => {
		return (parseInt(a.points) - parseInt(b.points))
	})
	let nonSpells = []
	let spells = []
	let i
	for (i = 0; i < allSelectedUnitOptions.length; i++) {
		if (allSelectedUnitOptions[i].index === props.unitObject.index) {
			if (allSelectedUnitOptions[i].unitOption.is_spell === true) {
				spells.push(allSelectedUnitOptions[i])
			} else {
				nonSpells.push(allSelectedUnitOptions[i])
			}
		}
	}
	let nonSpellText
	let spellText
	if (nonSpells.length > 0) {
		nonSpellText = nonSpells.map((unitOptionObject, index) => {
			return (
				<div key={index + 15000} >
					<span						
						className={style['unit-option-entry-label']}
						onClick={() => props.removeUnitOption(unitOptionObject, props.alliedArmy)}
					>
						{' -- '}{unitOptionObject.unitOption.display_name}
					</span>
				</div>

			)
		})
	}
	if (spells.length > 0) {
		spellText = spells.map((unitOptionObject, index) => {
			return (
				<div key={index + 30000} >
					<span						
						className={style['unit-option-entry-label']}
						onClick={() => props.removeUnitOption(unitOptionObject, props.alliedArmy)}
					>
						{' -- '}{unitOptionObject.unitOption.display_name}
					</span>
				</div>

			)
		})
	}

	let artifactText
	if (props.selectedArtifacts) {
		let allSelectedArtifacts = props.selectedArtifacts
		let selectedArtifactArray = []
		for (i = 0; i < allSelectedArtifacts.length; i++) {
			if (allSelectedArtifacts[i].index === props.unitObject.index) {
				selectedArtifactArray.push(allSelectedArtifacts[i])
			}
		}
		if (selectedArtifactArray.length > 0) {
			artifactText =
				<div>
					<span
						onClick={() => props.removeArtifact(selectedArtifactArray[0], props.alliedArmy)}
						className={style['unit-option-entry-label']}
					>
						{' -- '}{selectedArtifactArray[selectedArtifactArray.length - 1].artifact.display_name}
					</span>
				</div>
		}
	}

	return (
		<div className={style['list-entry-div']}>
			<div>
				<span 
					onClick={() => props.removeUnitFromList(
						props.unitObject,
						props.alliedArmy			
					)}
					className={style['list-entry-label-kow']}
				>
					{props.unitObject.unit.display_name}
				</span>
			</div>
				{artifactText}
				{nonSpellText}
				{spellText}
		</div>
	)
}

export default UnitEntryNameTile