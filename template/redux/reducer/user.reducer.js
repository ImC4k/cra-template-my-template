const initialState = {
    userProfile: JSON.parse(localStorage.getItem('userProfile')) || null,
    userToken: localStorage.getItem('userToken') || null,
    tokenObj: JSON.parse(localStorage.getItem('tokenObj')) || null,
    backendAccess: JSON.parse(localStorage.getItem('backendAccess')) || null
};

const userReducer = (state = initialState, action) => {
    if (action.type === 'DELETE_USER_PROFILE') {
        localStorage.removeItem('userProfile');
        return {...state, userProfile: null};
    }
    else if (action.type === 'UPDATE_USER_PROFILE') {
        localStorage.setItem('userProfile', JSON.stringify(action.userProfile));
        return {...state, userProfile: action.userProfile};
    }
    else if (action.type === 'DELETE_USER_TOKEN') {
        localStorage.removeItem('userToken');
        return {...state, userToken: null};
    }
    else if (action.type === 'UPDATE_USER_TOKEN') {
        localStorage.setItem('userToken', action.userToken);
        return {...state, userToken: action.userToken};
    }
    else if (action.type === 'DELETE_TOKEN_OBJ') {
        localStorage.removeItem('tokenObj');
        return {...state, tokenObj: null};
    }
    else if (action.type === 'UPDATE_TOKEN_OBJ') {
        localStorage.setItem('tokenObj', JSON.stringify(action.tokenObj));
        return {...state, tokenObj: action.tokenObj};
    }
    else if (action.type === 'UPDATE_BACKEND_ACCESS') {
        localStorage.setItem('backendAccess', JSON.stringify(action.backendAccess));
        return {...state, backendAccess: action.backendAccess};
    }
    else if (action.type === 'DELETE_BACKEND_ACCESS') {
        localStorage.removeItem('backendAccess');
        return {...state, backendAccess: null};
    }
    else {
        return state;
    }
}

export default userReducer;