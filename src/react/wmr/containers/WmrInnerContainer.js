import style from '../../../assets/stylesheets/index.module.css'
import paypal from '../../../assets/images/paypal.gif'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
// import Modal from 'react-modal'
// import FormattedList from '../components/FormattedList'
import UnitEntryButton from '../components/UnitEntryButton'
import UnitEntryNameTile from '../components/UnitEntryNameTile'
import MagicItemIcon from '../components/MagicItemIcon'
import MagicItemSelectionTile from '../components/MagicItemSelectionTile'

class WmrInnerContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedArmy: '',
			listedUnits: [],
			selectedMagicItems: [],
			pointTotal: 0,
			indexCount: 0,
			formattedListVisible: false,
			magicItemsVisible: false,
			unitBeingGivenMagicItem: ''
		}
		this.updateSelectedArmy = this.updateSelectedArmy.bind(this)
		this.calculatePointTotal = this.calculatePointTotal.bind(this)
		this.calculateMinMaxes = this.calculateMinMaxes.bind(this)
		this.determineIfGreyedOut = this.determineIfGreyedOut.bind(this)
		this.addUnitToList = this.addUnitToList.bind(this)
		this.removeUnitFromList = this.removeUnitFromList.bind(this)
		this.selectMagicItem = this.selectMagicItem.bind(this)
		this.removeMagicItem = this.removeMagicItem.bind(this)
		this.toggleFormattedList = this.toggleFormattedList.bind(this)
		this.toggleMagicItems = this.toggleMagicItems.bind(this)
		this.updateUnitBeingGivenMagicItem = this.updateUnitBeingGivenMagicItem.bind(this)
		this.clearList = this.clearList.bind(this)
	}

	updateSelectedArmy(army) {
		this.setState({ selectedArmy: army.value })
		this.clearList()
	}

	calculatePointTotal() {

	}

	calculateMinMaxes() {

	}

	determineIfGreyedOut() {

	}

	addUnitToList(unitToAdd) {
		let listedUnits = this.state.listedUnits
		let indexCount = this.state.indexCount
		let unitToAddWithIndex = { index: indexCount, unit: unitToAdd }
		listedUnits.push(unitToAddWithIndex)
		indexCount += 1
		// let pointTotal = this.calculatePointTotal(listedUnits)
		this.setState({
			listedUnits: listedUnits,
			indexCount: indexCount,
			// pointTotal: pointTotal,
			// maximumCount: this.calculateMinMaxes(pointTotal),
			magicItemsVisible: false
		})
	}

	removeUnitFromList() {

	}

	selectMagicItem() {

	}

	removeMagicItem() {

	}

	toggleFormattedList() {

	}

	toggleMagicItems() {

	}

	updateUnitBeingGivenMagicItem() {

	}

	clearList() {
		this.setState({
			listedUnits: [],
			selectedMagicItems: [],
			pointTotal: 0,
			indexCount: 0,
			formattedListVisible: false,
			magicItemsVisible: false,
			unitBeingGivenMagicItem: ''
		})
	}
	
	render() {
		let appElement = document.getElementById('app')
		let selectedArmy = this.state.selectedArmy
		let armyOptions = []
		let labeledArmy
		let i
		for (i = 0; i < this.props.armies.length; i++) {
			labeledArmy = { value: this.props.armies[i], label: this.props.armies[i].display_name }
			armyOptions.push(labeledArmy)
		}
				let displayNoneBottom
		if (selectedArmy === '') {
			displayNoneBottom = style['display-none']
		} else {
			displayNoneBottom = ''
		}
		let magicItemSelectionTile
		let clearListDiv
		let unitEntryButtonTitle
		let unitEntryButtonDisplay
		let unitEntryButtonDisplayUnlocked
		let viewListButtonDisplay
		let pointTotalDisplay
		let unsortedListedUnits = []
		let listedUnits = this.state.listedUnits.sort((a, b) => {
			return ( parseInt(a.unit.order_within_army) - parseInt(b.unit.order_within_army) )
		})
		let listedUnitTileDisplay

		if (this.state.magicItemsVisible === true) {
			magicItemSelectionTile =
				<div className={style['unit-option-selection-tile']}>
					<MagicItemSelectionTile
						unitObject={this.state.unitBeingGivenOption}
						selectedMagicItems={this.state.selectedMagicItems}
						toggleMagicItems={this.toggleMagicItems}
					/>
				</div>
		}

		if (this.state.selectedArmy === '') {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'visible'
			clearListDiv =
				<div className={style['clear-list-div']}>
					<span onClick={this.clearList} className={style['clear-or-cancel-label']}>Clear List</span>
				</div>
			unitEntryButtonTitle = 
				<div className={style['unit-entry-button-title-bar-wmr']}>
					<h3 className={style['unit-entry-button-title']}>Available Units</h3>
				</div>

			let units = this.props.units.sort((a, b) => {
				return ( parseInt(a.order_within_army) - parseInt(b.order_within_army) )
			})
			let unitsInArmy = []
			for (i = 0; i < units.length; i++) {	
				if (parseInt(units[i].wmr_army_id) === parseInt(selectedArmy.id)) {
					unitsInArmy.push(units[i])
				}
			}
			unitEntryButtonDisplay = unitsInArmy.map(unit => {
				return (
					<UnitEntryButton
						key={parseInt(unit.id)}
						id={parseInt(unit.id)}
						unit={unit}
						addUnitToList={this.addUnitToList}
					/>
				)			
			})

			pointTotalDisplay =
				<div className={style['point-total']}>
					Points: <span className={style['bold']}>{this.state.pointTotal}</span><br />
					Unit Count: <span className={style['bold']}>{this.state.listedUnits.length}</span>
				</div>

			listedUnitTileDisplay = listedUnits.map(unitObject => {
				return (
					<div
						key={unitObject.index}
						id={unitObject.index}
						className={style['list-output-side-row']}
					>
						<div className={style['list-entry-div']}>
							<MagicItemIcon
								key={unitObject.index + 20000}
								id={parseInt(unitObject.unit.id)}
								unitObject={unitObject}
								updateUnitBeingGivenMagicItem={this.updateUnitBeingGivenMagicItem}
							/>
						</div>
						<div className={style['spacer-div']}>_</div>
						<UnitEntryNameTile
							key={unitObject.index}
							id={unitObject.index}
							unitObject={unitObject}
							selectedMagicItems={this.state.selectedMagicItems}
							removeMagicItem={this.removeMagicItem}
							removeUnitFromList={this.removeUnitFromList}
						/>
					</div>
				)
			})

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
		}



		let listOutputSide =
			<div>
				{pointTotalDisplay}<br />
				{listedUnitTileDisplay}
				{viewListButtonDisplay}
			</div>

		let display =
			<div id="hidden-section-id" className={displayNoneBottom}>
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
								<h3 className={style['list-title']}>{this.state.selectedArmy.display_name}</h3>
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

		return (
			<div>
				<div
					id="everything-except-print-section-id"
					className={style['everything-except-print-section']}
				>
					<div id="army-dropdown-section-id" className={style['army-dropdown-section']}>
						<div className={style['to-main-page-link']}>
							<span className={style['to-main-page-link-label']}>
								<Link to="/">-- Good Army Lists --</Link>
							</span>
						</div>
						<div className={style['main-title-box-wmr']}>
							<h2 className={style['main-title']}>Make a Good Warmaster Reform List</h2>
						</div>
						<div className={style['copyright-notice']}>All content is unofficial and unendorsed by Games Workshop Limited</div>
						<div className={style['css-remover']}>
							<Select
								placeholder="Select Army..."
								options={armyOptions}
								isSearchable={false}
								styles={this.props.dropdownStyle}
								onChange={this.updateSelectedArmy}
							/>
						</div>
					</div>
					<div>{display}</div>
				</div>
				<div id="print-section-id" className={style['print-section']}></div>
			</div>
		)
	}	
}

export default WmrInnerContainer