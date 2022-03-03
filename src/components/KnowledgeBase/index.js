import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TreeMenu, { ItemComponent } from 'react-simple-tree-menu';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import {
	Container, Row, Col, Card
} from 'reactstrap';

import './style.css';

export const KnowledgeBase = ({ app, apiPath, entryPath }) => {
	const { t } = useTranslation();
	const history = useHistory();
	const location = history.location;

	// for React-simple-tree-menu
	const [activeNode, setActiveNode] = useState(null);

	const [text, setText] = useState('');

	// for automatic scrolling up readmes
	const [readmeDiv, setReadmeDiv] = useState(null);
	const [treeData, setTreeData] = useState([]);
	const [index, setIndex] = useState([]);

	const ContentAPI = app.axiosCreate(apiPath);

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
				// set activeNode to null, otherwise it stays the same after redirecting
				setActiveNode(null);
				history.push(getPath(index[0].path));
			} else {
				setActiveNode(r.title);
				getText(r.path);
			}
		}
	}, [index]);

	// update text and active node when location has been changed
	useEffect(() => {
		const r = findNode()
		if (r) {
			getText(r.path);
			setActiveNode(r.title);
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
			app.addAlert("warning", t("KnowledgeBaseContainer|Something went wrong, failed to fetch Knowledge base folder content"));
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
			console.error("Failed to fetch readme: ", e);
			app.addAlert("warning", t("KnowledgeBaseContainer|Something went wrong, Failed to get the article"));
			setText(t("KnowledgeBaseContainer|Content is not loaded"));
		}
		// scroll to the beginning of div
		readmeDiv?.scrollTo({ top: 0 })
	};

	return (
		<Container fluid className="mt-0 pl-0 pt-0 container-fluid-knowledge">
			<Row>
				<Col md={3} className="pr-0 pl-0">
					<Card className="knowledge-sidebar">
						{/* div for the case there is many readmes and scroll is needed */}
						<div className="knowledge-sidebar-inner">
							<h6>{t("KnowledgeBaseContainer|Content")}</h6>
							{activeNode &&
								<TreeMenu
									data={treeData}
									onClickItem={({ key, label, ...props }) => onClick(key)}
									activeKey={activeNode}
									hasSearch={false}
								>
									{({ items }) => (
										<ul>
											{items.map(({key, ...props})=> (
												<ItemComponent
													key={key}
													{...props}
												/>
											))}
										</ul>
									)}
								</TreeMenu>
							}
						</div>
					</Card>
				</Col>
				<Col md={9} className="col-9-react-md">
					<ReactMarkdown className="readme" rehypePlugins={[rehypeRaw]}>{text}</ReactMarkdown>
				</Col>
			</Row>
		</Container>
	)
}
