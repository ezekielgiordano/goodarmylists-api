import style from '../../../assets/stylesheets/index.module.css'
import paypal from '../../../assets/images/paypal.gif'
import React, { Component } from 'react'
// import Modal from 'react-modal'
// import FormattedList from '../components/FormattedList'
import UnitEntryButton from '../components/UnitEntryButton'
import UnitEntryNameTile from '../components/UnitEntryNameTile'
import AuxiliaryIcon from '../components/AuxiliaryIcon'
import MagicItemIcon from '../components/MagicItemIcon'
import AuxiliarySelectionTile from '../components/AuxiliarySelectionTile'
import MagicItemSelectionTile from '../components/MagicItemSelectionTile'

class EmpireContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			listedUnits: [
				{
					count: 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 1,
						name: 'Halberdiers (The Empire)',
						display_name: 'Halberdier unit',
						plural_name: 'Halberdiers',
						singular_name: 'Halberdier',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 45,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true
					}
				},
				{
					count: 2,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 1,
						name: 'Crossbowmen (The Empire)',
						display_name: 'Crossbowman unit',
						plural_name: 'Crossbowmen',
						singular_name: 'Crossbowman',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 3,
						attacks: '3',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 55,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 1,
						name: 'General (The Empire)',
						display_name: 'General',
						adjective: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 11,
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
			unitCount: 5,
			formattedListVisible: false,
			auxiliariesVisible: false,
			magicItemsVisible: false,
			unitBeingGivenMagicItem: ''
		}
		this.calculatePointTotal = this.calculatePointTotal.bind(this)
		this.calculateMinMaxes = this.calculateMinMaxes.bind(this)
		this.determineIfGreyedOut = this.determineIfGreyedOut.bind(this)
		this.addUnit = this.addUnit.bind(this)
		this.removeUnit = this.removeUnit.bind(this)
		this.addAuxiliary = this.addAuxiliary.bind(this)
		this.removeAuxiliary = this.removeAuxiliary.bind(this)
		this.addMagicItem = this.addMagicItem.bind(this)
		this.removeMagicItem = this.removeMagicItem.bind(this)
		this.toggleFormattedList = this.toggleFormattedList.bind(this)
		this.toggleAuxiliaries = this.toggleAuxiliaries.bind(this)
		this.toggleMagicItems = this.toggleMagicItems.bind(this)
		this.updateUnitBeingGivenAuxiliary = this.updateUnitBeingGivenAuxiliary.bind(this)
		this.updateUnitBeingGivenMagicItem = this.updateUnitBeingGivenMagicItem.bind(this)
		this.clearList = this.clearList.bind(this)
	}

	calculatePointTotal(unitArray, auxiliaryArray, magicItemArray) {
		let pointTotal = 0
		let i2
		for (i2 = 0; i2 < unitArray.length; i2++) {
			pointTotal += (parseInt(unitArray[i2].unit.points) * parseInt(unitArray[i2].count))
		}
		if (auxiliaryArray !== 'placeholder') {
			for (i2 = 0; i2 < auxiliaryArray.length; i2++) {
				pointTotal += parseInt(auxiliaryArray[i2].unit.points)
			}			
		} else {
			for (i2 = 0; i2 < this.state.selectedAuxiliaries.length; i2++) {
				pointTotal += parseInt(this.state.selectedAuxiliaries[i2].unit.points)
			}			
		}
		if (magicItemArray !== 'placeholder') {
			for (i2 = 0; i2 < magicItemArray.length; i2++) {
				pointTotal += parseInt(magicItemArray[i2].unit.points)
			}			
		} else {
			for (i2 = 0; i2 < this.state.selectedMagicItems.length; i2++) {
				pointTotal += parseInt(this.state.selectedMagicItems[i2].unit.points)
			}
		}
		return pointTotal		
	}

	calculateUnitCount(unitArray) {
		let unitCount = 0
		let i2
		for (i2 = 0; i2 < unitArray.length; i2++) {
			unitCount += parseInt(unitArray[i2].count)
		}
		return unitCount
	}

	calculateMinMaxes() {

	}

	determineIfGreyedOut() {

	}

	addUnit(unitToAdd) {
		let listedUnits = this.state.listedUnits
		let indexCount = this.state.indexCount
		let duplicateCount = 0
		let i2
		for (i2 = 0; i2 < listedUnits.length; i2++) {
			if (listedUnits[i2].unit.name === unitToAdd.name) {
				listedUnits[i2].count += 1
				duplicateCount += 1
			}
		}
		if (duplicateCount === 0) {
			let unitToAddWithCount = {
				count: 1,
				unit: unitToAdd
			}
			listedUnits.push(unitToAddWithCount)
		}
		// let pointTotal = this.calculatePointTotal(listedUnits)
		this.setState({
			listedUnits: listedUnits,
			pointTotal: this.calculatePointTotal(listedUnits, 'placeholder', 'placeholder'),
			unitCount: this.calculateUnitCount(listedUnits),
			// maximumCount: this.calculateMinMaxes(pointTotal),
			auxiliariesVisible: false,
			magicItemsVisible: false
		})
	}

	removeUnit(unitToRemove) {
		let listedUnits = this.state.listedUnits
		let i2
		for (i2 = 0; i2 < listedUnits.length; i2++) {
			if (listedUnits[i2].unit.name === unitToRemove.unit.name) {
				if (
					unitToRemove.unit.name === 'Halberdiers (The Empire)' ||
					unitToRemove.unit.name === 'Crossbowmen (The Empire)'
				) {
					if (listedUnits[i2].count > 2) {
						listedUnits[i2].count -= 1
					}
				}
				if (
					unitToRemove.unit.name !== 'Halberdiers (The Empire)' &&
					unitToRemove.unit.name !== 'Crossbowmen (The Empire)' &&
					unitToRemove.unit.unit_type !== 'General'
				) {
					if (listedUnits[i2].count > 1) {
						listedUnits[i2].count -= 1
					} else {
						listedUnits.splice(listedUnits.indexOf(listedUnits[i2]), 1)
					}
				}
			}
		}


		this.setState({
			listedUnits: listedUnits,
			pointTotal: this.calculatePointTotal(listedUnits, 'placeholder', 'placeholder'),
			unitCount: this.calculateUnitCount(listedUnits),
			auxiliariesVisible: false,
			magicItemsVisible: false
		})
	}

	addAuxiliary() {

	}

	removeAuxiliary() {

	}

	addMagicItem() {

	}

	removeMagicItem() {

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
					count: 2,
					unit: {
						id: 1,
						game_id: 2,
						wmr_army_id: 1,
						name: 'Halberdiers (The Empire)',
						display_name: 'Halberdier unit',
						plural_name: 'Halberdiers',
						singular_name: 'Halberdier',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 1,
						attacks: '3',
						hits: '3',
						armor: '6+',
						command: '-',
						unit_size: '3',
						points: 45,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true
					}
				},
				{
					count: 2,
					unit: {
						id: 3,
						game_id: 2,
						wmr_army_id: 1,
						name: 'Crossbowmen (The Empire)',
						display_name: 'Crossbowman unit',
						plural_name: 'Crossbowmen',
						singular_name: 'Crossbowman',
						unit_type: 'Infantry',
						unit_type_index: 1,
						is_unique: false,
						order_within_army: 3,
						attacks: '3',
						hits: '3',
						armor: '0',
						command: '-',
						unit_size: '3',
						points: 55,
						minimum: 2,
						maximum: null,
						special_rules: '-',
						can_have_aux: true,
						can_have_mag: true
					}
				},
				{
					count: 1,
					unit: {
						id: 1000000,
						game_id: 2,
						wmr_army_id: 1,
						name: 'General (The Empire)',
						display_name: 'General',
						adjective: 'General',
						unit_type: 'General',
						unit_type_index: 7,
						is_unique: true,
						order_within_army: 11,
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
			unitCount: 5,
			formattedListVisible: false,
			auxiliariesVisible: false,
			magicItemsVisible: false,
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
						selectedMagicItems={this.state.selectedMagicItems}
						addMagicItem={this.addMagicItem}
						toggleMagicItems={this.toggleMagicItems}
						pointTotal={this.state.pointTotal}
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

		let	unitEntryButtonDisplay = unitsInArmy.map(unit => {
			return (
				<UnitEntryButton
					key={parseInt(unit.id)}
					id={parseInt(unit.id)}
					unit={unit}
					addUnit={this.addUnit}
				/>
			)			
		})

		let pointTotalDisplay =
			<div className={style['point-total']}>
				Points: <span className={style['bold']}>{this.state.pointTotal}</span><br />
				Unit Count: <span className={style['bold']}>{this.state.unitCount}</span><br />
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
			</div>	
		)
	}
}

export default EmpireContainer