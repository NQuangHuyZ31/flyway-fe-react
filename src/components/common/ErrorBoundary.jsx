// src/components/common/ErrorBoundary.jsx
// Error boundary component to catch errors in component tree

import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error,
			errorInfo,
		});

		// Log to error reporting service
		this.props.onError?.(error, errorInfo);

		// Log to console in development
		if (process.env.NODE_ENV === 'development') {
			console.error('ErrorBoundary caught an error:', error, errorInfo);
		}
	}

	handleReset = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
		this.props.onReset?.();
	};

	render() {
		if (this.state.hasError) {
			return (
				<div className="error-boundary">
					<div className="error-boundary-content">
						<div className="error-boundary-icon">⚠️</div>
						<h1 className="error-boundary-title">
							{this.props.title || 'Something went wrong'}
						</h1>
						<p className="error-boundary-message">
							{this.props.message ||
								'An unexpected error occurred in the application.'}
						</p>

						{process.env.NODE_ENV === 'development' && (
							<details className="error-boundary-details">
								<summary>Error Details</summary>
								<pre className="error-boundary-trace">
									{this.state.error &&
										this.state.error.toString()}
									{this.state.errorInfo &&
										this.state.errorInfo.componentStack}
								</pre>
							</details>
						)}

						<div className="error-boundary-actions">
							<button
								className="error-boundary-btn"
								onClick={this.handleReset}
							>
								Try Again
							</button>
							{this.props.showHome && (
								<a href="/" className="error-boundary-link">
									Go to Home
								</a>
							)}
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
	onError: PropTypes.func,
	onReset: PropTypes.func,
	title: PropTypes.string,
	message: PropTypes.string,
	showHome: PropTypes.bool,
};

ErrorBoundary.defaultProps = {
	showHome: true,
};

export default ErrorBoundary;
