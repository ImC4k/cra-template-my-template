import api from './api.service';
import store from '../redux/store';
import { updateBackendAccess } from '../redux/actions/user.actions';
const path = '/api/users';

export const getSelf = () => {
    api.get(`${path}/self`).then(({data}) => {
        store.dispatch(updateBackendAccess(data));
    });
};