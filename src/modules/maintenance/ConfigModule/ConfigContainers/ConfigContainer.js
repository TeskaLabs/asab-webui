import React, { useState, useEffect } from "react";

import {
	Container, Col, Row,
	Card, CardBody
} from "reactstrap";

import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { TreeViewComponent } from "./TreeViewComponent";
import ConfigEditor from "./ConfigEditor";
import ConfigList from "./ConfigList";
import ConfigImport from "./ConfigImport";

function ConfigContainer(props) {

	const ASABConfigAPI = props.app.axiosCreate('asab_config');
	const serviceURL = props.app.getServiceURL('asab_config');
	const { t } = useTranslation();

	const configType = props.match.params.configType;
	const configName = props.match.params.configName;

	const homeScreenImg = props.app.Config.get('brand_image').full;
	const homeScreenAlt = props.app.Config.get('title');

	const [ treeData, setTreeData ] = useState({}); // Set complete data for TreeViewComponent
	const [ createConfig, setCreateConfig ] = useState(false); // Use for condition to render components
	const [ chosenPanel, setChosenPanel ] = useState("configurator"); // Sets the condition for showing the ConfigImport component
	const [ typeList, setTypeList ] = useState([]); // Set data name of type for group configuration
	const [ treeList, setTreeList ] = useState({}); // Set cleaned data for trigger UseEffect for updating TreeViewComponent, and for render the tree
	const [ openNodes, setOpenNodes ] = useState([]); // Set open nodes in the TreeMenu


	// To get the full overview on schemas and configs it is needed to update the tree list and data state
	useEffect(() => {
		getTypes();
	}, []);

	useEffect(() => {
		if (typeList.length > 0) {
			getTree();
		}
	}, [typeList])

	useEffect(() => {
		getChart();
	}, [treeList]);


	// Obtain list of types
	// TODO: add Error Card screen when no types are fetched
	const getTypes = async () => {
		try {
			let response = await ASABConfigAPI.get("/type");
			if (response.data.result != 'OK') {
				throw new Error("Unable to get data for tree menu");
			}
			// Sort data
			let sortedData = response.data.data;
			sortedData = sortedData.sort();
			setTypeList(sortedData);
			// TODO: validate responses which are not 200
		}
		catch(e) {
			console.error(e);
			props.app.addAlert("warning", `${t("ASABConfig|Unable to get data for tree menu")}. ${e?.response?.data?.message}`, 30);
			return;
		}
	}

	// Obtain the list of configs parsed to the type key
	const getTree = async () => {
		let tree = await Promise.all(typeList.map(t => getConfigs(t)));
		setTreeList(tree);
	}


	const getConfigs = async (typeId) => {
		let tree = {};
		try {
			let response = await ASABConfigAPI.get("/config/" + typeId);
			if (response.data.result == 'OK'){
				// Sort data
				let sortedData = response.data.data;
				if (sortedData != undefined) {
					sortedData = sortedData.sort();
					tree[typeId] = sortedData;
				}
			}
			return tree;
		}
		catch(e) {
			console.error(e);
			props.app.addAlert("warning", `${t("ASABConfig|Unable to get schema. Try to reload the page", {type: typeId})}. ${e?.response?.data?.message}`, 30);
			return;
		}
	}

	// Handle treeList to obtain the structure to render the tree
	const getChart = () => {
		let dataChart = [];
		Object.values(treeList).map((element, idx) => {
			addTreeStructure(element, dataChart);
		});
		let nodes = [];
		dataChart.map(node => {
			nodes.push(node.key)
		});
		setOpenNodes(nodes);
		setTreeData(dataChart);
	}


	const addTreeStructure = (element, dataChart) => {
		if (typeof element === 'object' && element !== null) {
			Object.keys(element).map((key) => {
				var obj = {
					type: "folder", // this is not needed yet, but it might be useful for icons
					key: key,
					label: key,
					nodes: []
				};
				dataChart.push(obj);

				var index = dataChart.indexOf(obj);
				if (element[key] != undefined) {
					element[key].map((e) => {
						if (typeof e === "object" && e !== null) {
							addTreeStructure(e, dataChart[index].nodes);
						} else if (typeof e === "string" && e !== null) {
							var strObj = {
								type: "file", // this is not needed yet, but it might be useful for icons
								key: e,
								label: e
							};
							dataChart[index].nodes.push(strObj);
						}
					})
				}
			})
		} else if (element !== undefined) {
			dataChart.push(
				{
					type: "file", // this is not needed yet, but it might be useful for icons
					key: element,
					label: element,
				}
			);
		}
	}


	// Render function
	return (
		<Container fluid className="config-container animated fadeIn">
			<Row className="ml-0 h-100">
				<Col xs="3" sm="3" className="h-100">
					<TreeViewComponent
						serviceURL={serviceURL}
						openNodes={openNodes}
						treeData={treeData}
						setTreeData={setTreeData}
						setChosenPanel={setChosenPanel}
						app={props.app}
						configCreated={props.config_created}
						configRemoved={props.config_removed}
						setCreateConfig={setCreateConfig}
						configType={configType}
						configName={configName}
						getTree={getTree}
					/>
				</Col>
				<Col xs="8" sm="8" className="h-100">
					{chosenPanel != 'import' ?
						configType != '$' && configName != '$' ?
							configName != '!manage' && createConfig == false ?
								<ConfigEditor
									app={props.app}
									configType={configType}
									configName={configName}
								/>
							:
								<ConfigList
									app={props.app}
									configType={configType}
									createConfig={createConfig}
									setCreateConfig={setCreateConfig}
								/>
						:
							<Card>
								<CardBody className="text-center">
									<img
										src={homeScreenImg}
										alt={homeScreenAlt}
										style={{maxWidth: "38%"}}
									/>
									<h4>{t('ASABConfig|Nothing has been selected')}</h4>
									<h6>{t('ASABConfig|Please select the configuration from tree menu on the left side of the screen')}</h6>
								</CardBody>
							</Card>
					:
						<ConfigImport
							setChosenPanel={setChosenPanel}
							app={props.app}
							getTree={getTree}
							configImported={props.config_imported}
						/>
					}
				</Col>
			</Row>
		</Container>
	)
}

function mapStateToProps(state) {
	return {
		config_created: state.asab_config.config_created,
		config_removed: state.asab_config.config_removed,
		config_imported: state.asab_config.config_imported
	}
}

export default connect(mapStateToProps)(ConfigContainer);
