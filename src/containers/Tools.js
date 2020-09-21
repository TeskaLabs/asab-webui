import React, { Component } from 'react';

class Tools extends Component {

	/* Example of use

	{"TOOLS":{"Kibana":{"url":127.0.0.1.,"icon":"cib-kibana"}}}

	*/

	constructor(props) {
		super(props);
		this.App = props.app;
		this.Config = props.config;
		this.Navigation = props.navigation;

		this.Navigation.addItem({
			name: "Tools",
			url: "/tools",
			icon: 'cil-puzzle',
		});
	}


	Tool(name,icon,url) {
		return(
			<Col sm={3}>
				<Link href={url} target="_blank"><span className={icon} />{name}</Link>
			</Col>
		);
	}


	render() {
		const config = this.Config.get('TOOLS');
		return (
			{config !== undefined ?
			<React.Fragment>
				<Container>
					{Object.keys(config).map((key, idx) => (
						<Tool key={key} name={key} url={config[key].url} icon={config[key].icon} />
					))}
				</Container>
			</React.Fragment>
			: null;}
		);
	}
}

export default Tools;
