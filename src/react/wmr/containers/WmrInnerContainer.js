import style from '../../../assets/stylesheets/index.module.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import EmpireContainer from './EmpireContainer'
import TombKingsContainer from './TombKingsContainer'
import ChaosContainer from './ChaosContainer'
import OrcsContainer from './OrcsContainer'
import HighElvesContainer from './HighElvesContainer'
import DwarfsContainer from './DwarfsContainer'
import SkavenContainer from './SkavenContainer'
import LizardmenContainer from './LizardmenContainer'
import BretonniaContainer from './BretonniaContainer'
import KislevContainer from './KislevContainer'
import DarkElvesContainer from './DarkElvesContainer'
import DemonsContainer from './DemonsContainer'
import ArabyContainer from './ArabyContainer'
import VampireCountsContainer from './VampireCountsContainer'
import DogsOfWarContainer from './DogsOfWarContainer'
import OgreKingdomsContainer from './OgreKingdomsContainer'
import AlbionContainer from './AlbionContainer'
import GoblinsContainer from './GoblinsContainer'
import WitchHuntersContainer from './WitchHuntersContainer'
import ChaosDwarfsContainer from './ChaosDwarfsContainer'
import WoodElvesContainer from './WoodElvesContainer'
import BeastmenContainer from './BeastmenContainer'
import NorseContainer from './NorseContainer'

class WmrInnerContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedArmy: ''
		}
		this.updateSelectedArmy = this.updateSelectedArmy.bind(this)
		this.calculatePointTotal = this.calculatePointTotal.bind(this)
		this.calculateUnitCount = this.calculateUnitCount.bind(this)
		this.calculateBreakPoint = this.calculateBreakPoint.bind(this)
		this.calculateMaximumCount = this.calculateMaximumCount.bind(this)
	}

	updateSelectedArmy(army) {
		this.setState({ selectedArmy: army.value })
	}

	calculatePointTotal(unitArray, auxiliaryArray, magicItemArray) {
		let pointTotal = 0
		let i2
		for (i2 = 0; i2 < unitArray.length; i2++) {
			pointTotal += (parseInt(unitArray[i2].unit.points) * parseInt(unitArray[i2].count))
		}
		for (i2 = 0; i2 < auxiliaryArray.length; i2++) {
			pointTotal += parseInt(auxiliaryArray[i2].auxiliary.points) * auxiliaryArray[i2].count
		}			
		for (i2 = 0; i2 < magicItemArray.length; i2++) {
			pointTotal += parseInt(magicItemArray[i2].magicItem.points)
		}			
		return pointTotal
	}

	calculateUnitCount(array) {
		let count = 0
		let i2
		for (i2 = 0; i2 < array.length; i2++) {
			count += array[i2].count
		}
		return count
	}

	calculateBreakPoint(unitArray, auxiliaryArray) {
		let breakPoint = 0
		let i2
		for (i2 = 0; i2 < unitArray.length; i2++) {
			if (
				unitArray[i2].unit.unit_type !== 'General' &&
				unitArray[i2].unit.unit_type !== 'Hero' &&
				unitArray[i2].unit.unit_type !== 'Wizard'
			) {
				breakPoint += unitArray[i2].count
			}
		}
		for (i2 = 0; i2 < auxiliaryArray.length; i2++) {
			if (auxiliaryArray[i2].auxiliary.special_rules.includes('not independent')) {
				breakPoint += auxiliaryArray[i2].count
			}
		}
		return breakPoint
	}

	calculateMaximumCount(pointTotal) {
		let maximumCount
		if (pointTotal < 2000) {
			maximumCount = 1
		} else {
			let calculation = (pointTotal / 1000).toFixed(20)
			maximumCount = Math.floor(calculation)
		}
		return maximumCount
	}				

	render() {
		document.body.style.overflow = 'hidden'
		let selectedArmy = this.state.selectedArmy
		let armyOptions = []
		let labeledArmy
		let i
		for (i = 0; i < this.props.armies.length; i++) {
			labeledArmy = { value: this.props.armies[i], label: this.props.armies[i].display_name }
			armyOptions.push(labeledArmy)
		}
		
		let display
		if (selectedArmy.display_name === 'The Empire') {
			display =
				<EmpireContainer
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Tomb Kings') {
			display =
				<TombKingsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Chaos') {
			display =
				<ChaosContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Orcs') {
			display =
				<OrcsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'High Elves') {
			display =
				<HighElvesContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Dwarfs') {
			display =
				<DwarfsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Skaven') {
			display =
				<SkavenContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Lizardmen') {
			display =
				<LizardmenContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Bretonnia') {
			display =
				<BretonniaContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Kislev') {
			display =
				<KislevContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Dark Elves') {
			display =
				<DarkElvesContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Demons') {
			display =
				<DemonsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Araby') {
			display =
				<ArabyContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Vampire Counts') {
			display =
				<VampireCountsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Dogs of War') {
			display =
				<DogsOfWarContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Ogre Kingdoms') {
			display =
				<OgreKingdomsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Albion') {
			display =
				<AlbionContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Goblins') {
			display =
				<GoblinsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Witch Hunters') {
			display =
				<WitchHuntersContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Chaos Dwarfs') {
			display =
				<ChaosDwarfsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Albion') {
			display =
				<AlbionContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Wood Elves') {
			display =
				<WoodElvesContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Beastmen') {
			display =
				<BeastmenContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}
		if (selectedArmy.display_name === 'Norse') {
			display =
				<NorseContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					calculatePointTotal={this.calculatePointTotal}
					calculateUnitCount={this.calculateUnitCount}
					calculateBreakPoint={this.calculateBreakPoint}
					calculateMaximumCount={this.calculateMaximumCount}
				/>
		}

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
							<h2 className={style['main-title']}>Make a Good Warmaster List</h2>
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