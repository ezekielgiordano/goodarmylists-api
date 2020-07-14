import style from '../../../assets/stylesheets/index.module.css'
import paypal from '../../../assets/images/paypal.gif'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import EmpireContainer from './EmpireContainer'

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
				let displayNoneBottom
		if (selectedArmy === '') {
			displayNoneBottom = style['display-none']
		} else {
			displayNoneBottom = ''
		}
		
		let display
		if (this.state.selectedArmy.display_name === 'The Empire') {
			display =
				<EmpireContainer 
					selectedArmy={this.state.selectedArmy}
					units={this.props.units}
					auxiliaries={this.props.auxiliaries}
					magicItems={this.props.magicItems}
					addUnit={this.addUnit}
					removeUnit={this.removeUnit}
					addAuxiliary={this.addAuxiliary}
					removeAuxiliary={this.removeAuxiliary}
					addMagicItem={this.addMagicItem}
					removeMagicItem={this.removeMagicItem}
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