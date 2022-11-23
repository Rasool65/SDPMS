import userConstants from '../constants/user.constants';
import axios from 'axios';

//اکشن لاگین کردن کاربر
export const loginUser = (userData) => async (dispatch) => {
	try {
		dispatch({ type: userConstants.USER_LOGIN_REQUEST });

		const { data } = await axios.post('/api/user/login', userData);

		//ذخیره دیتای ارسال شده از سرور در لوکال هاست
		localStorage.setItem('userInfo', JSON.stringify(data));

		dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: userConstants.USER_LOGIN_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

// اکشن لاگ اوت کردن کاربر

export const logoutUser = () => (dispatch) => {
	//پاک کردن اطلاعات ذخیره شده در لوکال هاست
	localStorage.removeItem('userInfo');

	dispatch({ type: userConstants.USER_LOGOUT });
};

//  اکشن بررسی ارتباط با سرورر

export const checkConnection = () => async (dispatch, getState) => {
	try {
		dispatch({ type: userConstants.CHECK_CONNECTION_REQUEST });

		// گت استیت برای فراخوانی استییت های ذخیره شده در ریداکس
		const states = getState();

		//تعریف یک متغیر برای توکن و دیافت ان از استیت های ریداکس
		const token = states.userLogin && states.userLogin.userInfo ? states.userLogin.userInfo.token : null;

		if (!token) {
			dispatch({ type: userConstants.USER_LOGIN_FAIL, payload: 'توکن شما موجود نیست' });
		}

		//ارسال درخواست گت برای بررسی تست ارتباط
		const { data } = await axios.get('/api', { headers: { Authorization: `Bearer ${token}` } });

		dispatch({ type: userConstants.CHECK_CONNECTION_SUCEESS, payload: data });
	} catch (error) {
		dispatch({
			type: userConstants.CHECK_CONNECTION_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

//اکشن مربوط به اپدیت کردن پسورد
export const resetPassword = (userData) => async (dispatch) => {
	try {
		dispatch({ type: userConstants.USER_RESET_PASSWORD_REQUEST });
		//ارسال درخواست پست برای تغییر پسورد
		const { data } = await axios.post('/api', userData);

		dispatch({ type: userConstants.USER_RESET_PASSWORD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: userConstants.USER_RESET_PASSWORD_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

//اکشن مربوط به بررسی ایمیل کاربر و ارسال ایمیل ریکاوری پسورد
export const checkEmail = (userData) => async (dispatch) => {
	try {
		dispatch({ type: userConstants.USER_CHECK_EMAIL_REQUEST });

		const { data } = await axios.post('/api', userData);

		dispatch({ type: userConstants.USER_CHECK_EMAIL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: userConstants.USER_CHECK_EMAIL_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

//اکشن مربوط به تغییر رمز ورود
export const changePassword = (userData) => async (dispatch, getState) => {
	try {
		dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });

		//دریافت توکن ذخیره شده در لوکال هاست
		const states = getState();
		const token = states.userLogin && states.userLogin.userInfo.token;

		//ارسال درخواست به سرور برای تغییر پسورد
		const { data } = await axios.post('/api/user/login', userData, {
			headers: { Authorization: `Barer ${token}` }
		});

		dispatch({ type: userConstants.USER_CHANGE_PASSWORD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: userConstants.USER_CHANGE_PASSWORD_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
