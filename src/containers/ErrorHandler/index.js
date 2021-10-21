import React from 'react';

import ErrorContainer from './ErrorContainer';

class ErrorHandler extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo
		})
	}

	render() {
		if (this.state.errorInfo) {
			return (
				<ErrorContainer
					error={this.state.error}
					errorInfo={this.state.errorInfo}
					isParentError={this.props.isParentError}
				/>
			);
		}
		
		return this.props.children;
	}
}

export default ErrorHandler;
