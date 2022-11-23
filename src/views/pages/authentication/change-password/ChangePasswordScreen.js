import React from 'react';
import { Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';

import ChangePasswordComponent from './ChangePasswordComponent';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.primary.light,
		height: '100%',

		width: '100%',
		maxWidth: 'calc(100% + 16px)'
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

const ChangePasswordScreen = () => {
	const classes = useStyles();
	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Grid container justifyContent={'center'} alignItems="flex-start" className={classes.root}>
			<Grid style={{ marginTop: '20px' }} item xs={12} sm={10} md={9} sx={{ height: '100%' }}>
				<Grid
					sx={{ height: '100%', p: matchDownSM ? 0 : '0 80px' }}
					container
					direction="column"
					alignItems={matchDownSM ? 'center' : 'flex-start'}
					spacing={matchDownSM ? 5 : 6}
					justifyContent="space-between"
				>
					<Grid item xs={12} container justifyContent="center" alignItems="center">
						<Grid container direction="column" spacing={2} justifyContent="center">
							<Grid item>
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
														تغییر رمز ورود
													</Typography>
												</Grid>
												<Grid item style={{ marginTop: '20px' }}>
													<Typography color="grey" gutterBottom variant="h3">
														برای تغییر رمز ورود فیلد های زیر را پر کنید.
													</Typography>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<ChangePasswordComponent />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ChangePasswordScreen;
