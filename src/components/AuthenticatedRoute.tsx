import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import Network from "../network";

export const AuthenticatedRoute = (a: any) => {
	const {component, ...rest} = a;
	const Component = component;
	return <Route {...rest} render={ props => {
		if(Network.isLoggedIn) {
			return <Component {...props} />;
		}
		return <Redirect to={{
			pathname: "/"
		}} />;
	}} />;
};
export default AuthenticatedRoute;
