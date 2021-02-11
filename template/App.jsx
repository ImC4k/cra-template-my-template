import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './routes';
import { isNil } from 'lodash';
import { getSignInPath } from './utils/route.utils';
import { setIsPortrait } from './redux/actions/dimension.actions';

import SignInButton from './atoms/SignInButton';
import './App.scss';

function App() {
    const dispatch = useDispatch();
    const { userToken, backendAccess } = useSelector(state => state.userReducer);
    const { isFinishedLoadingStore } = useSelector(state => state.loadingReducer);
    useEffect(() => {
        window.addEventListener('resize', () => {
            dispatch(setIsPortrait(window.innerHeight > window.innerWidth));
        });
        
    }, [dispatch]);

    return (
        <div className="App">
            <BrowserRouter>
                {
                    isFinishedLoadingStore && isNil(userToken) &&
                    <Redirect to={getSignInPath()} />
                }
                <Switch>
                    {
                        isFinishedLoadingStore && !isNil(backendAccess) &&
                        routes.filter(route => backendAccess.isAdmin? true : !route.adminOnly).map(route =>
                            <Route key={route.name} path={route.path} component={route.component} exact/>
                        )
                    }
                    {
                        isFinishedLoadingStore && isNil(backendAccess) &&
                        routes.filter(route => !route.adminOnly).map(route =>
                            <Route key={route.name} path={route.path} component={route.component} exact/>
                        )
                    }
                </Switch>
            </BrowserRouter>
            <div className='hidden-sign-in-bug'>
                <SignInButton />
            </div>
        </div>
    )
}

export default App;
