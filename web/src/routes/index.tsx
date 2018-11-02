import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import { RegisterConnector } from 'src/modules/register/registerConnector';

export const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact={true} path= '/register' component={RegisterConnector} />
        </Switch>
    </BrowserRouter>
);