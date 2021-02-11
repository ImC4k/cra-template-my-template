export const deleteUserProfile = () => {
    return {
        type: 'DELETE_USER_PROFILE'
    };
}

export const updateUserProfile = (userProfile) => {
    return {
        type: 'UPDATE_USER_PROFILE',
        userProfile: userProfile,
    };
}

export const deleteUserToken = () => {
    return {
        type: 'DELETE_USER_TOKEN'
    };
}

export const updateUserToken = (userToken) => {
    return {
        type: 'UPDATE_USER_TOKEN',
        userToken: userToken,
    };
}

export const deleteTokenObj = () => {
    return {
        type: 'DELETE_TOKEN_OBJ'
    };
}

export const updateTokenObj = (tokenObj) => {
    return {
        type: 'UPDATE_TOKEN_OBJ',
        tokenObj: tokenObj
    };
}

export const deleteBackendAccess = () => {
    return {
        type: 'DELETE_BACKEND_ACCESS'
    };
}

export const updateBackendAccess = (backendAccess) => {
    return {
        type: 'UPDATE_BACKEND_ACCESS',
        backendAccess: backendAccess
    };
}