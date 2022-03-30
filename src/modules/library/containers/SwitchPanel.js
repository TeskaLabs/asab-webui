import React from 'react';

import Editor from '@monaco-editor/react';
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