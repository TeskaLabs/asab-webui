import React from 'react';
import { useSelector } from 'react-redux';

import Editor from '@monaco-editor/react';
import { CardBody, Row, Col } from 'reactstrap';

import Disable from './Disable';
import Export from './Export';

const SwitchPanel = ({ 
	chosenPanel, editor, switchFileState,
	exportProps, activeNode
}) => {
	const tenants = useSelector(state => state.tenant.tenants);

	switch (chosenPanel) {
		case "disable":
			return (
				<CardBody>
					<Row>
						<Col>
							<h5>Disable <span className="text-danger"> {activeNode.name}</span></h5>
						</Col>
					</Row>
					<hr />
					{tenants.map(tenant => 
						<Disable
							tenant={tenant}
							switchFileState={switchFileState}
						/>
					)}
				</CardBody>
			);
		case "export":
			return (
				<Export {...exportProps} />
			)
		default: 
			return (
				<CardBody className="card-body-editor">
					<Editor
						height="100%"
						width="100%"
						className="editor"
						value={editor.fileContent}
						defaultValue=""
						language={editor.language}
						onChange={editor.editFileContent}
						options={{ readOnly: editor.isReadOnly }}
					/>
				</CardBody>
			);
	}
}

export default SwitchPanel;