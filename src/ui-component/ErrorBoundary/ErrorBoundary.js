import React, { Component } from 'react';

import errorBoundaryImage from '../../assets/images/error/Caution Tape-big.png';
import './errorBoundary.css';

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasErrored: false
		};
	}

	static getDerivedStateFromError(error) {
		return { hasErrored: true };
	}

	componentDidCatch(error, info) {
		console.log(error, info);
	}

	render() {
		if (this.state.hasErrored) {
			return (
				<div className="error-boundary-container">
					<img
						src={errorBoundaryImage}
						alt="یک مشکلی در برنامه به وجود امده است!"
						className="error-boundary-image"
					/>
					<h2 className="error-boundary-text">مشکلی در برنامه به وجود آمده است!</h2>
				</div>
			);
		}
		return this.props.children;
	}
}
