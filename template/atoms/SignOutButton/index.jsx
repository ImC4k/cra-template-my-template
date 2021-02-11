import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserProfile, deleteUserToken, deleteTokenObj, deleteBackendAccess } from '../../redux/actions/user.actions';
import { GoogleLogout } from 'react-google-login';
import { showErrorNotification } from '../../utils/notification.utils';
import { setFamilies, setFamily } from '../../redux/actions/family.actions';

const { REACT_APP_GOOGLE_OAUTH_CLIENT_ID } = process.env;

export default function SignOutButton({ appearance=null }) {
    const dispatch = useDispatch();
    const { failedToSignOut } = useSelector((state) => state.localeReducer.locale['sign-out']);
    const handleSuccessfulSignOut = () => {
        dispatch(deleteUserProfile());
        dispatch(deleteUserToken());
        dispatch(deleteTokenObj());
        dispatch(deleteBackendAccess());
        dispatch(setFamilies(null));
        dispatch(setFamily(null))
    }
    const handleFailedSignOut = () => {
        showErrorNotification(failedToSignOut);
    }

    if (appearance) {
        return (
            <GoogleLogout
                clientId={REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
                onLogoutSuccess={handleSuccessfulSignOut}
                onFailure={handleFailedSignOut}
                render={appearance}
            />
        );
    }
    else {
        return (
            <GoogleLogout
                clientId={REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
                onLogoutSuccess={handleSuccessfulSignOut}
                onFailure={handleFailedSignOut}
                buttonText='Logout'
            />
        );
    }
}
