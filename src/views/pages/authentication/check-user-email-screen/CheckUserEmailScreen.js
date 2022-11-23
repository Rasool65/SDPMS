import React from 'react';
import { Card, CardContent, Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CheckUserEmailComponent from './CheckUserEmailComponent';

import logo from './../../../../assets/images/logo.svg';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.primary.light,
		height: '100%',
		minHeight: '100vh',
		width: '100%',
		maxWidth: 'calc(100% + 16px)'
	},
	card: {
		margin: theme.spacing(0) + ' auto',
		maxWidth: '475px',
		overflow: 'visible',
		display: 'flex',
		position: 'relative',
		'& > *': {
			flexGrow: 1,
			flexBasis: '50%'
		},
		[theme.breakpoints.down('lg')]: {
			maxWidth: '400px'
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: '80%'
		}
	},
	content: {
		padding: theme.spacing(5),
		[theme.breakpoints.down('lg')]: {
			padding: theme.spacing(3)
		}
	},
	title: {
		color: theme.palette.grey[600],
		textDecoration: 'none'
	}
}));

const CheckUserEmailScreen = () => {
	const classes = useStyles();
	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Grid
			container
			justifyContent={matchDownSM ? 'center' : 'space-between'}
			alignItems="flex-start"
			className={classes.root}
		>
			<Grid style={{ marginTop: '50px' }} item xs={12} sx={{ minHeight: '100vh', height: '100%' }}>
				<Grid
					sx={{ minHeight: '100vh', height: '100%', p: matchDownSM ? 0 : '0 80px' }}
					container
					direction="column"
					alignItems={matchDownSM ? 'center' : 'flex-start'}
					spacing={matchDownSM ? 5 : 6}
					justifyContent="space-between"
				>
					<Grid item xs={12} container justifyContent="center" alignItems="center">
						<Card className={classes.card}>
							<CardContent className={classes.content}>
								<Grid container direction="column" spacing={2} justifyContent="center">
									<Grid item>
										<Grid
											item
											xs={12}
											sx={{ mt: '20px', mb: '10px', width: '100%', textAlign: 'center' }}
										>
											<Link to="#">
												<img alt="Auth method" src={logo} width="100" />
											</Link>
										</Grid>
										<Grid item xs={12}>
											<Grid
												container
												direction={matchDownSM ? 'column-reverse' : 'row'}
												alignItems="center"
												justifyContent="center"
											>
												<Grid container direction="column" alignItems="center" spacing={1}>
													<Grid item container direction="column" alignItems="center">
														<Grid item>
															<Typography
																color={theme.palette.purple.main}
																gutterBottom
																variant={matchDownSM ? 'h3' : 'h2'}
															>
																بازیابی رمز ورود
															</Typography>
														</Grid>
														<Grid item style={{ marginTop: '20px' }}>
															<Typography color="grey" gutterBottom variant="h3">
																برای ارسال کد بازیابی رمز ورود نام کاربری خود را وارد
																کنید.
															</Typography>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={12}>
										<CheckUserEmailComponent />
									</Grid>
									<Grid item xs={12}>
										<Link to="/user/login" style={{ color: '#000000b0', textDecoration: 'none' }}>
											بازگشت به صفحه ورود
										</Link>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default CheckUserEmailScreen;
