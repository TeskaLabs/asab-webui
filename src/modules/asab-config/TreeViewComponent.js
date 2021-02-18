import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TreeMenu from 'react-simple-tree-menu';
import { useHistory } from "react-router-dom";

import {
	Container,
	Col, Row,
	Button,
	ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
	Card, CardBody, CardHeader, CardFooter, CardTitle, CardSubtitle,
	Collapse,
	Form, FormGroup, FormText, Input, Label
} from "reactstrap";

import './treeview.css';


export function TreeViewComponent(props) {
	let App = props.app;
	// Retrieve the ASAB_CONFIG_URL from config file
	let services = App.Config.get('SERVICES');
	let url = services?.asabconfig ? services.asabconfig : 'asab-config';
	const Axios = App.axiosCreate(url);
	let history = useHistory();

	const [ typeList, setTypeList ] = useState([]);
	const [ treeList, setTreeList ] = useState({});
	const [ treeData, setTreeData ] = useState({});

	// To get the full overview on schemas and configs it is needed to update the tree list and data state
	useEffect(() => {
		getTypes();
	}, []);

	useEffect(() => {
		getTree();
	}, [typeList])

	useEffect(() => {
		getChart();
	}, [treeList]);

	// Obtain list of types
	const getTypes = async () => {
		try {
			let response = await Axios.get("/type");
			setTypeList(response.data);
			// TODO: validate responses which are not 200
		}
		catch {
			App.addAlert("warning", `Unable to get types`);
			return;
			// TODO: Prepared for i18n
			// App.addAlert("warning", t(`Unable to get types: `, { error: error.toString() }));
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
			let response = await Axios.get("/config/" + typeId);
			// TODO: validate responses which are not 200
			tree[typeId] = response.data
			return tree;
		}
		catch {
			App.addAlert("warning", `Unable to get ${typeId} data`);
			return;
			// TODO: Prepared for i18n
			// App.addAlert("warning", t(`Unable to get ${typeId} data: `, { error: error.toString() }));
		}
	}

	// Handle treeList to obtain the structure to render the tree
	const getChart = () => {
		let dataChart = [];
		Object.values(treeList).map((element, idx) => {
			addTreeStructure(element, dataChart);
		});
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

	// Get the configType and configName from the TreeView menu
	const onClickItem = (key, label) => {
		// TODO: Update for multilevel tree structure
		let splitKey = key.split("/");
		if (splitKey.length > 1) {
			props.onTreeClick(splitKey[0], splitKey[1])
			// Push params to the URL
			let params = `configType=${splitKey[0]}&configName=${splitKey[1]}`;
			history.push({
				search: params
			})
		}
	}


	return (
		<React.Fragment>
			<TreeMenu
				data={treeData}
				hasSearch={false}
				onClickItem={({ key, label, ...props }) => {
					onClickItem(key, label)
				}}
			>
			</TreeMenu>
		</React.Fragment>
		)
}
