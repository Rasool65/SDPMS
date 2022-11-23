import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
	Box,
	Alert,
	Button,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	makeStyles,
	OutlinedInput,
	Typography
} from '@material-ui/core';

import useScriptRef from '../../../../hooks/useScriptRef';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Loading from '../../../../ui-component/loadingComponent/Loading';

import { strengthColor, strengthIndicator } from '../../../../utils/password-strength';

//فراخوانی اکشن موربوط به تغییر پسورد
import { changePassword } from '../../../../actions/user.action';

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

const ChangePasswordComponent = ({ className, ...rest }) => {
	const dispatch = useDispatch();

	const classes = useStyles();
	const scriptedRef = useScriptRef();

	const [ showCurrentPassword, setShowCurrentPassword ] = React.useState(false);
	const [ showNewPassword, setShowNewPassword ] = React.useState(false);

	const [ strength, setStrength ] = React.useState(0);
	const [ level, setLevel ] = React.useState('');

	const handleClickShowOldPassword = () => {
		setShowCurrentPassword(!showCurrentPassword);
	};
	const handleClickShowNewPassword = () => {
		setShowNewPassword(!showNewPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const changePassowd = (value) => {
		const temp = strengthIndicator(value);
		setStrength(temp);
		setLevel(strengthColor(temp));
	};
	//دریافت استیت های مربوط به تغییر پسورد
	const userChangePassword = useSelector((state) => state.userChangePassword);
	const { loading, message, error, success } = userChangePassword;

	// ارسال درخواست برای ریست شدن استیت های تغییر پسورد بعد ا زمان 10 ثانیه
	useEffect(
		() => {
			if (success) {
				setTimeout(() => {
					dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET });
				}, 10000);
			}
		},
		//متغیر هایی که در صورت تغییر هر کدام باعث اجرای این فرمان می شوند
		[ success, dispatch ]
	);
	useEffect(() => {
		changePassowd('');
	}, []);

	return (
		<React.Fragment>
			<Grid container direction="column" justifyContent="center" spacing={2}>
				<Grid item xs={12} container alignItems="center" justifyContent="center">
					{/* نمایش لودینگ و پیغام های خطا و موفقیت تغییر پسورد*/}
					<Box mb={2}>
						{loading ? (
							<Loading />
						) : error ? (
							<div>
								<Alert severity="error">{error}</Alert>
							</div>
						) : message ? (
							<div>
								<Alert severity="success">{message}</Alert>
							</div>
						) : null}
					</Box>
				</Grid>
			</Grid>

			<Formik
				initialValues={{
					currentPassword: '',
					newPassword: ''
				}}
				validationSchema={Yup.object().shape({
					currentPassword: Yup.string().max(255).required('Password is required'),
					newPassword: Yup.string().max(255).required('Password is required')
				})}
				onSubmit={async (values, { setStatus, setSubmitting }) => {
					if (scriptedRef.current) {
						dispatch(changePassword(values));
						setStatus({ success: true });
						setSubmitting(false);
					}
				}}
			>
				{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
					<form noValidate onSubmit={handleSubmit} className={clsx(classes.root, className)} {...rest}>
						<FormControl
							fullWidth
							error={Boolean(touched.currentPassword && errors.currentPassword)}
							className={classes.loginput}
							variant="outlined"
						>
							<label
								style={{ fontSize: '18px', marginBottom: '5px' }}
								htmlFor="outlined-adornment-oldPassword-register"
							>
								رمز ورود فعلی
							</label>
							<OutlinedInput
								id="outlined-adornment-oldPassword-register"
								type={showCurrentPassword ? 'text' : 'password'}
								value={values.currentPassword}
								name="currentPassword"
								placeholder="رمز ورود فعلی"
								onBlur={handleBlur}
								onChange={(e) => {
									handleChange(e);
								}}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowOldPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showCurrentPassword ? <Visibility /> : <VisibilityOff />}
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
							{touched.currentPassword &&
							errors.currentPassword && (
								<FormHelperText error id="standard-weight-helper-text-oldPassword-register">
									{' '}
									{errors.currentPassword}{' '}
								</FormHelperText>
							)}
						</FormControl>

						<FormControl
							fullWidth
							error={Boolean(touched.newPassword && errors.newPassword)}
							className={classes.loginput}
							variant="outlined"
						>
							<label
								style={{ fontSize: '18px', marginBottom: '5px' }}
								htmlFor="outlined-adornment-newPassword-register"
							>
								رمز ورود جدید
							</label>
							<OutlinedInput
								id="outlined-adornment-newPassword-register"
								type={showNewPassword ? 'text' : 'password'}
								value={values.newPassword}
								name="newPassword"
								placeholder="رمزورود جدید"
								onBlur={handleBlur}
								onChange={(e) => {
									handleChange(e);
									changePassowd(e.target.value);
								}}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowNewPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showNewPassword ? <Visibility /> : <VisibilityOff />}
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
								<FormHelperText error id="standard-weight-helper-text-newPassword-register">
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
								تغییر رمز ورود
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</React.Fragment>
	);
};

export default ChangePasswordComponent;
