import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Alert, Container } from '@material-ui/core';

import Loading from '../../ui-component/loadingComponent/Loading';

//وارد کردن تابع اکشن مربوط به تست ارتباط
import { checkConnection } from '../../actions/user.action';

const ConnectionCheckScreen = () => {
	const dispatch = useDispatch();

	//تعریف یک استیت برای ذخیره عکس وضعیت ارتباط با سامانه
	const [ imageUrlTestConnection, setImageUrlTestConnection ] = useState('');

	//استخراج استیت های مربوط به تست ارتباط
	const connectionCheck = useSelector((state) => state.connectionCheck);
	const { loading, error, isAlive } = connectionCheck;

	/*این تابع برای ست کردن عکس با توجه به وضعیت ارتباط با سرور می باشد 
	لینک های مربوط به عکس ها با توجه به موفقیت امیز بودن ارتباط یا نبودن در
	setImageUrlTestConnectio قرار میگیرند
	*/
	useEffect(
		() => {
			if (isAlive === 'true') {
				//عکس مربوط به موفقیت امیز بودن ارتباط
				setImageUrlTestConnection('لینک عکس مربوط به موفق بودن ارتباط');
			} else if (isAlive === 'false') {
				// عکس مربوط به ناموفق بودن پروژه
				setImageUrlTestConnection('لینک عکس مربوط به ناموفق بودن ارتباط');
			} else {
				setImageUrlTestConnection('');
			}
		},
		[ isAlive ]
	);

	//تابع اجرای بررسی تست ارتباط
	const handleCheckConnection = (e) => {
		e.preventDefault();
		dispatch(checkConnection());
	};

	return (
		<div>
			<div style={{ marginBottom: '20px' }}>
				<h1>تست ارتباط با سرور</h1>

				<Grid container spacing={3}>
					<Grid item xs={12} sm={9}>
						<div>
							<h5 style={{ fontSize: '18px' }}>برای بررسی ارتباط با سامانه بر روی دکمه کلیک کنید.</h5>
						</div>
					</Grid>

					<Grid item xs={12} sm={3}>
						<Button variant="contained" color="primary" onClick={handleCheckConnection}>
							تست ارتباط
						</Button>
					</Grid>
				</Grid>
			</div>

			{loading ? (
				<Container maxWidth="sm">
					<h3>در حال بررسی ارتباط با سرور ...</h3>
					<div>
						<Loading />
					</div>
				</Container>
			) : error ? (
				<div>
					<Alert severity="error">{error}</Alert>
				</div>
			) : imageUrlTestConnection ? (
				<Container maxWidth="sm">
					<img src={imageUrlTestConnection} alt="connection status success" style={{ width: '100%' }} />
				</Container>
			) : null}
		</div>
	);
};

export default ConnectionCheckScreen;
