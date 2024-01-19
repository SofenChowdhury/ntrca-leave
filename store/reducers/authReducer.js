import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../components/services/Utilities';

const initialState = {
    token: null,
    userId: null,
    name: null,
    email: null,
    phone: null,
    roles: null,
    company: null,
    profile_picture: null,
    signature: null,
    error: null,
    loading: false,
    user: null,
    isApprover: null,
    isRecorder: null,
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action?.idToken,
        userId: action?.userId,
        name: action?.name,
        email: action?.email,
        phone: action?.phone,
        roles: action?.roles,
        company: action?.company,
        profile_picture: action?.profile_picture,
        signature: action?.signature,
        user: action?.user,
        isApprover: action?.isApprover,
        isRecorder: action?.isRecorder,
        error: null,
        loading: false,
     } );
};

const setAuthImage = (state, action) => {
    return updateObject( state, { 
        profile_picture: action.profile_picture,
        signature: action.signature,
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action?.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null, name: null, email: null, phone: null, roles: null, company: null, profile_picture: null, signature: null, user: null, isApprover: null, isRecorder: null });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes?.AUTH_START: return authStart(state, action);
        case actionTypes?.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes?.AUTH_FAIL: return authFail(state, action);
        case actionTypes?.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes?.AUTH_IMAGE: return setAuthImage(state, action);
        default:
        return state;
    }
};

export default reducer;