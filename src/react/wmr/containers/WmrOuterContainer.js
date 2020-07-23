import style from '../../../assets/stylesheets/index.module.css'
import React, { Component } from 'react'
import WmrInnerContainer from './WmrInnerContainer'

class WmrOuterContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			armies: [],
			units: [],
			specialRules: [],
			auxiliaries: [],
			magicItems: []
		}
		this.calculatePointTotal = this.calculatePointTotal.bind(this)
		this.calculateUnitCount = this.calculateUnitCount.bind(this)
		this.calculateBreakPoint = this.calculateBreakPoint.bind(this)
		this.calculateCoreUnitCounts = this.calculateCoreUnitCounts.bind(this)
		this.determineIfValidAfterGameSizeChange = this.determineIfValidAfterGameSizeChange.bind(this)
	}

	componentDidMount() {
		fetch('/api/v1/wmr_armies')
		.then(response => {
			if (response.ok) {
				return response
			} else {
				let errorMessage = `${response.status} (${response.statusText})`,
				error = new Error(errorMessage)
				throw(error)
			}
		})
		.then(response => response.json())
		.then(body => {
			this.setState({ armies: body })
		})
		.catch(error => console.error(`Error in fetch: ${error.message}`))

		fetch('/api/v1/wmr_units')
		.then(response => {
			if (response.ok) {
				return response
			} else {
				let errorMessage = `${response.status} (${response.statusText})`,
				error = new Error(errorMessage)
				throw(error)
			}
		})
		.then(response => response.json())
		.then(body => {
			this.setState({ units: body })
		})
		.catch(error => console.error(`Error in fetch: ${error.message}`))

		fetch('/api/v1/wmr_special_rules')
		.then(response => {
			if (response.ok) {
				return response
			} else {
				let errorMessage = `${response.status} (${response.statusText})`,
				error = new Error(errorMessage)
				throw(error)
			}
		})
		.then(response => response.json())
		.then(body => {
			this.setState({ specialRules: body })
		})
		.catch(error => console.error(`Error in fetch: ${error.message}`))

		fetch('/api/v1/wmr_auxiliaries')
		.then(response => {
			if (response.ok) {
				return response
			} else {
				let errorMessage = `${response.status} (${response.statusText})`,
				error = new Error(errorMessage)
				throw(error)
			}
		})
		.then(response => response.json())
		.then(body => {
			this.setState({ auxiliaries: body })
		})
		.catch(error => console.error(`Error in fetch: ${error.message}`))
	
		fetch('/api/v1/wmr_magic_items')
		.then(response => {
			if (response.ok) {
				return response
			} else {
				let errorMessage = `${response.status} (${response.statusText})`,
				error = new Error(errorMessage)
				throw(error)
			}
		})
		.then(response => response.json())
		.then(body => {
			this.setState({ magicItems: body })
		})
		.catch(error => console.error(`Error in fetch: ${error.message}`))
	}

	calculatePointTotal(unitArray, auxiliaryArray, magicItemArray) {
		let pointTotal = 0
		let i2
		if (unitArray) {
			for (i2 = 0; i2 < unitArray.length; i2++) {
				pointTotal += (parseInt(unitArray[i2].unit.points) * parseInt(unitArray[i2].count))
			}
			for (i2 = 0; i2 < auxiliaryArray.length; i2++) {
				pointTotal += parseInt(auxiliaryArray[i2].auxiliary.points) * auxiliaryArray[i2].count
			}			
			for (i2 = 0; i2 < magicItemArray.length; i2++) {
				pointTotal += parseInt(magicItemArray[i2].magicItem.points)
			}
		}
		return pointTotal
	}

	calculateUnitCount(unitArray) {
		let unitCount = 0
		let i2
		if (unitArray) {
			for (i2 = 0; i2 < unitArray.length; i2++) {
				if (
					unitArray[i2].unit.unit_type !== 'General' &&
					unitArray[i2].unit.unit_type !== 'Hero' &&
					unitArray[i2].unit.unit_type !== 'Wizard'
				) {
					unitCount += unitArray[i2].count
				}
			}
		}
		return unitCount
	}

	calculateBreakPoint(unitArray) {
		let breakPointUnits = 0
		let i2
		if (unitArray) {
			for (i2 = 0; i2 < unitArray.length; i2++) {
				if (unitArray[0].unit.name.includes('Bretonnia') === false) {
					if (
						unitArray[i2].unit.unit_type !== 'General' &&
						unitArray[i2].unit.unit_type !== 'Hero' &&
						unitArray[i2].unit.unit_type !== 'Wizard' &&
						unitArray[i2].unit.name.includes('Pump Wagon') === false
					) {
						breakPointUnits += unitArray[i2].count
					}
				} else {
					if (
						unitArray[i2].unit.name === 'Knights (Bretonnia)' ||
						unitArray[i2].unit.name === 'Grail Knights (Bretonnia)' ||
						unitArray[i2].unit.name === 'Pegasus Knights (Bretonnia)'
					) {
						breakPointUnits += unitArray[i2].count
					}
				}
			}
		}
		let breakPoint = Math.ceil(breakPointUnits / 2)
		return breakPoint
	}

	calculateCoreUnitCounts(unitArray, selectedArmyName, maximumCount) {
		let empireHalberdierCount = 0
		let empireCrossbowmanCount = 0
		let empireHandgunnerCount = 0
		let handgunnerOrMax = 0
		let handgunnerOrMaxOrZero = 0		
		let tombKingSkeletonCount = 0
		let skeletonBowmanCount = 0
		let chaosWarriorCount = 0
		let chaosMarauderCount = 0
		let orcWarriorCount = 0
		let orcGoblinCount = 0
		let highElfSpearmanCount = 0
		let highElfArcherCount = 0
		let dwarfWarriorCount = 0
		let clanratCount = 0
		let ratSwarmCount = 0
		let skinkCount = 0
		let saurusCount = 0
		let manAtArmsCount = 0
		let squireCount = 0
		let bretonnianKnightCount = 0
		let kislevHorseArcherCount = 0
		let kislevAxemanCount = 0
		let darkElfSpearmanCount = 0
		let darkElfCrossbowmanCount = 0
		let demonHordeCount = 0
		let arabySpearmanCount = 0
		let arabyBowmanCount = 0
		let vampireCountSkeletonCount = 0
		let zombieCount = 0
		let pikemanCount = 0
		let dogsOfWarCrossbowmanCount = 0
		let bullOgreCount = 0
		let albionWarriorCount = 0
		let slingerCount = 0
		let goblinGoblinCount = 0
		let wolfRiderCount = 0
		let zealotCount = 0
		let chaosDwarfCount = 0				
		let gladeGuardCount = 0
		let dryadCount = 0
		let beastherdCount = 0
		let herdkinCount = 0
		let bondsmanCount = 0
		let huscarlCount = 0

		let coreUnitCounts = {}
		let i2

		if (unitArray) {
			for (i2 = 0; i2 < unitArray.length; i2++) {
				if (selectedArmyName === 'The Empire') {
					if (unitArray[i2].unit.name === 'Halberdiers (The Empire)') {
						empireHalberdierCount += unitArray[i2].count
					}
					if (unitArray[i2].unit.name === 'Crossbowmen (The Empire)') {
						empireCrossbowmanCount += unitArray[i2].count
					}		
					if (unitArray[i2].unit.name === 'Handgunners (The Empire)') {
						empireHandgunnerCount += unitArray[i2].count
					}
					if (empireHandgunnerCount > maximumCount) {
						handgunnerOrMax = maximumCount
					} else {
						handgunnerOrMax = empireHandgunnerCount
					}
					if (empireHandgunnerCount === 0) {
						handgunnerOrMaxOrZero = 0
					} else {
						handgunnerOrMaxOrZero = handgunnerOrMax
					}
					coreUnitCounts = {
						empireHalberdierCount: empireHalberdierCount,
						empireCrossbowmanCount: empireCrossbowmanCount,
						empireHandgunnerCount: empireHandgunnerCount,
						handgunnerOrMax: handgunnerOrMax,
						handgunnerOrMaxOrZero: handgunnerOrMaxOrZero
					}
				}
				if (selectedArmyName === 'Tomb Kings') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Skeletons (Tomb Kings)') {
							tombKingSkeletonCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Skeleton Bowmen (Tomb Kings)') {
							skeletonBowmanCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						tombKingSkeletonCount: tombKingSkeletonCount,
						skeletonBowmanCount: skeletonBowmanCount
					}
				}
				if (selectedArmyName === 'Chaos') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Chaos Warriors (Chaos)') {
							chaosWarriorCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Chaos Marauders (Chaos)') {
							chaosMarauderCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						chaosWarriorCount: chaosWarriorCount,
						chaosMarauderCount: chaosMarauderCount
					}
				}
				if (selectedArmyName === 'Orcs') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Orc Warriors (Orcs)') {
							orcWarriorCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Goblins (Orcs)') {
							orcGoblinCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						orcWarriorCount: orcWarriorCount,
						orcGoblinCount: orcGoblinCount
					}
				}
				if (selectedArmyName === 'High Elves') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Spearmen (High Elves)') {
							highElfSpearmanCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Archers (High Elves)') {
							highElfArcherCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						highElfSpearmanCount: highElfSpearmanCount,
						highElfArcherCount: highElfArcherCount
					}
				}
				if (selectedArmyName === 'Dwarfs') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Warriors (Dwarfs)') {
							dwarfWarriorCount += unitArray[i2].count
						}
					}
					coreUnitCounts = { dwarfWarriorCount: dwarfWarriorCount	}
				}
				if (selectedArmyName === 'Skaven') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Clanrats (Skaven)') {
							clanratCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Rat Swarms (Skaven)') {
							ratSwarmCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						clanratCount: clanratCount,
						ratSwarmCount: ratSwarmCount
					}
				}
				if (selectedArmyName === 'Lizardmen') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Skinks (Lizardmen)') {
							skinkCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Saurus (Lizardmen)') {
							saurusCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						skinkCount: skinkCount,
						saurusCount: saurusCount
					}
				}
				if (selectedArmyName === 'Bretonnia') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Men-at-Arms (Bretonnia)') {
							manAtArmsCount += unitArray[i2].count
						}	
						if (unitArray[i2].unit.name === 'Squires (Bretonnia)') {
							squireCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Knights (Bretonnia)') {
							bretonnianKnightCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						manAtArmsCount: manAtArmsCount,
						squireCount: squireCount,
						bretonnianKnightCount: bretonnianKnightCount
					}
				}
				if (selectedArmyName === 'Kislev') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Horse Archers (Kislev)') {
							kislevHorseArcherCount += unitArray[i2].count
						}	
						if (unitArray[i2].unit.name === 'Axemen (Kislev)') {
							kislevAxemanCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						kislevHorseArcherCount: kislevHorseArcherCount,
						kislevAxemanCount: kislevAxemanCount
					}
				}
				if (selectedArmyName === 'Dark Elves') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Spearmen (Dark Elves)') {
							darkElfSpearmanCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Crossbowmen (Dark Elves)') {
							darkElfCrossbowmanCount += unitArray[i2].count
						}	
					}
					coreUnitCounts = {
						darkElfSpearmanCount: darkElfSpearmanCount,
						darkElfCrossbowmanCount: darkElfCrossbowmanCount
					}
				}
				if (selectedArmyName === 'Demons') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Demon Hordes (Demons)') {
							demonHordeCount += unitArray[i2].count
						}
					}
					coreUnitCounts = { demonHordeCount: demonHordeCount }
				}
				if (selectedArmyName === 'Araby') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Spearmen (Araby)') {
							arabySpearmanCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Bowmen (Araby)') {
							arabyBowmanCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						arabySpearmanCount: arabySpearmanCount,
						arabyBowmanCount: arabyBowmanCount
					}
				}
				if (selectedArmyName === 'Vampire Counts') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Skeletons (Vampire Counts)') {
							vampireCountSkeletonCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Zombies (Vampire Counts)') {
							zombieCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						vampireCountSkeletonCount: vampireCountSkeletonCount,
						zombieCount: zombieCount
					}
				}
				if (selectedArmyName === 'Dogs of War') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Pikemen (Dogs of War)') {
							pikemanCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Crossbowmen (Dogs of War)') {
							dogsOfWarCrossbowmanCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						pikemanCount: pikemanCount,
						dogsOfWarCrossbowmanCount: dogsOfWarCrossbowmanCount
					}
				}
				if (selectedArmyName === 'Ogre Kingdoms') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Bull Ogres (Ogre Kingdoms)') {
							bullOgreCount += unitArray[i2].count
						}
					}
					coreUnitCounts = { bullOgreCount: bullOgreCount }
				}
				if (selectedArmyName === 'Albion') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Warriors (Albion)') {
							albionWarriorCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Slingers (Albion)') {
							slingerCount += unitArray[i2].count
						}	
					}
					coreUnitCounts = {
						albionWarriorCount: albionWarriorCount,
						slingerCount: slingerCount
					}
				}
				if (selectedArmyName === 'Goblins') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Goblins (Goblins)') {
							goblinGoblinCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Wolf Riders (Goblins)') {
							wolfRiderCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						goblinGoblinCount: goblinGoblinCount,
						wolfRiderCount: wolfRiderCount
					}
				}
				if (selectedArmyName === 'Witch Hunters') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Zealots (Witch Hunters)') {
							zealotCount += unitArray[i2].count
						}
					}
					coreUnitCounts = { zealotCount: zealotCount }
				}
				if (selectedArmyName === 'Chaos Dwarfs') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Chaos Dwarfs (Chaos Dwarfs)') {
							chaosDwarfCount += unitArray[i2].count
						}
					}
					coreUnitCounts = { chaosDwarfCount: chaosDwarfCount }
				}
				if (selectedArmyName === 'Wood Elves') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Glade Guard (Wood Elves)') {
							gladeGuardCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Dryads (Wood Elves)') {
							dryadCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						gladeGuardCount: gladeGuardCount,
						dryadCount: dryadCount
					}
				}
				if (selectedArmyName === 'Beastmen') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Beastherd (Beastmen)') {
							beastherdCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Herdkin (Beastmen)') {
							herdkinCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						beastherdCount: beastherdCount,
						herdkinCount: herdkinCount
					}
				}
				if (selectedArmyName === 'Norse') {
					for (i2 = 0; i2 < unitArray.length; i2++) {
						if (unitArray[i2].unit.name === 'Bondsmen (Norse)') {
							bondsmanCount += unitArray[i2].count
						}
						if (unitArray[i2].unit.name === 'Huscarls (Norse)') {
							huscarlCount += unitArray[i2].count
						}
					}
					coreUnitCounts = {
						bondsmanCount: bondsmanCount,
						huscarlCount: huscarlCount
					}
				}
			}
		}
		return coreUnitCounts
	}

	determineIfValidAfterGameSizeChange(unitArray, selectedArmyName, pointTotal, oldMaximum, newMaximum) {
		let unitCount = this.calculateUnitCount(unitArray)
		let coreUnitCounts = this.calculateCoreUnitCounts(unitArray, selectedArmyName, newMaximum)
		let willBeKept = false

		if (selectedArmyName === 'The Empire') {
			if (
				coreUnitCounts.empireHalberdierCount >= newMaximum * 2 &&
				coreUnitCounts.empireCrossbowmanCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 4
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Tomb Kings') {
			if (
				coreUnitCounts.tombKingSkeletonCount >= newMaximum * 2 &&
				coreUnitCounts.skeletonBowmanCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 4
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Chaos') {
			if (
				coreUnitCounts.chaosWarriorCount >= newMaximum &&
				coreUnitCounts.chaosMarauderCount >= newMaximum &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 2
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Orcs') {
			if (
				coreUnitCounts.orcWarriorCount >= newMaximum * 2 &&
				coreUnitCounts.orcGoblinCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 4
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'High Elves') {
			if (
				coreUnitCounts.highElfSpearmanCount >= newMaximum * 2 &&
				coreUnitCounts.highElfArcherCount >= newMaximum &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 3
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Dwarfs') {
			if (
				coreUnitCounts.dwarfWarriorCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 2
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Skaven') {
			if (
				coreUnitCounts.clanratCount >= newMaximum * 2 &&
				coreUnitCounts.ratSwarmCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 4
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Lizardmen') {
			if (
				coreUnitCounts.skinkCount >= newMaximum * 2 &&
				coreUnitCounts.saurusCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 4
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Bretonnia') {
			if (
				coreUnitCounts.manAtArmsCount >= newMaximum &&
				coreUnitCounts.squireCount >= newMaximum &&
				coreUnitCounts.bretonnianKnightCount >= newMaximum &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 3
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Kislev') {
			if (
				coreUnitCounts.kislevHorseArcherCount>= newMaximum * 2 &&
				coreUnitCounts.kislevAxemanCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 4
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Dark Elves') {
			if (
				coreUnitCounts.darkElfSpearmanCount >= newMaximum * 2 &&
				coreUnitCounts.darkElfCrossbowmanCount >= newMaximum &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 3
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Demons') {
			if (
				coreUnitCounts.demonHordeCount >= newMaximum * 3 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 3
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Araby') {
			if (
				coreUnitCounts.arabySpearmanCount >= newMaximum * 2 &&
				coreUnitCounts.arabyBowmanCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 4
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Vampire Counts') {
			if (
				coreUnitCounts.vampireCountSkeletonCount >= newMaximum * 2 &&
				coreUnitCounts.zombieCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 4
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Dogs of War') {
			if (
				coreUnitCounts.pikemanCount >= newMaximum * 2 &&
				coreUnitCounts.dogsOfWarCrossbowmanCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 4
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Ogre Kingdoms') {
			if (
				coreUnitCounts.bullOgreCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 2
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Albion') {
			if (
				coreUnitCounts.albionWarriorCount >= newMaximum * 2 &&
				coreUnitCounts.slingerCount >= newMaximum &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 3
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Goblins') {
			if (
				coreUnitCounts.goblinGoblinCount >= newMaximum * 4 &&
				coreUnitCounts.wolfRiderCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 6
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Witch Hunters') {
			if (
				coreUnitCounts.zealotCount >= newMaximum * 3 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 3
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Chaos Dwarfs') {
			if (
				coreUnitCounts.chaosDwarfCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 2
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Wood Elves') {
			if (
				coreUnitCounts.gladeGuardCount >= newMaximum * 2 &&
				coreUnitCounts.dryadCount >= newMaximum &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 3
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Beastmen') {
			if (
				coreUnitCounts.beastherdCount >= newMaximum * 2 &&
				coreUnitCounts.herdkinCount >= newMaximum * 2 &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 4
			) {
				willBeKept = true
			}
		}
		if (selectedArmyName === 'Norse') {
			if (
				coreUnitCounts.bondsmanCount >= newMaximum * 2 &&
				coreUnitCounts.huscarlCount >= newMaximum &&
				pointTotal <= newMaximum * 1000 + 999 &&
				unitCount > oldMaximum * 3
			) {
				willBeKept = true
			}
		}

		return willBeKept
	}

	render() {
		let dropdownStyle = {
		    control: (base, state) => ({
		        ...base,
		        bodShadow: 'none',
		        boxShadow: state.isFocused ? 0 : 0,
		        cursor: 'pointer',
		        borderRadius: 0,
		        border: '1px solid #000000',
		        '&:hover': { borderColor: '#000000' },

		    }),
		    option: (styles, { isFocused }) => {
		        return {
		            ...styles,
		            cursor: 'pointer',
		            backgroundColor: isFocused ? '#D3D3D3' : '#FFFFFF', '&:active': { backgroundColor: '#D3D3D3' },
		            color: isFocused ? '#000000' : '#000000',
		            border: isFocused ? '1px solid #000000' : '1px solid #000000',
		            lineHeight: 2,
		        }
		    },
		    input: styles => ({
		        ...styles,
		        color: '#000000',
		    }),
		    menu: styles => ({
		        ...styles,
		        marginTop: '-1px',
		        boxShadow: '10px 10px 12px -2px rgba(0,0,0,0.75)',
		        borderRadius: 0,
		    }),
		    singleValue: styles => ({
		        ...styles,
		        color: '#949391',
		    }),
		    dropdownIndicator: styles => ({
		    	...styles,
		    	color: '#949391',
		    	'&:hover': { color: '#949391' },

		    }),
		    indicatorSeparator: base => ({
		        ...base,
		        display: 'none',
		    }),
		}

		let maximumCountOptions = [
			{ label: '0-1999 points', value: 1 },
			{ label: '2000-2999 points', value: 2 },
			{ label: '3000-3999 points', value: 3 },
			{ label: '4000-4999 points', value: 4 },
			{ label: '5000-5999 points', value: 5 }
		]

		let armyOptions = []
		let labeledArmy
		let i2
		for (i2 = 0; i2 < this.state.armies.length; i2++) {
			labeledArmy = { value: this.state.armies[i2], label: this.state.armies[i2].display_name }
			armyOptions.push(labeledArmy)
		}

		return (
			<div id="sections-container-id" className={style['sections-container']}>	
				<WmrInnerContainer
					dropdownStyle={dropdownStyle}
					armyOptions={armyOptions}
					maximumCountOptions={maximumCountOptions}
					units={this.state.units}
					specialRules={this.state.specialRules}
					auxiliaries={this.state.auxiliaries}
					magicItems={this.state.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateCoreUnitCounts={this.calculateCoreUnitCounts}
					determineIfValidAfterGameSizeChange={this.determineIfValidAfterGameSizeChange}
				/>
				<div id="print-section-id" className={style['print-section']}></div>
			</div>
		)
	}
}

export default WmrOuterContainer