import React from 'react';
// noinspection ES6CheckImport
import {Route, Redirect} from 'react-router-dom';

import * as authService from "Services/Authentication/authService";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {

    return (
        <Route
            {...rest}
            render={({ location }) =>
                authService.isAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: `/login`,
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;