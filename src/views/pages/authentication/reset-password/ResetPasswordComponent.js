import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
	Box,
	Alert,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	makeStyles,
	OutlinedInput,
	Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import useScriptRef from '../../../../hooks/useScriptRef';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Loading from '../../../../ui-component/loadingComponent/Loading';

import { strengthColor, strengthIndicator } from '../../../../utils/password-strength';

//فراخوانی اکشن مربوط به تغییر پسورد
import { resetPassword } from '../../../../actions/user.action';
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

const ResetPasswordComponent = ({ className, ...rest }) => {
	const classes = useStyles();
	const scriptedRef = useScriptRef();

	const dispatch = useDispatch();
	const history = useHistory();

	const [ showPassword, setShowPassword ] = React.useState(false);
	const [ checked, setChecked ] = React.useState(true);

	const [ strength, setStrength ] = React.useState(0);
	const [ level, setLevel ] = React.useState('');

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const changePassowd = (value) => {
		const temp = strengthIndicator(value);
		setStrength(temp);
		setLevel(strengthColor(temp));
	};

	// دریافت استیت های مربوط به ریست پسورد
	const userResetPassword = useSelector((state) => state.userResetPassword);
	const { loading, error, success, message } = userResetPassword;

	/*در صورتی که عملیات موفقیت امیز بود به صفحه لاگین برگشت داده میشود
	 و یک درخواست برای ریست کردن استیت های ریست پسورد ارسال میشود*/
	useEffect(
		() => {
			if (success) {
				setTimeout(() => {
					history.push('/user/login');
					dispatch({ type: userConstants.USER_RESET_PASSWORD_RESET });
				}, 3000);
			}
		},
		[ success, history, dispatch ]
	);

	useEffect(() => {
		changePassowd('123456');
	}, []);

	return (
		<React.Fragment>
			<Grid container direction="column" justifyContent="center" spacing={2}>
				<Grid item xs={12} container alignItems="center" justifyContent="center">
					{/* نمایش لودینگ و خطا و پیغام موفقیت امیز بودن تغییر پسورد*/}
					<Box mb={2}>
						{loading && <Loading />}
						{error && (
							<div>
								<Alert severity="error">{error}</Alert>
							</div>
						)}
						{message && (
							<div>
								<Alert severity="success">{message}</Alert>
							</div>
						)}
					</Box>
				</Grid>
			</Grid>

			<Formik
				initialValues={{
					username: '',
					newPassword: '',
					activeCode: ''
				}}
				validationSchema={Yup.object().shape({
					username: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
					newPassword: Yup.string().max(255).required('Password is required'),
					activeCode: Yup.string().required('Active Code is required')
				})}
				onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
					try {
						if (scriptedRef.current) {
							//ارسال درخواست برای تغییر پسورد
							dispatch(resetPassword(values));

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
							<label htmlFor="outlined-adornment-email-register">نام کاربری</label>
							<OutlinedInput
								id="outlined-adornment-email-register"
								type="username"
								value={values.username}
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

						<FormControl
							fullWidth
							error={Boolean(touched.activeCode && errors.activeCode)}
							className={classes.loginput}
							variant="outlined"
						>
							<label htmlFor="activeCode">کد فعال سازی</label>
							<OutlinedInput
								id="activeCode"
								type="activeCode"
								value={values.activeCode}
								name="activeCode"
								onBlur={handleBlur}
								onChange={handleChange}
								labelWidth={70}
								inputProps={{
									classes: {
										notchedOutline: classes.notchedOutline
									}
								}}
							/>
							{touched.activeCode &&
							errors.activeCode && (
								<FormHelperText error id="standard-weight-helper-text--register">
									{' '}
									{errors.activeCode}{' '}
								</FormHelperText>
							)}
						</FormControl>

						<FormControl
							fullWidth
							error={Boolean(touched.newPassword && errors.newPassword)}
							className={classes.loginput}
							variant="outlined"
						>
							<label htmlFor="outlined-adornment-password-register">پسورد جدید</label>
							<OutlinedInput
								id="outlined-adornment-password-register"
								type={showPassword ? 'text' : 'password'}
								value={values.newPassword}
								name="newPassword"
								onBlur={handleBlur}
								onChange={(e) => {
									handleChange(e);
									changePassowd(e.target.value);
								}}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								labelWidth={70}
								inputProps={{
									classes: {
										notchedOutline: classes.notchedOutline
									}
								}}
							/>
							{touched.newPassword &&
							errors.newPassword && (
								<FormHelperText error id="standard-weight-helper-text-password-register">
									{' '}
									{errors.newPassword}{' '}
								</FormHelperText>
							)}
						</FormControl>

						{strength !== 0 && (
							<FormControl fullWidth>
								<Box mb={2}>
									<Grid container spacing={2} alignItems="center">
										<Grid item>
											<Box width={85} height={8} borderRadius={7} backgroundColor={level.color} />
										</Grid>
										<Grid item>
											<Typography variant="subtitle1" fontSize="0.75rem">
												{level.label}
											</Typography>
										</Grid>
									</Grid>
								</Box>
							</FormControl>
						)}

						<Grid container alignItems="center" justifyContent="space-between">
							<Grid item>
								<FormControlLabel
									control={
										<Checkbox
											checked={checked}
											onChange={(event) => setChecked(event.target.checked)}
											name="checked"
											color="primary"
										/>
									}
									label={
										<React.Fragment>
											<Typography variant="subtitle1">
												Agree with &nbsp;
												<Typography variant="subtitle1" component={Link} to="#">
													Terms & Condition.
												</Typography>
											</Typography>
										</React.Fragment>
									}
								/>
							</Grid>
						</Grid>
						{errors.submit && (
							<Box mt={3}>
								<FormHelperText error>{errors.submit}</FormHelperText>
							</Box>
						)}

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
								تغییر پسورد
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</React.Fragment>
	);
};

export default ResetPasswordComponent;
