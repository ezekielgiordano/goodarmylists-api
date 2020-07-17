import style from '../../../assets/stylesheets/index.module.css'
import React from 'react'
import UnitEntryNameTileFormatted from './UnitEntryNameTileFormatted'

const FormattedList = props => {

	const copyList = listElement => {
		let range
		let selection
		if (document.body.createTextRange) {
			range = document.body.createTextRange()
			range.moveToElementText(listElement)
			range.select()
		} else {
			if (window.getSelection) {
				selection = window.getSelection()
				range = document.createRange()
    			range.selectNodeContents(listElement)
    			selection.removeAllRanges()
    			selection.addRange(range)
			}
		}
		document.execCommand('copy')
	}

	const printList = listElement => {
		let printSection = document.getElementById('print-section-id')
		printSection.innerHTML = listElement.innerHTML
		window.print()
		printSection.innerHTML = ''
	}

	let listDisplay = props.listedUnits.map(unitObject => {
		return (
			<UnitEntryNameTileFormatted
				key={parseInt(unitObject.unit.id)}
				id={parseInt(unitObject.unit.id)}
				unitObject={unitObject}
				selectedAuxiliaries={props.selectedAuxiliaries}
				selectedMagicItems={props.selectedMagicItems}
			/>
		)
	})

	return (
		<div className={style['formatted-list-box']}>
			<div type="text" className={style['formatted-list']} id="formatted-list-id">
				<div className={style['formatted-list-header']}>
					<div>Army: {props.selectedArmy.name}</div>
					<div>Points: {props.pointTotal}</div>
					<div>Unit Count: {props.unitCount}</div>
					<div>Break Point: {props.breakPoint}</div>
				</div><br />
				{listDisplay}
			</div>
			<hr />		
			<div className={style['formatted-list-buttons']}>
				<span
					onClick={() => copyList(document.getElementById('formatted-list-id'))}
					className={style['formatted-list-button']}
				>
					Copy
				</span>
				<span
					onClick={() => printList(document.getElementById('formatted-list-id'))}
					className={style['formatted-list-button']}
				>
					Print
				</span>
				<span onClick={props.toggleFormattedList} className={style['formatted-list-button']}>
					Close
				</span>
			</div>
		</div>
	)
}

export default FormattedList