import axios from 'axios';
import store from '../redux/store';
import { isNil } from 'lodash';
const { REACT_APP_BACKEND_URL } = process.env;

const instance = axios.create({
	baseURL: REACT_APP_BACKEND_URL,
});

// instance.interceptors.request.use(
// 	(req) => {
// 		const { userToken, backendAccess } = store.getState().userReducer;
// 		if (
// 			(!isNil(backendAccess) || req.url === '/api/users/self') &&
// 			userToken
// 			) {
// 				req.headers.Authorization = `Bearer ${userToken}`;
// 				return req;
// 			} else {
// 				throw new axios.Cancel('missing token');
// 			}
// 		},
// 		function (error) {
// 		return Promise.reject(error);
// 	}
// );

export default instance;
