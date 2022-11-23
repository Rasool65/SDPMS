import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Alert, Button, FormControl, FormHelperText, Grid, makeStyles, OutlinedInput } from '@material-ui/core';

import useScriptRef from '../../../../hooks/useScriptRef';
import Loading from '../../../../ui-component/loadingComponent/Loading';

//فراخوانی اکشن مربوط به تغییر پسورد
import { checkEmail } from '../../../../actions/user.action';
//فراخوانی کانستنتس مربوط به یوزر
import userConstants from '../../../../constants/user.constants';

const useStyles = makeStyles((theme) => ({
	root: {},
	redButton: {
		fontSize: '1rem',
		fontWeight: 500,
		backgroundColor: theme.palette.grey[50],
		border: '1px solid',
		borderColor: theme.palette.grey[100],
		color: theme.palette.grey[600],
		textTransform: 'none',
		'&:hover': {
			backgroundColor: theme.palette.primary.light
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.875rem'
		}
	},
	signDivider: {
		flexGrow: 1
	},
	signText: {
		cursor: 'unset',
		margin: theme.spacing(2),
		padding: '5px 56px',
		borderColor: theme.palette.grey[100] + ' !important',
		color: theme.palette.grey[900] + '!important',
		fontWeight: 500
	},
	margin: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(1)
	},
	forgot: {
		textDecoration: 'none'
	},
	loginIcon: {
		marginRight: '16px',
		[theme.breakpoints.down('sm')]: {
			marginRight: '8px'
		}
	},
	title: {
		color: theme.palette.grey[600]
	},
	login: {
		backgroundColor: theme.palette.purple.main,
		'&:hover': {
			backgroundColor: theme.palette.purple.dark
		}
	},
	loginput: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		'& > label': {
			top: '23px',
			left: 0,
			color: theme.palette.grey[500],
			'&[data-shrink="false"]': {
				top: '5px'
			}
		},
		'& > div > input': {
			padding: '30.5px 14px 11.5px !important'
		},
		'& legend': {
			display: 'none'
		},
		'& fieldset': {
			top: 0
		}
	},
	startAdornment: {
		color: theme.palette.grey[500],
		marginTop: '18px',
		width: 'auto'
	}
}));

const CheckUserEmailComponent = ({ className, ...rest }) => {
	const classes = useStyles();
	const scriptedRef = useScriptRef();

	const dispatch = useDispatch();
	const history = useHistory();

	// دریافت استیت های مربوط به تغییر پسورد
	const userCheckEmail = useSelector((state) => state.userCheckEmail);
	const { loading, error, success } = userCheckEmail;

	/*در صورتی که عملیات موفقیت امیز بود به صفحه تغییر پسورد رفته 
	 و یک درخواست برای ریست کردن استیت های چک کردن ایمیل ارسال میشود*/
	useEffect(
		() => {
			if (success) {
				setTimeout(() => {
					history.push('/user/resetpassword');
					dispatch({ type: userConstants.USER_CHECK_EMAIL_RESET });
				}, 3000);
			}
		},
		[ success, history, dispatch ]
	);

	return (
		<React.Fragment>
			<Grid container direction="column" justifyContent="center" spacing={2}>
				<Grid item xs={12} container alignItems="center" justifyContent="center">
					{/* نمایش لودینگ و خطا مربوط به بررسی و ارسال ایمیل ریکاوری */}
					<Box mb={2}>
						{loading && <Loading />}
						{error && (
							<div>
								<Alert severity="error">{error}</Alert>
							</div>
						)}
					</Box>
				</Grid>
			</Grid>

			<Formik
				initialValues={{
					username: ''
				}}
				validationSchema={Yup.object().shape({
					username: Yup.string().email('Must be a valid email').max(255).required('Email is required')
				})}
				onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
					try {
						if (scriptedRef.current) {
							//ارسال درخواست برای تغییر پسورد
							dispatch(checkEmail(values));

							setStatus({ success: true });
							setSubmitting(false);
						}
					} catch (err) {
						console.error(err);
						if (scriptedRef.current) {
							setStatus({ success: false });
							setErrors({ submit: err.message });
							setSubmitting(false);
						}
					}
				}}
			>
				{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
					<form noValidate onSubmit={handleSubmit} className={clsx(classes.root, className)} {...rest}>
						<FormControl
							fullWidth
							error={Boolean(touched.username && errors.username)}
							className={classes.loginput}
							variant="outlined"
						>
							<label
								htmlFor="outlined-adornment-email-register"
								style={{ fontSize: '19px', marginBottom: '8px' }}
							>
								نام کاربری / ایمیل
							</label>
							<OutlinedInput
								id="outlined-adornment-email-register"
								type="username"
								value={values.username}
								placeholder="نام کاربری یا ایمیل خود را وارد کنید"
								name="username"
								onBlur={handleBlur}
								onChange={handleChange}
								labelWidth={70}
								inputProps={{
									classes: {
										notchedOutline: classes.notchedOutline
									}
								}}
							/>
							{touched.username &&
							errors.username && (
								<FormHelperText error id="standard-weight-helper-text--register">
									{' '}
									{errors.username}{' '}
								</FormHelperText>
							)}
						</FormControl>

						<Box mt={2}>
							<Button
								disableElevation
								disabled={isSubmitting}
								fullWidth
								size="large"
								type="submit"
								variant="contained"
								className={classes.login}
							>
								مرحله بعد
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</React.Fragment>
	);
};

export default CheckUserEmailComponent;
