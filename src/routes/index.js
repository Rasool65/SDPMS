import React, { Suspense, lazy, Fragment } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import Loader from '../ui-component/extended/Loader/Loader';

import MainLayout from '../layout/MainLayout';
import MinimalLayout from '../layout/MinimalLayout';
import ErrorBoundary from '../ui-component/ErrorBoundary/ErrorBoundary';

const DashboardDefault = lazy(() => import('../views/dashboard/Default'));
const PageNotFoundScreen = lazy(() => import('../views/pageNotFoundScreen/PageNotFoundScreen'));
const ConnectionCheckScreen = lazy(() => import('../views/connectionCheck/ConnectionCheckScreen'));
const ChangePasswordScreen = lazy(() => import('../views/pages/authentication/change-password/ChangePasswordScreen'));

const AuthLogin3 = lazy(() => import('../views/pages/authentication/authentication3/Login3'));
const ResetPasswordScreen = lazy(() => import('../views/pages/authentication/reset-password/ResetPasswordScreen'));
const CheckUserEmailScreen = lazy(() =>
	import('../views/pages/authentication/check-user-email-screen/CheckUserEmailScreen')
);

const Routes = () => {
	// چک کردن لاگین بودن کاربر
	const { userInfo } = useSelector((state) => state.userLogin);

	return (
		<Fragment>
			{/* مسیر های مربوط به لای اوت اصلی */}
			<AnimatePresence>
				<Switch>
					<Route exact path={[ '/', '/connection', '/user/Changepassword' ]}>
						<MainLayout>
							<ErrorBoundary>
								<Suspense fallback={<Loader />}>
									<Switch>
										{/* مسیر مربوط به صفحه داشبورد */}
										<Route
											path="/"
											exact
											render={() =>
												userInfo ? <DashboardDefault /> : <Redirect to="/user/login" />}
										/>
										{/*مسیر مربوط به تست ارتباط با سرور*/}
										<Route
											path="/connection"
											render={() =>
												userInfo ? <ConnectionCheckScreen /> : <Redirect to="/user/login" />}
										/>
										{/*مسیر مربوط به تغییر رمز ورود */}
										<Route
											path="/user/changepassword"
											render={() =>
												userInfo ? <ChangePasswordScreen /> : <Redirect to="/user/login" />}
										/>
									</Switch>
								</Suspense>
							</ErrorBoundary>
						</MainLayout>
					</Route>

					{/* مسیر های مربوط به لای اوت مینیمال */}
					<Route exact path={[ '/user/login', '/user/resetpassword', '/user/forgetpassword' ]}>
						<MinimalLayout>
							<ErrorBoundary>
								<Suspense fallback={<Loader />}>
									<Switch>
										{/* مسیر مربوط به صفحه لاگین کاربر */}
										<Route
											path="/user/login"
											render={() => (userInfo ? <Redirect to="/" /> : <AuthLogin3 />)}
										/>
										{/* مسیر مربوط به صفحه ریست پسورد */}
										<Route
											path="/user/resetpassword"
											render={() => (userInfo ? <Redirect to="/" /> : <ResetPasswordScreen />)}
										/>
										{/* مسیر مربوط به صفحه فراموشی پسورد */}
										<Route
											path="/user/forgetpassword"
											render={() => (userInfo ? <Redirect to="/" /> : <CheckUserEmailScreen />)}
										/>
									</Switch>
								</Suspense>
							</ErrorBoundary>
						</MinimalLayout>
					</Route>

					{/* مسیر مربوط به پیدا نشدن صفحه  */}
					<Suspense fallback={<Loader />}>
						<Route render={() => (!userInfo ? <Redirect to="/user/login" /> : <PageNotFoundScreen />)} />
					</Suspense>
				</Switch>
			</AnimatePresence>
		</Fragment>
	);
};

export default Routes;
