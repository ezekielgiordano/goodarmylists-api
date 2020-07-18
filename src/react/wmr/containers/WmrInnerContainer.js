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
	}

	updateSelectedArmy(army) {
		this.setState({ selectedArmy: army.value })
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
				/>
		}
		if (selectedArmy.display_name === 'Tomb Kings') {
			display =
				<TombKingsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Chaos') {
			display =
				<ChaosContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Orcs') {
			display =
				<OrcsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'High Elves') {
			display =
				<HighElvesContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Dwarfs') {
			display =
				<DwarfsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Skaven') {
			display =
				<SkavenContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Lizardmen') {
			display =
				<LizardmenContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Bretonnia') {
			display =
				<BretonniaContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Kislev') {
			display =
				<KislevContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Dark Elves') {
			display =
				<DarkElvesContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Demons') {
			display =
				<DemonsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Araby') {
			display =
				<ArabyContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Vampire Counts') {
			display =
				<VampireCountsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Dogs of War') {
			display =
				<DogsOfWarContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Ogre Kingdoms') {
			display =
				<OgreKingdomsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Albion') {
			display =
				<AlbionContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Goblins') {
			display =
				<GoblinsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Witch Hunters') {
			display =
				<WitchHuntersContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Chaos Dwarfs') {
			display =
				<ChaosDwarfsContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Albion') {
			display =
				<AlbionContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Wood Elves') {
			display =
				<WoodElvesContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Beastmen') {
			display =
				<BeastmenContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
				/>
		}
		if (selectedArmy.display_name === 'Norse') {
			display =
				<NorseContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
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