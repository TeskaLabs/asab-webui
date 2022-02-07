import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from "react-router-dom";

import {
	Button,
	Card, CardBody, CardHeader, CardFooter,
	Form, FormGroup, FormText, Input, Label
} from "reactstrap";

import {types} from './actions/actions';

import { DataTable } from 'asab-webui';

export default function ConfigList(props) {
	const { register, handleSubmit, getValues, formState: { errors, isSubmitting }, reset } = useForm();
	const { t, i18n } = useTranslation();
	const ASABConfigAPI = props.app.axiosCreate('asab_config');
	let history = useHistory();

	const [ configList, setConfigList ] = useState([]);

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
		}

	];


	// Load data and set up the data for form struct
	const initialLoad = async () => {
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
		}))

		setConfigList(cfgList);
	}

	return(
		<DataTable
			title={{ text: t("ASABConfig|Manage") + ` ${configType}`, icon: "cil-settings" }}
			headers={headers}
			data={configList}
			// count={count}
			// limit={limit}
			// currentPage={page}
			// setPage={setPage}
			// search={{ icon: 'cil-magnifying-glass', placeholder: t("CredentialsListContainer|Search") }}
			// onSearch={onSearch}
			// customComponent={createCredentialsComponent}
			// customRowClassName={suspendRow}
		/>
	)
}
