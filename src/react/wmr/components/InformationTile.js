import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'

const InformationTile = props => {
	return (
		<div className={style['information-tile']}>
			<h4 className={style['information-title-wmr']}>{
				props.unitWhoseInformationIsShown.list_name}
			</h4><br />
			<span 
				onClick={props.toggleInformation}
				className={style['clear-or-cancel-label']}
			>
				Back
			</span><br /><br />		
			<div>
				{props.unitWhoseInformationIsShown.special_rules}
			</div>
		</div>
	)
}

export default InformationTile