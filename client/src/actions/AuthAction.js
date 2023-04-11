import * as AuthApi from '../api/AuthRequest';

export const logIn = (formData) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' });
    try {
        const { data } = await AuthApi.logIn(formData);
        dispatch({ type: 'AUTH_SUCCESS', data: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: 'AUTH_FAILURE' });
    }
};

export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' });
    try {
        const { data } = await AuthApi.signUp(formData);
        dispatch({ type: 'AUTH_SUCCESS', data: data });
    } catch (error) {
        // console.log(error);
        if (!error.response) {
            console.log('Please check your internet connection.');
        }
        dispatch({ type: 'AUTH_FAILURE' });

        return Promise.reject(error);
    }
};

export const logOut = () => async (dispatch) => {
    dispatch({ type: 'LOG_OUT' });
};
