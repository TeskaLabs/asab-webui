import { lazy } from 'react';

import Module from 'asab-webui/abc/Module';

const KnowledgeBaseContainer = lazy(() => import('./containers/KnowledgeBaseContainer'));

import "./containers/knowledge.scss"

export default class KnowledgeBaseModule extends Module {
	constructor(app, name){
		super(app, "KnowledgeBaseModule");

		app.Router.addRoute({
			path: '/knowledge',
			exact: false,
			name: 'Knowledge Base',
			component: KnowledgeBaseContainer
		});

		app.Router.addRoute({
			path: '/knowledge/:document',
			exact: false,
			name: 'Knowledge Base',
			component: KnowledgeBaseContainer
		});

		app.Navigation.addItem({
			name: 'Knowledge Base',
			url: '/knowledge',
			icon: 'at-star-lightbulb'
		});
	}
}
