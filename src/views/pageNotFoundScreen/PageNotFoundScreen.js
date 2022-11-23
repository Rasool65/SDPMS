import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFoundScreen.scss';

const PageNotFoundScreen = () => {
	return (
		<div className="page-not-found-screen-container">
			<h1 className="page-not-found-screen-title">صفحه مورد نظر پیدا نشد | 404 </h1>
			<p className="page-not-found-screen-description">
				برای بازگشت به صفحه نخست بر روی{' '}
				<Link to="/" className="page-not-found-screen-link">
					اینجا
				</Link>{' '}
				کلیک کنید.
			</p>
		</div>
	);
};

export default PageNotFoundScreen;
