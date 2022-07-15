import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { TreeMenu } from 'asab-webui';
import { types } from './actions/actions';
import {
	Input,
	InputGroup, InputGroupText,
	ButtonDropdown, DropdownToggle,
	DropdownMenu, DropdownItem
} from "reactstrap";


export function TreeViewComponent(props) {
	const setChosenPanel = props.setChosenPanel;

	let history = useHistory();
	const { t, i18n } = useTranslation();

	const [isDropdownMenuOpen, setDropdownMenu] = useState(false);

	// Obtain resources from state (if available)
	const resources = useSelector(state => state.auth?.userinfo?.resources);
	const resource = "config:admin";

	useEffect(() => {
		if (props.configCreated || props.configRemoved) {
			props.getTree();
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
	}, [props.configCreated, props.configRemoved]);


	// Get the configType and configName from the TreeView menu
	const onClickItem = ({ key }) => {
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
		setChosenPanel('configurator')
	}


	const TreeMenuDropdownMenu = (
		<DropdownMenu>
			{resources ? resources.indexOf(resource) == -1 && resources.indexOf("authz:superuser") == -1 ?
				<DropdownItem
					style={{
						borderBottom: "1px solid #c8ced3",
						borderRadius: 0
					}}
					disabled={true}
				>
					<i className="cil-cloud-download mr-2" />
					{t("ASABConfig|Export")}
				</DropdownItem>
			:
				<a href={`${props.serviceURL}/export`} download className="text-dark dropdown-export-item w-100">
					<DropdownItem
						style={{
							borderBottom: "1px solid #c8ced3",
							borderRadius: 0
						}}
					>
						<i className="cil-cloud-download mr-2" />
						{t("ASABConfig|Export")}
					</DropdownItem>
				</a>
			:
				<DropdownItem
					style={{
						borderBottom: "1px solid #c8ced3",
						borderRadius: 0
					}}
					disabled={true}
				>
					<i className="cil-cloud-download mr-2" />
					{t("ASABConfig|Export")}
				</DropdownItem>
			}
			<DropdownItem
				disabled={resources ? resources.indexOf(resource) == -1 && resources.indexOf("authz:superuser") == -1 : true}
				onClick={() => setChosenPanel("import")}
			>
				<i className="cil-cloud-upload mr-2" />
				{t("ASABConfig|Import")}
			</DropdownItem>
		</DropdownMenu>
	);

	return (
		<TreeMenu
			data={props.treeData}
			hasSearch={true}
			openNodes={props.openNodes}
			onClickItem={onClickItem}
			initialActiveKey={props.configName != "!manage" ? `${props.configType}/${props.configName}` : `${props.configType}`}
			initialFocusKey={props.configName != "!manage" ? `${props.configType}/${props.configName}` : `${props.configType}`}
			hasNodes={false}
			searchOptions={{
				placeholder: t("ASABConfigModule|Search"),
				dropdown: {
					title: t("ASABConfigModule|Actions"),
					children: TreeMenuDropdownMenu
				}
			}}
		/>
	)
}
