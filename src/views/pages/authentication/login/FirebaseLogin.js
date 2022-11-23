import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import Loading from '../../../../ui-component/loadingComponent/Loading';

import {
	Box,
	Button,
	Checkbox,
	// Divider,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	makeStyles,
	OutlinedInput,
	Typography,
	Alert
} from '@material-ui/core';

import useScriptRef from '../../../../hooks/useScriptRef';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// import Google from './../../../../assets/images/icons/social-google.svg';

import { loginUser } from '../../../../actions/user.action';

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
		textDecoration: 'none',
		color: theme.palette.purple.main
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
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		'& > label': {
			top: '23px',
			left: 20,
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

const FirebaseLogin = (props, { className, ...rest }) => {
	const dispatch = useDispatch();

	// برای نشان دادن ارور
	const userLogin = useSelector((state) => state.userLogin);
	const { error, loading } = userLogin;

	const classes = useStyles();
	// const customization = useSelector((state) => state.customization);
	const scriptedRef = useScriptRef();
	const [ showPassword, setShowPassword ] = React.useState(false);
	const [ checked, setChecked ] = React.useState(true);

	// const googleHandler = async () => {};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<React.Fragment>
			<Grid container direction="column" justifyContent="center" spacing={2}>
				{/* <Grid item xs={12}>
					<Button
						disableElevation
						fullWidth={true}
						className={classes.redButton}
						onClick={googleHandler}
						size="large"
						variant="contained"
					>
						<img src={Google} alt="google" width="20px" className={classes.loginIcon} /> Sign in with Google
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Box alignItems="center" display="flex">
						<Divider className={classes.signDivider} orientation="horizontal" />
						<Button
							variant="outlined"
							className={classes.signText}
							sx={{ borderRadius: customization.borderRadius + 'px' }}
							disableRipple
							disabled
						>
							OR
						</Button>
						<Divider className={classes.signDivider} orientation="horizontal" />
					</Box>
				</Grid>
				<Grid item xs={12} container alignItems="center" justifyContent="center">
					<Box mb={2}>
						<Typography variant="subtitle1" className={classes.title}>
							Sign in with Email address
						</Typography>
					</Box>
				</Grid> */}
			</Grid>
			{/* ارور نمایش داده شده */}
			{loading && <Loading />}
			<Box mb={2}>{error && <Alert severity="error">{error}</Alert>}</Box>

			<Formik
				initialValues={{
					username: '',
					password: ''
				}}
				validationSchema={Yup.object().shape({
					username: Yup.string().email('ایمیل نا معتبر است').max(255).required('وارد کردن ایمیل الزامیست'),
					password: Yup.string().max(255).required('واردکردن کلمه عبور الزامیست')
				})}
				onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
					try {
						if (scriptedRef.current) {
							setStatus({ success: true });
							setSubmitting(false);
							dispatch(loginUser(values));
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
							<InputLabel htmlFor="outlined-adornment-email-login">نام کاربری / ایمیل</InputLabel>
							<OutlinedInput
								id="outlined-adornment-email-login"
								type="email"
								value={values.username}
								name="username"
								onBlur={handleBlur}
								onChange={handleChange}
								label="Email Address / Username"
								inputProps={{
									classes: {
										notchedOutline: classes.notchedOutline
									}
								}}
							/>
							{touched.username &&
							errors.username && (
								<FormHelperText error id="standard-weight-helper-text-email-login">
									{' '}
									{errors.username}{' '}
								</FormHelperText>
							)}
						</FormControl>

						<FormControl
							fullWidth
							error={Boolean(touched.password && errors.password)}
							className={classes.loginput}
							variant="outlined"
						>
							<InputLabel htmlFor="outlined-adornment-password-login">کلمه عبور</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password-login"
								type={showPassword ? 'text' : 'password'}
								value={values.password}
								name="password"
								onBlur={handleBlur}
								onChange={handleChange}
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
								label="Password"
								inputProps={{
									classes: {
										notchedOutline: classes.notchedOutline
									}
								}}
							/>
							{touched.password &&
							errors.password && (
								<FormHelperText error id="standard-weight-helper-text-password-login">
									{' '}
									{errors.password}{' '}
								</FormHelperText>
							)}
						</FormControl>
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
									label={<React.Fragment>به خاطر بسپار</React.Fragment>}
								/>
							</Grid>
							{
								<Grid item>
									<Typography
										component={Link}
										to="/user/forgetpassword"
										variant="subtitle1"
										style={{ textDecoration: 'none' }}
									>
										فراموشی کلمه عبور؟
									</Typography>
								</Grid>
							}
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
								وارد شوید
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</React.Fragment>
	);
};

export default FirebaseLogin;
