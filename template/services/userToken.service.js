import store from '../redux/store';
import { updateUserToken, updateUserProfile, updateTokenObj} from '../redux/actions/user.actions';
import { getSelf } from './user.service';

const getTimeoutToNextRefreshMillisec = (expirationSec) => {
    const defaultTokenExpirationTime = 1 * 60 * 60; // 1 hour
    const fetchAheadSec = 5 * 60; // 5 min
    return (expirationSec || (defaultTokenExpirationTime - fetchAheadSec)) * 1000;
}

export const revalidateToken = (res) => {
    let timeoutMillisec = getTimeoutToNextRefreshMillisec(res.tokenObj.expires_in);
    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        timeoutMillisec = getTimeoutToNextRefreshMillisec(newAuthRes.expires_in);
        updateUserTokenOnly(newAuthRes);
        setTimeout(refreshToken, timeoutMillisec);
    }
    setTimeout(refreshToken, timeoutMillisec);
}

export const updateUserTokenRedux = ({ profileObj, tokenId, tokenObj }) => {
    const isUserTokenUpdateFinished = new Promise((resolve, reject) => {
        store.dispatch(updateUserToken(tokenId));
        store.dispatch(updateUserProfile(profileObj));
        store.dispatch(updateTokenObj(tokenObj));
        resolve();
    });
    isUserTokenUpdateFinished.then(() => {
        getSelf();
    });
};

export const updateUserTokenOnly = ({id_token}) => {
    store.dispatch(updateUserToken(id_token));
}