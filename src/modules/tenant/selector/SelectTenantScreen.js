import React from 'react';
import { connect } from 'react-redux';

import {
	Card, CardHeader, CardFooter, CardBody, CardTitle,
	Button, Input
} from 'reactstrap';

function TenantSelectionScreen(props) {

	const selectTenant = (tn) => {
		console.log(tn, "TENANNNT")
	}

	return (
		props.tenants ?
			<div className="text-center animated fadeIn" style={{marginTop: "10%"}}>
				<Input
					type="select"
					name="selectTenant"
					id="selectTenant"
					onClick={(e) => {selectTenant(e.target)}}
					defaultValue={props.current}
				>
					{props.tenants.length > 0 ? props.tenants.map((tenant, idx) => {return(
						<option key={idx}>{tenant}</option>
					)}) : null}
				</Input>
			</div>
		: null
	);
}

function mapStateToProps(state) {
	return {
		tenants: state.tenant.tenants,
		current: state.tenant.current
	}
}

export default connect(mapStateToProps)(TenantSelectionScreen);
