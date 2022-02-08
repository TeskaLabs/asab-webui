import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from "react-router-dom";
import { connect } from 'react-redux';

import {
	Button,
	Card, CardBody, CardHeader, CardFooter,
	Form, FormGroup, FormText, Input, Label
} from "reactstrap";

import {types} from './actions/actions';

import { DataTable, ButtonWithAuthz } from 'asab-webui';

function ConfigList(props) {
	const { register, handleSubmit, getValues, formState: { errors, isSubmitting }, reset } = useForm();
	const { t, i18n } = useTranslation();
	const ASABConfigAPI = props.app.axiosCreate('asab_config');
	let history = useHistory();

	const [ configList, setConfigList ] = useState([]);

	const resourceManageConfig = "authz:superuser";
	const resources = props.userinfo?.resources ? props.userinfo.resources : [];

	const configType = props.configType;

	const regConfigName = register("configName",
		{
			validate: {
				emptyInput: value => (getValues("configName") !== "" || getValues("configNameAdvanced") !== "") || t("ASABConfigModule|Configuration name can't be empty!"),
			}
		});

	// The container will be re-rendered on configType or configName change
	useEffect(() => {
		initialLoad();
	}, [ configType ]);


	const headers = [
		{
			name: t('ASABConfig|Name'),
			customComponent: {
				generate: (obj) => (
					<Link
						to={{
							pathname: `/config/${configType}/${obj.name}`,
						}}>
						{obj.name}
					</Link>
				)
			}
		},
		{
			name: t('ASABConfig|Schema title'),
			key: "schemaTitle"
		},
		{
			name: t('ASABConfig|Schema description'),
			key: "schemaDescription"
		},
		{
			name: ' ',
			customComponent: {
				generate: (obj) => (
					<div className="d-flex justify-content-end">
						<ButtonWithAuthz
							title={t('ASABConfig|Remove') + ` ${obj.name}`}
							color="danger"
							size="sm"
							onClick={(e) => {removeConfigForm(obj.name), e.preventDefault()}}
							resource={resourceManageConfig}
							resources={resources}
						>
							<i className="cil-trash"></i>
						</ButtonWithAuthz>
					</div>
				)
			}
		}

	];


	// Load data and set up the data for form struct
	const initialLoad = async () => {
		props.setCreateConfig(false);
		let data = [];
		let schema = {};
		try {
			let response = await ASABConfigAPI.get(`/config/${configType}`);
			// TODO: validate responses which are not 200
			if (response.data.result == 'FAIL') {
				throw new Error(t(`ASABConfig|Something went wrong! Unable to get configurations`, {type: configType}));
			}
			data = response.data;
		}
		catch(e) {
			console.error(e);
			props.app.addAlert("warning", t(`ASABConfig|Unable to get configurations. Try to reload the page`, {type: configType}));
			return;
		}

		try {
			let response = await ASABConfigAPI.get(`/type/${configType}`);
			// TODO: validate responses which are not 200
			if (response.data.result == 'FAIL') {
				throw new Error(t(`ASABConfig|Something went wrong! Unable to get schema`, {type: configType}));
			}
			schema = response.data;
		}
		catch(e) {
			console.error(e);
			props.app.addAlert("warning", t(`ASABConfig|Unable to get schema. Try to reload the page`, {type: configType}));
			return;
		}

		// Create an array of objects with name, schema title and schema description
		let cfgList = [];
		Promise.all(await data.map(cfg => {
			cfgList.push({name: cfg, schemaTitle: schema?.title, schemaDescription: schema?.description});
		}));
		setConfigList(cfgList);
	}

	const createConfigComponent = (
		<ButtonWithAuthz
			title={t("ASABConfig|Create configuration")}
			color="secondary"
			onClick={(e) => {props.setCreateConfig(true), e.preventDefault()}}
			resource={resourceManageConfig}
			resources={resources}
			size="sm"
		>
			<i className="pr-1">+</i>
			{t("ASABConfig|Create configuration")}
		</ButtonWithAuthz>
	);

	// Confirm message form for configuration removal
	const removeConfigForm = (configName) => {
		var r = confirm(t("ASABConfig|Do you want to remove this configuration?"));
		if (r == true) {
			removeConfig(configName);
		}
	}

	// Remove configuration
	const removeConfig = async (configName) => {
		try {
			let response = await ASABConfigAPI.delete(`/config/${configType}/${configName}`);
			if (response.data.result != "OK"){
				throw new Error(t('ASABConfig|Something went wrong, failed remove configuration'));
			}
			props.app.Store.dispatch({
				type: types.CONFIG_REMOVED,
				config_removed: true
			});
			initialLoad();
		} catch(e) {
			console.error(e);
			props.app.addAlert("warning", t('ASABConfig|Something went wrong, failed to remove configuration'));
		}
	}

	return(
		props.createConfig ?
			<CreateConfigCard app={props.app} configType={configType} setCreateConfig={props.setCreateConfig} />
		:
			<DataTable
				title={{ text: t("ASABConfig|Manage") + ` ${configType}`, icon: "cil-settings" }}
				headers={headers}
				data={configList}
				limit={99999}
				customComponent={createConfigComponent}
			/>
	)
}

