import React, { useState, useEffect } from "react";
import TreeMenu, { defaultChildren } from 'react-simple-tree-menu';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import {
	Input,
	InputGroup, InputGroupText,
	ButtonDropdown, DropdownToggle,
	DropdownMenu, DropdownItem
} from "reactstrap";
import {types} from "./actions/actions";

export function TreeViewComponent(props) {
	const setChosenPanel = props.setChosenPanel;

	let history = useHistory();
	const { t, i18n } = useTranslation();

	const [isDropdownMenuOpen, setDropdownMenu] = useState(false);

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
			data={props.treeData}
			hasSearch={true}
			openNodes={props.openNodes}
			activeKey={props.configName != "!manage" ? `${props.configType}/${props.configName}` : `${props.configType}`}
			focusKey={props.configName != "!manage" ? `${props.configType}/${props.configName}` : `${props.configType}`}
			onClickItem={({ key, label, ...props }) => {
				onClickItem(key, label);
				setChosenPanel('configurator');
			}}
		>
			{({ search, items }) => (
				<>
					<InputGroup>
						<InputGroupText className="p-0 border-0">
							<ButtonDropdown
								size="sm"
								className="h-100"
								isOpen={isDropdownMenuOpen}
								toggle={() => setDropdownMenu(prev => !prev)}
							>
								<DropdownToggle caret>{t("ASABConfig|Actions")}</DropdownToggle>
								<DropdownMenu>
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
									<DropdownItem onClick={() => setChosenPanel("import")}>
										<i className="cil-cloud-upload mr-2" />
										{t("ASABConfig|Import")}
									</DropdownItem>
								</DropdownMenu>
							</ButtonDropdown>
						</InputGroupText>
						<Input
							bsSize="sm"
							onChange={e => search(e.target.value)}
							placeholder={t("ASABConfig|Search")}
						/>
					</InputGroup>
					{defaultChildren({items})}
				</>
			)}
		</TreeMenu>
	)
}
