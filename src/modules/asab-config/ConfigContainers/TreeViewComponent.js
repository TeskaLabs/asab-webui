import React, { useState, useEffect } from "react";
import TreeMenu from 'react-simple-tree-menu';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import {types} from './actions/actions';

export function TreeViewComponent(props) {

	let App = props.app;
	// Retrieve the asab config url from config file
	const ASABConfigAPI = App.axiosCreate('asab_config');
	let history = useHistory();
	const { t, i18n } = useTranslation();

	const [ typeList, setTypeList ] = useState([]);
	const [ treeList, setTreeList ] = useState({});
	const [ treeData, setTreeData ] = useState({});
	const [ openNodes, setOpenNodes ] = useState([]); // Set open nodes in the TreeMenu

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

	useEffect(() => {
		if (props.configCreated || props.configRemoved) {
			getTree();
			if (props.configCreated) {
				props.app.Store.dispatch({
					type: types.CONFIG_CREATED,
					config_created: false
				});
			}
			if (props.configRemoved) {
				props.app.Store.dispatch({
					type: types.CONFIG_REMOVED,
					config_removed: false
				});
			}
		}
	}, [props.configCreated, props.configRemoved])

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
			App.addAlert("warning", t(`ASABConfig|Unable to get data for tree menu`));
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
			App.addAlert("warning", t(`ASABConfig|Unable to get schema. Try to reload the page`, {type: typeId}));
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

	// Get the configType and configName from the TreeView menu
	const onClickItem = (key, label) => {
		// TODO: Update for multilevel tree structure
		let splitKey = key.split("/");
		props.setCreateConfig(false);
		if (splitKey.length > 1) {
			// Push params to the URL
			history.push({
				pathname: `/config/${splitKey[0]}/${splitKey[1]}`,
			})
		} else {
			history.push({
				pathname: `/config/${splitKey[0]}/!manage`,
			})
		}
	}

	return (
		<TreeMenu
			data={treeData}
			hasSearch={false}
			openNodes={openNodes}
			activeKey={props.configName != "!manage" ? `${props.configType}/${props.configName}` : `${props.configType}`}
			focusKey={props.configName != "!manage" ? `${props.configType}/${props.configName}` : `${props.configType}`}
			onClickItem={({ key, label, ...props }) => {
				onClickItem(key, label)
			}}
		>
		</TreeMenu>
		)
}
