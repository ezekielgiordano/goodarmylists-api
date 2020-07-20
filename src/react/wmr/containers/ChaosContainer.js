import style from '../../../assets/stylesheets/index.module.css'
import paypal from '../../../assets/images/paypal.gif'
import React, { Component } from 'react'
import Modal from 'react-modal'
import FormattedList from '../components/FormattedList'
import UnitEntryButton from '../components/UnitEntryButton'
import UnitEntryNameTile from '../components/UnitEntryNameTile'
import AuxiliaryIcon from '../components/AuxiliaryIcon'
import MagicItemIcon from '../components/MagicItemIcon'
import InformationTile from '../components/InformationTile'
import AuxiliarySelectionTile from '../components/AuxiliarySelectionTile'
import MagicItemSelectionTile from '../components/MagicItemSelectionTile'

class ChaosContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			listedUnits: [
				{
					count: 1,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 3,
						name: 'Chaos Warriors (Chaos)',
						display_name: 'Chaos Warrior unit',
						option_screen_name: 'Chaos Warriors',
						list_name: 'Chaos Warriors',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '4',
						hits: '4',
						armor: '4+',
						command: '-',
						unit_size: '3',
						points: 140,
						minimum: 1,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 3,
						name: 'Chaos Marauders (Chaos)',
						display_name: 'Chaos Marauder unit',
						option_screen_name: 'Chaos Marauders',
						list_name: 'Chaos Marauders',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '3',
						hits: '3',
						armor: '5+',
						command: '-',
						unit_size: '3',
						points: 60,
						minimum: 1,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 3,
						name: 'General (Chaos)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 12,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			],
			selectedAuxiliaries: [],
			selectedMagicItems: [],
			pointTotal: 325,
			unitCount: 3,
			informationVisible: false,
			formattedListVisible: false,
			auxiliariesVisible: false,
			magicItemsVisible: false,
			unitWhoseInformationIsShown: '',
			unitBeingGivenAuxiliary: '',
			unitBeingGivenMagicItem: ''
		}
		this.determineIfGreyedOut = this.determineIfGreyedOut.bind(this)
		this.determineIfValidAfterPointIncrease = this.determineIfValidAfterPointIncrease.bind(this)
		this.addUnit = this.addUnit.bind(this)
		this.removeUnit = this.removeUnit.bind(this)
		this.addAuxiliary = this.addAuxiliary.bind(this)
		this.removeAuxiliary = this.removeAuxiliary.bind(this)
		this.addMagicItem = this.addMagicItem.bind(this)
		this.removeMagicItem = this.removeMagicItem.bind(this)
		this.toggleInformation = this.toggleInformation.bind(this)
		this.toggleFormattedList = this.toggleFormattedList.bind(this)
		this.toggleAuxiliaries = this.toggleAuxiliaries.bind(this)
		this.toggleMagicItems = this.toggleMagicItems.bind(this)
		this.updateUnitWhoseInformationIsShown = this.updateUnitWhoseInformationIsShown.bind(this)
		this.updateUnitBeingGivenAuxiliary = this.updateUnitBeingGivenAuxiliary.bind(this)
		this.updateUnitBeingGivenMagicItem = this.updateUnitBeingGivenMagicItem.bind(this)
		this.clearList = this.clearList.bind(this)
	}

	determineIfGreyedOut(unitArray) {
		let unitsInArmy = []
		let greyedOutUnits = []
		let pointTotal = this.state.pointTotal
		let wouldBeMaximumCount = 0
		let chaosWarriorCount = 0
		let chaosMarauderCount = 0
		let locked = false
		let i2
		let i3

		for (i2 = 0; i2 < unitArray.length; i2++) {
			if (unitArray[i2].unit.name === 'Chaos Warriors (Chaos)') {
				chaosWarriorCount += unitArray[i2].count
			}	
			if (unitArray[i2].unit.name === 'Chaos Marauders (Chaos)') {
				chaosMarauderCount += unitArray[i2].count
			}			
		}	

		for (i2 = 0; i2 < this.props.units.length; i2++) {
			if (this.props.units[i2].wmr_army_id === this.props.selectedArmy.id) {
				unitsInArmy.push(this.props.units[i2])
			}
		}
		for (i2 = 0; i2 < unitsInArmy.length; i2++) {
			wouldBeMaximumCount = this.props.calculateMaximumCount(pointTotal + parseInt(unitsInArmy[i2].points))

			for (i3 = 0; i3 < unitArray.length; i3++) {
				if (unitArray[i3].unit.name === unitsInArmy[i2].name) {
					if (unitsInArmy[i2].is_unique === true || unitsInArmy[i2].is_unique === 't') {
						locked = true
					}
					if (
						unitArray[i3].count >= wouldBeMaximumCount &&
						unitArray[i3].count >= parseInt(unitArray[i3].unit.maximum) * wouldBeMaximumCount
					) {
						locked = true
					}
				}
			}

			if (
				chaosWarriorCount < wouldBeMaximumCount ||
				chaosMarauderCount < wouldBeMaximumCount
			) {
				locked = true
			}
			if (unitsInArmy[i2].name === 'Chaos Warriors (Chaos)') {
				if (chaosMarauderCount < wouldBeMaximumCount) {
					locked = true
				} else {
					locked = false
				}
			}
			if (unitsInArmy[i2].name === 'Chaos Marauders (Chaos)') {
				if (chaosWarriorCount < wouldBeMaximumCount) {
					locked = true
				} else {
					locked = false
				}
			}
			if (locked === true) {
				greyedOutUnits.push(unitsInArmy[i2])
			}
			locked = false
		}

		return greyedOutUnits
	}

	determineIfValidAfterPointIncrease(pointIncrease) {
		let maximumCountBefore = this.props.calculateMaximumCount(this.state.pointTotal)
		let maximumCountAfter = this.props.calculateMaximumCount(this.state.pointTotal + pointIncrease)
		let valid
		if (maximumCountBefore === maximumCountAfter) {
			valid = true
		} else {
			let listedUnits = this.state.listedUnits
			let chaosWarriorCount = 0
			let chaosMarauderCount = 0
			let i2
			for (i2 = 0; i2 < listedUnits.length; i2++) {
				if (listedUnits[i2].unit.name === 'Chaos Warriors (Chaos)') {
					chaosWarriorCount += listedUnits[i2].count
				}	
				if (listedUnits[i2].unit.name === 'Chaos Marauders (Chaos)') {
					chaosMarauderCount += listedUnits[i2].count
				}			
			}
			if (
				chaosWarriorCount > maximumCountAfter ||
				chaosMarauderCount > maximumCountAfter
			) {
				valid = false
			} else {
				valid = true
			}
		}
		return valid
	}

	addUnit(unitToAdd) {
		let listedUnits = this.state.listedUnits
		let duplicateCount = 0
		let i2
		for (i2 = 0; i2 < listedUnits.length; i2++) {
			if (listedUnits[i2].unit.name === unitToAdd.name) {
				listedUnits[i2].count += 1
				duplicateCount += 1
			}
		}
		if (duplicateCount === 0) {
			let unitObject = {
				count: 1,
				unit: unitToAdd
			}
			listedUnits.push(unitObject)
		}
		this.setState({
			listedUnits: listedUnits,
			pointTotal: this.props.calculatePointTotal(listedUnits, this.state.selectedAuxiliaries, this.state.selectedMagicItems),
			unitCount: this.props.calculateUnitCount(listedUnits) + this.props.calculateMountCount(this.state.selectedAuxiliaries),
			auxiliariesVisible: false,
			magicItemsVisible: false
		})
	}

	removeUnit(unitToRemove) {
		let listedUnits = this.state.listedUnits
		let selectedAuxiliaries = this.state.selectedAuxiliaries
		let wouldBePointTotal = this.state.pointTotal - parseInt(unitToRemove.unit.points)
		let wouldBeMaximumCount = this.props.calculateMaximumCount(wouldBePointTotal)
		let chaosWarriorCount = 0
		let chaosMarauderCount = 0
		let i2
		let i3

		for (i2 = 0; i2 < listedUnits.length; i2++) {
			if (listedUnits[i2].unit.name === 'Chaos Warriors (Chaos)') {
				chaosWarriorCount += listedUnits[i2].count
			}	
			if (listedUnits[i2].unit.name === 'Chaos Marauders (Chaos)') {
				chaosMarauderCount += listedUnits[i2].count
			}			
		}

		for (i2 = 0; i2 < listedUnits.length; i2++) {
			if (listedUnits[i2].unit.name === unitToRemove.unit.name) {
				if (
					unitToRemove.unit.name === 'Chaos Warriors (Chaos)' ||
					unitToRemove.unit.name === 'Chaos Marauders (Chaos)'
				) {
					if (listedUnits[i2].count - 1 >= wouldBeMaximumCount) {
						listedUnits[i2].count -= 1
					}
				}
				if (
					unitToRemove.unit.name !== 'Chaos Warriors (Chaos)' &&
					unitToRemove.unit.name !== 'Chaos Marauders (Chaos)' &&
					unitToRemove.unit.unit_type !== 'General'
				) {
					if (
						chaosWarriorCount >= wouldBeMaximumCount &&
						chaosMarauderCount >= wouldBeMaximumCount
					) {
						if (listedUnits[i2].count > 1) {
							listedUnits[i2].count -= 1
						} else {
							for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
								if (selectedAuxiliaries[i3].unitName === unitToRemove.unit.name) {
									selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
								}
							}
							listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
						}
					}
				}
			}
			for (i3 = selectedAuxiliaries.length - 1; i3 >= 0; i3--) {
				if (
					selectedAuxiliaries[i3].unitName === unitToRemove.unit.name &&
					listedUnits.length !== this.state.listedUnits.length
				) {
					if (selectedAuxiliaries[i3].count > listedUnits[i2].count) {
						selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i3]), 1)
					}
				}
			}
		}

		this.setState({
			listedUnits: listedUnits,
			selectedAuxiliaries: selectedAuxiliaries,
			pointTotal: this.props.calculatePointTotal(listedUnits, selectedAuxiliaries, this.state.selectedMagicItems),
			unitCount: this.props.calculateUnitCount(listedUnits) + this.props.calculateMountCount(selectedAuxiliaries),
			auxiliariesVisible: false,
			magicItemsVisible: false
		})
	}

	addAuxiliary(unitObject, highlightedAuxiliaries) {
		let selectedAuxiliaries = []
		let i2

		for (i2 = 0; i2 < this.state.selectedAuxiliaries.length; i2++) {
			if (this.state.selectedAuxiliaries[i2].unitName !== unitObject.unit.name) {
				selectedAuxiliaries.push(this.state.selectedAuxiliaries[i2])
			}
		}

		selectedAuxiliaries = selectedAuxiliaries.concat(highlightedAuxiliaries)

		this.setState({
			selectedAuxiliaries: selectedAuxiliaries,
			pointTotal: this.props.calculatePointTotal(this.state.listedUnits, selectedAuxiliaries, this.state.selectedMagicItems),
			unitCount: this.props.calculateUnitCount(this.state.listedUnits) + this.props.calculateMountCount(selectedAuxiliaries),
			unitBeingGivenAuxiliary: '',
		})
		this.toggleAuxiliaries()
	}

	removeAuxiliary(auxiliaryToRemove) {
		let selectedAuxiliaries = this.state.selectedAuxiliaries
		let i2

		for (i2 = selectedAuxiliaries.length - 1; i2 >= 0; i2--) {
			if (
				selectedAuxiliaries[i2].auxiliary.name === auxiliaryToRemove.auxiliary.name &&
				selectedAuxiliaries[i2].unitName === auxiliaryToRemove.unitName
			) {
				if (auxiliaryToRemove.count > 1) {
					selectedAuxiliaries[i2].count -= 1
				} else {
					selectedAuxiliaries.splice(selectedAuxiliaries.indexOf(selectedAuxiliaries[i2]), 1)
				}
			}
		}

		this.setState({
			selectedAuxiliaries: selectedAuxiliaries,
			pointTotal: this.props.calculatePointTotal(this.state.listedUnits, selectedAuxiliaries, this.state.selectedMagicItems),
			unitCount: this.props.calculateUnitCount(this.state.listedUnits) + this.props.calculateMountCount(selectedAuxiliaries)
		})
	}

	addMagicItem(unitObject, highlightedMagicItems) {
		let selectedMagicItems = []
		let i2
		let i3

		for (i2 = 0; i2 < this.state.selectedMagicItems.length; i2++) {
			if (this.state.selectedMagicItems[i2].unitName !== unitObject.unit.name) {
				selectedMagicItems.push(this.state.selectedMagicItems[i2])
			}
		}

		selectedMagicItems = selectedMagicItems.concat(highlightedMagicItems)

		for (i2 = selectedMagicItems.length - 1; i2 >= 0; i2--) {
			for (i3 = highlightedMagicItems.length - 1; i3 >= 0; i3--) {
				if (
					selectedMagicItems[i2].magicItem.name === highlightedMagicItems[i3].magicItem.name &&
					selectedMagicItems[i2].unitName !== unitObject.unit.name
				) {
					selectedMagicItems.splice(selectedMagicItems.indexOf(selectedMagicItems[i2]), 1)
				}
			}
		}

		this.setState({
			selectedMagicItems: selectedMagicItems,
			pointTotal: this.props.calculatePointTotal(this.state.listedUnits, this.state.selectedAuxiliaries, selectedMagicItems),
			unitBeingGivenMagicItem: ''
		})
		this.toggleMagicItems()
	}

	removeMagicItem(magicItemToRemove) {
		let selectedMagicItems = this.state.selectedMagicItems
		let i2

		for (i2 = selectedMagicItems.length - 1; i2 >= 0; i2--) {
			if (
				selectedMagicItems[i2].magicItem.name === magicItemToRemove.magicItem.name &&
				selectedMagicItems[i2].unitName === magicItemToRemove.unitName
			) {
				if (magicItemToRemove.count > 1) {
					selectedMagicItems[i2].count -= 1
				} else {
					selectedMagicItems.splice(selectedMagicItems.indexOf(magicItemToRemove), 1)
				}
			}
		}

		this.setState({
			selectedMagicItems: selectedMagicItems,
			pointTotal: this.props.calculatePointTotal(this.state.listedUnits, this.state.selectedAuxiliaries, selectedMagicItems)
		})
	}

	toggleInformation() {
		let isAboutToBeVisible
		if (this.state.informationVisible === false) {
			isAboutToBeVisible = true
		} else {
			isAboutToBeVisible = false
		}
		this.setState({ informationVisible: isAboutToBeVisible })
	}

	toggleFormattedList() {
		let isAboutToBeVisible
		if (this.state.formattedListVisible === false) {
			isAboutToBeVisible = true
		} else {
			isAboutToBeVisible = false
		}
		this.setState({ formattedListVisible: isAboutToBeVisible })
	}

	toggleAuxiliaries() {
		if (this.state.auxiliariesVisible === false) {
			this.setState({ auxiliariesVisible: true })
		} else {
			this.setState({
				auxiliariesVisible: false,
				unitBeingGivenAuxiliary: ''
			})
		}
	}

	toggleMagicItems() {
		if (this.state.magicItemsVisible === false) {
			this.setState({ magicItemsVisible: true })
		} else {
			this.setState({
				magicItemsVisible: false,
				unitBeingGivenMagicItem: ''
			})
		}
	}

	updateUnitWhoseInformationIsShown(unit) {
		this.setState({ unitWhoseInformationIsShown: unit })
		this.toggleInformation()
	}

	updateUnitBeingGivenAuxiliary(unit) {
		this.setState({ unitBeingGivenAuxiliary: unit })
		this.toggleAuxiliaries()
	}

	updateUnitBeingGivenMagicItem(unit) {
		this.setState({ unitBeingGivenMagicItem: unit })
		this.toggleMagicItems()
	}	

	clearList() {
		this.setState({
			listedUnits: [
				{
					count: 1,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 2,
						name: 'Chaos Warriors (Chaos)',
						display_name: 'Chaos Warrior unit',
						option_screen_name: 'Chaos Warriors',
						list_name: 'Chaos Warriors',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '4',
						hits: '4',
						armor: '4+',
						command: '-',
						unit_size: '3',
						points: 140,
						minimum: 1,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 2,
						name: 'Chaos Marauders (Chaos)',
						display_name: 'Chaos Marauder unit',
						option_screen_name: 'Chaos Marauders',
						list_name: 'Chaos Marauders',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 2,
						attacks: '3',
						hits: '3',
						armor: '5+',
						command: '-',
						unit_size: '3',
						points: 60,
						minimum: 1,
						maximum: null,
						special_rules: '-',
						can_have_aux: false,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 2,
						name: 'General (Chaos)',
						display_name: 'General',
						option_screen_name: 'the General',
						list_name: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 12,
						attacks: '+2',
						hits: '-',
						armor: '-',
						command: '9',
						unit_size: '1',
						points: 125,
						minimum: 1,
						maximum: 1,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true 
					}
				}
			],
			selectedAuxiliaries: [],
			selectedMagicItems: [],
			pointTotal: 325,
			unitCount: 3,
			informationVisible: false,
			formattedListVisible: false,
			auxiliariesVisible: false,
			magicItemsVisible: false,
			unitWhoseInformationIsShown: '',
			unitBeingGivenAuxiliary: '',
			unitBeingGivenMagicItem: ''
		})
	}

	render() {
		document.body.style.overflow = 'visible'
		let appElement = document.getElementById('app')
		let unsortedListedUnits = this.state.listedUnits
		let listedUnits = unsortedListedUnits.sort((a, b) => {
			return ( parseInt(a.unit.order_within_army) - parseInt(b.unit.order_within_army) )
		})

		let auxiliarySelectionTile
		let magicItemSelectionTile
		if (this.state.auxiliariesVisible === true) {
			auxiliarySelectionTile =
				<div className={style['auxiliary-selection-tile']}>
					<AuxiliarySelectionTile
						unitObject={this.state.unitBeingGivenAuxiliary}
						auxiliaries={this.props.auxiliaries}
						selectedAuxiliaries={this.state.selectedAuxiliaries}
						addAuxiliary={this.addAuxiliary}
						toggleAuxiliaries={this.toggleAuxiliaries}
						determineIfValidAfterPointIncrease={this.determineIfValidAfterPointIncrease}
						calculateMaximumCount={this.props.calculateMaximumCount}
						pointTotal={this.state.pointTotal}
					/>
				</div>
		}		
		if (this.state.magicItemsVisible === true) {
			magicItemSelectionTile = 
				<div className={style['magic-item-selection-tile']}>
					<MagicItemSelectionTile
						unitObject={this.state.unitBeingGivenMagicItem}
						magicItems={this.props.magicItems}
						selectedAuxiliaries={this.state.selectedAuxiliaries}
						selectedMagicItems={this.state.selectedMagicItems}
						addMagicItem={this.addMagicItem}
						toggleMagicItems={this.toggleMagicItems}
						determineIfValidAfterPointIncrease={this.determineIfValidAfterPointIncrease}
					/>
				</div>
		}

		let clearListDiv =
			<div className={style['clear-list-div']}>
				<span onClick={this.clearList} className={style['clear-or-cancel-label']}>Clear List</span>
			</div>
		let unitEntryButtonTitle = 
			<div className={style['unit-entry-button-title-bar-wmr']}>
				<h3 className={style['unit-entry-button-title']}>Available Units</h3>
			</div>

		let unsortedUnitsInArmy = []
		let i2
		for (i2 = 0; i2 < this.props.units.length; i2++) {
			if (this.props.units[i2].wmr_army_id === this.props.selectedArmy.id) {
				unsortedUnitsInArmy.push(this.props.units[i2])
			}
		}
		let unitsInArmy = unsortedUnitsInArmy.sort((a, b) => {
			return ( parseInt(a.order_within_army) - parseInt(b.order_within_army) )
		})

		let greyedOutUnits = this.determineIfGreyedOut(this.state.listedUnits)

		let	unitEntryButtonDisplay
		if (this.state.informationVisible === false) {
			unitEntryButtonDisplay = unitsInArmy.map(unit => {
				return (
					<UnitEntryButton
						key={parseInt(unit.id)}
						id={parseInt(unit.id)}
						unit={unit}
						addUnit={this.addUnit}
						greyedOutUnits={greyedOutUnits}
						updateUnitWhoseInformationIsShown={this.updateUnitWhoseInformationIsShown}
					/>
				)			
			})
		} else {
			unitEntryButtonDisplay =
				<InformationTile
					unitWhoseInformationIsShown={this.state.unitWhoseInformationIsShown}
					toggleInformation={this.toggleInformation}
				/>
		}

		let breakPoint = this.props.calculateBreakPoint(listedUnits, this.state.selectedAuxiliaries)
		let pointTotalDisplay =
			<div className={style['point-total']}>
				Points: <span className={style['bold']}>{this.state.pointTotal}</span><br />
				Unit Count: <span className={style['bold']}>{this.state.unitCount}</span><br />
				Break Point: <span className={style['bold']}>{breakPoint}</span><br />
			</div>

		let listedUnitTileDisplay = listedUnits.map(unitObject => {
			return (
				<div
					key={unitObject.unit.order_within_army}
					id={unitObject.unit.order_within_army}
					className={style['list-output-side-row']}
				>
					<div className={style['list-entry-div']}>
						<MagicItemIcon
							key={parseInt(unitObject.unit.order_within_army)}
							id={parseInt(unitObject.unit.order_within_army)}
							unitObject={unitObject}
							updateUnitBeingGivenMagicItem={this.updateUnitBeingGivenMagicItem}
						/>
						<AuxiliaryIcon
							key={parseInt(unitObject.unit.order_within_army) + 20000}
							id={parseInt(unitObject.unit.order_within_army)}
							unitObject={unitObject}
							updateUnitBeingGivenAuxiliary={this.updateUnitBeingGivenAuxiliary}
						/>
					</div>
					<div className={style['spacer-div']}>_</div>
					<UnitEntryNameTile
						key={unitObject.unit.order_within_army}
						id={unitObject.unit.order_within_army}
						unitObject={unitObject}
						selectedAuxiliaries={this.state.selectedAuxiliaries}
						selectedMagicItems={this.state.selectedMagicItems}
						removeUnit={this.removeUnit}
						removeAuxiliary={this.removeAuxiliary}
						removeMagicItem={this.removeMagicItem}
					/>
				</div>
			)
		})

		let viewListButtonDisplay
		if (this.state.listedUnits.length > 0) {
				viewListButtonDisplay =
					<div className={style['view-list-button-div']}>
						<br /><br />
						<span onClick={this.toggleFormattedList} className={style['view-list-button']}>
							View List
						</span>
					</div>
			} else {
				viewListButtonDisplay =
					<div className={style['instruction']}>
						<i>Click units to the left to add them to the list</i>
					</div>
			}

		let listOutputSide
		if (auxiliarySelectionTile !== undefined && magicItemSelectionTile === undefined) {
			listOutputSide = auxiliarySelectionTile
		}
		if (auxiliarySelectionTile === undefined && magicItemSelectionTile !== undefined) {
			listOutputSide = magicItemSelectionTile
		}
 		if (auxiliarySelectionTile === undefined && magicItemSelectionTile === undefined) {
			listOutputSide =
				<div>
					{pointTotalDisplay}<br />
					{listedUnitTileDisplay}
					{viewListButtonDisplay}
				</div>
		}

		return (
			<div>
				{clearListDiv}	
				<div className={style['everything-after-army-dropdown']}>
					<div>
						<div className={style['unit-entry-buttons']}>
							{unitEntryButtonTitle}<br />
							{unitEntryButtonDisplay}
						</div>
					</div>
					<div>
						<div className={style['list-output-side']}>
							<div className={style['list-title-bar-wmr']}>
								<h3 className={style['list-title']}>{this.props.selectedArmy.display_name}</h3>
							</div><br />
							{listOutputSide}
						</div>
					</div>
				</div>
				<div className={style['email-div']} id="email-div-id">
					<span>Email:{' '}admin@goodarmylists.com</span>
					<form className={style['paypal-form']} action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
						<input type="hidden" name="cmd" value="_donations" />
						<input type="hidden" name="business" value="admin@goodarmylists.com" />
						<input type="hidden" name="currency_code" value="USD" />
						<input type="image" src={paypal} border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
						<img alt="" border="0" src={paypal} width="1" height="1" />
					</form>
				</div>
				<Modal
					appElement={appElement}
					isOpen={this.state.formattedListVisible}
					onRequestClose={this.toggleFormattedList}
					shouldCloseOnOverlayClick={true}
					className={style['formatted-list-modal']}
					ariaHideApp={false}
				>
					<FormattedList
						selectedArmy={this.props.selectedArmy}
						listedUnits={listedUnits}
						selectedAuxiliaries={this.state.selectedAuxiliaries}
						selectedMagicItems={this.state.selectedMagicItems}
						pointTotal={this.state.pointTotal}
						unitCount={this.state.unitCount}
						breakPoint={breakPoint}
						toggleFormattedList={this.toggleFormattedList}
					/>
				</Modal>				
			</div>	
		)
	}
}

export default ChaosContainer