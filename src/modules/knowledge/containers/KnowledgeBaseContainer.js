import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TreeMenu } from 'asab-webui';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useSelector } from 'react-redux';

import {
	Container, Row, Col
} from 'reactstrap';


const KnowledgeBaseContainer = (props) => {
	return (
		<KnowledgeBase
			props={props}
			apiPath="content"
			entryPath="/knowledge/index.json"
		/>
	);
}

export default KnowledgeBaseContainer;


export const KnowledgeBase = ({ props, apiPath, entryPath }) => {
	const { t } = useTranslation();
	const history = useHistory();
	const location = history.location;

	const [text, setText] = useState('');

	// for automatic scrolling up readmes
	const [readmeDiv, setReadmeDiv] = useState(null);
	const [treeData, setTreeData] = useState([]);
	const [index, setIndex] = useState([]);

	const theme = useSelector(state => state.theme);

	const ContentAPI = props.app.axiosCreate(apiPath);

	useEffect(() => {
		setReadmeDiv(document.querySelector(".readme"));
		getRegistry();
	}, [])

	// set initial readme when first visiting the page
	useEffect(() => {
		// redirect to the first readme when first visiting /knowledge
		if (index.length !== 0) {
			const r = findNode();
			// if not right path, redirect to the first readme
			if (r === undefined) {
				history.push(getPath(index[0].path));
			} else {
				getText(r.path);
			}
		}
	}, [index]);

	// update text and active node when location has been changed
	useEffect(() => {
		const r = findNode()
		if (r) {
			getText(r.path);
		}
	}, [location])

	const findNode = () => index.find(item => item.path === location.pathname + '.md');

	// Get content of index.json file from public folder and set it for displaying
	const getRegistry = async () => {
		try {
			let response = await ContentAPI.get(entryPath);
				// make array from json file of titles and paths
				const tree = [];
				// for React-simple-tree-menu - create an array of objects
				for(let item of response.data) {
					let obj = {};
					obj["key"] = item.title;
					obj["label"] = item.title;
					tree.push(obj);
				}
				setIndex(response.data);
				setTreeData(tree);
		} catch(e) {
			console.error(e);
			props.app.addAlert("warning", `${t("KnowledgeBase|Something went wrong, failed to fetch Knowledge base folder content")}. ${e?.response?.data?.message}`, 30);
		}
	}

	// function that returns path if there is no readme chosen or the readme on the path doesn't exist
	const getPath = (str) => {
		// `str.length - 3` for '.md'
		const nextPath = str.slice(0, str.length - 3);
		return nextPath;
	}

	const onClick = (title) => {
		const r = index.find(item => item.title === title);
		if (location.pathname !== getPath(r.path)) {
			history.push(getPath(r.path));
		}
	}

	const getText = async (path) => {
		// fetch readme from public folder
		try {
			const response = await ContentAPI.get(path);
			setText(response.data);
		} catch(e) {
			console.error("Failed to fetch article: ", e);
			props.app.addAlert("warning", `${t("KnowledgeBase|Something went wrong, failed to get the article")}. ${e?.response?.data?.message}`, 30);
			setText(t("KnowledgeBase|There is no article of that name and path"));
		}
		// scroll to the beginning of div
		readmeDiv?.scrollTo({ top: 0 })
	};

	return (
		<Container fluid className="h-100 knowledge-container">
			<Row className="ms-0 me-3 h-100">
				<Col xs="3" sm="3" className="h-100">
					<TreeMenu
						data={treeData}
						onClickItem={({ key, label, ...props }) => onClick(key)}
						hasSearch={false}
						hasNodes={false}
					/>
				</Col>
				<Col xs="9" sm="9">
					<ReactMarkdown className={`readme${theme == "dark" ? " readme-dark" : ""}`} rehypePlugins={[rehypeRaw]}>{text}</ReactMarkdown>
				</Col>
			</Row>
		</Container>
	)
}
