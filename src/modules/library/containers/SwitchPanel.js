import React from 'react';

import Editor from 'react-monaco-editor';
import { CardBody } from 'reactstrap';

import Import from './Import';

const SwitchPanel = ({ 
	chosenPanel, setChosenPanel, editor,
	api, app, retrieveAll
}) => {

	switch (chosenPanel) {
		case "import":
			return (
				<Import
					api={api}
					app={app}
					setChosenPanel={setChosenPanel}
					retrieveAll={retrieveAll}
				/>
			)
		default: 
			return (
				<CardBody className="card-body-editor">
					<Editor
						className="editor"
						defaultValue=""
						value={editor.fileContent}
						language={editor.language}
						onChange={editor.editFileContent}
						options={{ readOnly: editor.isReadOnly }}
					/>
				</CardBody>
			);
	}
}

export default SwitchPanel;