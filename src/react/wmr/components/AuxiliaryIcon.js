import style from '../../../assets/stylesheets/index.module.css'
import cog from '../../../assets/images/cog.ico'
// import white_square from '../../../assets/images/white_square.png'
import React from 'react'

const AuxiliaryIcon = props => {
	let display
	if (
		props.unitObject.unit.can_have_aux === true ||
		props.unitObject.unit.can_have_aux === 't'
	) {
		display =
			<span
				onClick={() => props.updateUnitBeingGivenAuxiliary(props.unitObject)}
				className={style['cog']}
			>
				<img src={cog} alt="" width={"20"} height={"20"} />
			</span>	
	} else {
		display = <span className={style['removed-cog']}>{'_'}</span>
	}

	return (
		<span>{display}</span>
	)
}

export default AuxiliaryIcon