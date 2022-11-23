import { combineReducers } from '@reduxjs/toolkit';
import customizationReducer from '../reducers/customizationReducer';
import snackbarReducer from '../reducers/snackbarReducer';
import {
	userLoginReducer,
	connectionCheckReducer,
	userResetPasswordReducer,
	userCheckEmailReducer,
	userChangePasswordReducer
} from '../reducers/user.reducer';

const reducer = combineReducers({
	customization: customizationReducer,
	snackbar: snackbarReducer,
	userLogin: userLoginReducer,
	userResetPassword: userResetPasswordReducer,
	userCheckEmail: userCheckEmailReducer,
	connectionCheck: connectionCheckReducer,
	userChangePassword: userChangePasswordReducer
});

export default reducer;
