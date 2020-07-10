import style from '../../../assets/stylesheets/index.module.css'
import React, { Component } from 'react'
import KowInnerContainer from './KowInnerContainer'

class KowOuterContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			armies: [],
			units: [],
			unitOptions: [],
			artifacts: []
		}
	}

	componentDidMount() {
		fetch('/api/v1/kow_armies')
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

		fetch('/api/v1/kow_units')
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
	
		fetch('/api/v1/kow_unit_options')
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
			this.setState({ unitOptions: body })
		})
		.catch(error => console.error(`Error in fetch: ${error.message}`))

		fetch('/api/v1/kow_artifacts')
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
			this.setState({ artifacts: body })
		})
		.catch(error => console.error(`Error in fetch: ${error.message}`))
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

		return (
			<div id="sections-container-id" className={style['sections-container']}>	
				<KowInnerContainer
					armies={this.state.armies}
					units={this.state.units}
					unitOptions={this.state.unitOptions}
					artifacts={this.state.artifacts}
					dropdownStyle={dropdownStyle}
				/>
			</div>
		)
	}
}

export default KowOuterContainer