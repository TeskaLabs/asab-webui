import React from 'react';

import ErrorContainer from './ErrorContainer';

class ErrorHandler extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null, datetime: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
			datetime: new Date()
		})
	}

	render() {
		if (this.state.errorInfo) {
			return (
				<ErrorContainer
					error={this.state.error}
					errorInfo={this.state.errorInfo}
					datetime={this.state.datetime}
					isParentError={this.props.isParentError}
				/>
			);
		}
		
		return this.props.children;
	}
}

export default ErrorHandler;
