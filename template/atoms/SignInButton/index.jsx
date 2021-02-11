import React from 'react';
import { useSelector } from 'react-redux';
import {showErrorNotification} from '../../utils/notification.utils';
import {revalidateToken, updateUserTokenRedux} from '../../services/userToken.service';
import { GoogleLogin } from 'react-google-login';
const {REACT_APP_GOOGLE_OAUTH_CLIENT_ID} = process.env;

export default function SignInButton({buttonText='Login'}) {
    const { failedToSignIn } = useSelector((state) => state.localeReducer.locale['sign-in'])

    const handleSuccessfulAuth = (res) => {
        revalidateToken(res);
        updateUserTokenRedux(res);
    }
    const handleFailedAuth = () => {
        showErrorNotification(failedToSignIn)
    }

    return (
        <GoogleLogin
            clientId={REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
            buttonText={buttonText}
            onSuccess={handleSuccessfulAuth}
            onFailure={handleFailedAuth}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    )
}
