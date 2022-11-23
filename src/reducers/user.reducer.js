import userConstants from '../constants/user.constants';

//ردیوسر مربوط به لاگین کاربر
export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case userConstants.USER_LOGIN_REQUEST:
			return { ...state, loading: true, error: '' };
		case userConstants.USER_LOGIN_SUCCESS:
			return { ...state, loading: false, userInfo: action.payload };
		case userConstants.USER_LOGIN_FAIL:
			return { ...state, loading: false, error: action.payload };
		case userConstants.USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

//ردیوسر مربوط به تست ارتباط با سرور
export const connectionCheckReducer = (state = {}, action) => {
	switch (action.type) {
		case userConstants.CHECK_CONNECTION_REQUEST:
			return { ...state, loading: true, error: '' };
		case userConstants.CHECK_CONNECTION_SUCEESS:
			return { ...state, loading: false, isAlive: action.payload.data.isAlive ? 'true' : 'false' };
		case userConstants.CHECK_CONNECTION_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

//ردیوسر مربوط به ریست کردن پسورد
export const userResetPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case userConstants.USER_RESET_PASSWORD_REQUEST:
			return { ...state, loading: true, error: '' };
		case userConstants.USER_RESET_PASSWORD_SUCCESS:
			return { ...state, loading: false, message: action.payload, success: true };
		case userConstants.USER_RESET_PASSWORD_FAIL:
			return { ...state, loading: false, error: action.payload };
		case userConstants.USER_RESET_PASSWORD_RESET:
			return {};
		default:
			return state;
	}
};

//ردیوسر مربوط به ارسال ایمیل کد بازیابی پسورد
export const userCheckEmailReducer = (state = {}, action) => {
	switch (action.type) {
		case userConstants.USER_CHECK_EMAIL_REQUEST:
			return { ...state, loading: true, error: '' };
		case userConstants.USER_CHECK_EMAIL_SUCCESS:
			return { ...state, loading: false, success: action.payload };
		case userConstants.USER_CHECK_EMAIL_FAIL:
			return { ...state, loading: false, error: action.payload };
		case userConstants.USER_CHECK_EMAIL_RESET:
			return {};
		default:
			return state;
	}
};

//ردیوسر مربوط به تغییر پسورد
export const userChangePasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case userConstants.USER_CHANGE_PASSWORD_REQUEST:
			return { ...state, loading: true, error: '' };
		case userConstants.USER_CHANGE_PASSWORD_SUCCESS:
			return { ...state, loading: false, message: action.payload, success: true };
		case userConstants.USER_CHANGE_PASSWORD_FAIL:
			return { ...state, loading: false, error: action.payload };
		case userConstants.USER_CHANGE_PASSWORD_RESET:
			return {};
		default:
			return state;
	}
};
