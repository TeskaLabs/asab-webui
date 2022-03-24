import React from 'react';

import Editor from '@monaco-editor/react';
import { CardBody } from 'reactstrap';

import Export from './Export';

const SwitchPanel = ({ 
	chosenPanel, editor, exportProps,
}) => {

	switch (chosenPanel) {
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