function mapStateToProps(state) {
	return {
		userinfo: state.auth.userinfo
	}
}

export default connect(mapStateToProps)(ConfigList);


function CreateConfigCard(props) {
	const { register, handleSubmit, getValues, formState: { errors, isSubmitting }, reset } = useForm();
	const { t, i18n } = useTranslation();
	const ASABConfigAPI = props.app.axiosCreate('asab_config');
	let history = useHistory();


	const regConfigName = register("configName",
		{
			validate: {
				emptyInput: value => (getValues("configName") !== "" || t("ASABConfigModule|Configuration name can't be empty!")),
			}
		});

	// Parse data to JSON format, stringify it and save to config file
	const onSubmit = async (data) => {
		let configName = data.configName;
		try {
			let response = await ASABConfigAPI.put(`/config/${props.configType}/${configName}`,
				{},
					{ headers: {
						'Content-Type': 'application/json'
						}
					}
				)
			if (response.data.result != "OK"){
				throw new Error(t('ASABConfig|Something went wrong, failed to create configuration'));
			}
			props.setCreateConfig(false);
			props.app.addAlert("success", t('ASABConfig|Configuration created successfully'));
			props.app.Store.dispatch({
				type: types.CONFIG_CREATED,
				config_created: true
			});
			history.push({
				pathname: `/config/${props.configType}/${configName}`
			});
		}
		catch(e) {
			console.error(e);
			props.app.addAlert("warning", t('ASABConfig|Something went wrong, failed to create configuration'));
		}
	}

	return(
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Card className="w-75 offset-md-2">
				<CardHeader>
					<span className="cil-settings pr-2" />
					{props.configType.toString() + ' / ' + t('ASABConfig|New configuration')}
				</CardHeader>
				<CardBody>
					<FormGroup tag="fieldset" disabled={isSubmitting}>
						<Label for="configName">
							{t('ASABConfig|Configuration file name')}
						</Label>
						<Input
							autoFocus
							type="text"
							name="configName"
							id="configName"
							innerRef={regConfigName.ref}
							onChange={regConfigName.onChange}
							onBlur={regConfigName.onBlur}
						/>
						<FormText color={errors.configName ? "danger" : "muted"}>
							{errors.configName ? errors.configName.message : t('ASABConfig|Fill out configuration file name')}
						</FormText>
					</FormGroup>
				</CardBody>
				<CardFooter>
					<Button
						color="primary"
						type="submit"
						disabled={isSubmitting}
					>
						<i className="pr-1">+</i>
						{t('ASABConfig|Create')}
					</Button>
				</CardFooter>
			</Card>
		</Form>
		)
}
