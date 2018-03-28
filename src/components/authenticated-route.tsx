import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import Network from "../network";
import Login from "../views/login";
import { RouterProps } from "react-router";

export const AuthenticatedRoute = (a: any) => {
	const {component: Component, ...rest} = a;
	return <Route {...rest} render={ props => {
		if(Network.isLoggedIn) {
			return <Component {...props} />;
		}
		return <Login {...props} />;
	}} />;
};
export default AuthenticatedRoute;
