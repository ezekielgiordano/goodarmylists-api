import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'
import ArtifactSelectionLabel from './ArtifactSelectionLabel'

const ArtifactSelectionTile = props => {
	let artifacts = props.artifacts
	let availableArtifacts = []
	let i
	
	if (
		props.unitObject.unit.unit_size === 'Horde' ||
		props.unitObject.unit.unit_size === 'Legion'
	) {
		for (i = 0; i < artifacts.length; i++) {
			if (
				(artifacts[i].is_heroic === false || artifacts[i].is_heroic === 'f') &&
				artifacts[i].name !== 'Blessing of the Gods' &&
				artifacts[i].name !== 'Chant of Hate' &&
				artifacts[i].name !== 'Brew of Strength' &&
				artifacts[i].name !== 'Brew of Sharpness'

			) {
				availableArtifacts.push(artifacts[i])
			}
		}
	}

	if (
		props.unitObject.unit.unit_size !== 'Horde' &&
		props.unitObject.unit.unit_size !== 'Legion' &&
		props.unitObject.unit.unit_type.includes('Hero') === false
	) {
		for (i = 0; i < artifacts.length; i++) {
			if (
				(artifacts[i].is_heroic === false || artifacts[i].is_heroic === 'f') &&
				artifacts[i].name !== 'Blessing of the Gods (Horde)' &&
				artifacts[i].name !== 'Chant of Hate (Horde)' &&
				artifacts[i].name !== 'Brew of Strength (Horde)' &&
				artifacts[i].name !== 'Brew of Sharpness (Horde)'

			) {
				availableArtifacts.push(artifacts[i])
			}
		}
	}

	if (props.unitObject.unit.unit_type.includes('Hero')) {
		if (
			props.unitObject.unit.unit_type === 'Hero (Infantry)' ||
			props.unitObject.unit.unit_type === 'Hero (Heavy Infantry)' ||
			props.unitObject.unit.unit_type === 'Hero (Cavalry)'
		) {
			for (i = 0; i < artifacts.length; i++) {
				if (
					artifacts[i].name !== 'Blessing of the Gods (Horde)' &&
					artifacts[i].name !== 'Chant of Hate (Horde)' &&
					artifacts[i].name !== 'Brew of Strength (Horde)' &&
					artifacts[i].name !== 'Brew of Sharpness (Horde)'
				) {
					availableArtifacts.push(artifacts[i])
				}
			}
		} else {
			for (i = 0; i < artifacts.length; i++) {
				if (
					artifacts[i].name !== 'Blessing of the Gods (Horde)' &&
					artifacts[i].name !== 'Chant of Hate (Horde)' &&
					artifacts[i].name !== 'Brew of Strength (Horde)' &&
					artifacts[i].name !== 'Brew of Sharpness (Horde)' &&
					artifacts[i].name !== 'Darklord\'s Onyx Ring' &&
					artifacts[i].name !== 'Mournful Blade' &&
					artifacts[i].name !== 'Boots of the Seven Leagues' &&
					artifacts[i].name !== 'Wings of Honeymaze'
				) {
					availableArtifacts.push(artifacts[i])
				}
			}			
		}
	}

	let sortedArtifacts = availableArtifacts.sort((a, b) => {
		return ( parseInt(a.points) - parseInt(b.points) )
	})

	let selectedArtifactPoints = 0
	for (i = 0; i < props.selectedArtifacts.length; i++) {
		if (props.selectedArtifacts[i].index === props.unitObject.index) {
			selectedArtifactPoints += parseInt(props.selectedArtifacts[i].artifact.points)
		}
	}

	let artifactDisplay = sortedArtifacts.map(artifact => {
		let greyedOut = false
		if (
			(
				(props.pointTotal + props.alliedPointTotal + parseInt(artifact.points) - selectedArtifactPoints) / 4 <
				props.alliedPointTotal
			) && (
				props.alliedPointTotal > 0
			)
		) {
			greyedOut = true
		}
		return (
			<ArtifactSelectionLabel
				key={parseInt(artifact.id)}
				unitObject={props.unitObject}
				artifact={artifact}
				selectArtifact={props.selectArtifact}
				greyedOut={greyedOut}
			/>
		)
	})

	return (
		<div>
			<h4 className={style['artifact-title-kow']}>
				What Magical Artifact will<br />
				{props.unitObject.unit.display_name} have?
			</h4><br />
			<div>
				<span 
					onClick={props.toggleArtifacts}
					className={style['clear-or-cancel-label']}
				>
					Cancel
				</span>
			</div><br />
			<div className={style['artifact-selections']}>{artifactDisplay}</div>
		</div>
	)
}

export default ArtifactSelectionTile