import * as React from "react";
import { Redirect, Route, RouteProps, RouteComponentProps } from "react-router-dom";
import Network from "../network";
import Login from "../views/login";
import { RouterProps } from "react-router";
interface AuthenticatedRouteProps extends RouteProps {
	hidden?: boolean
}
export const AuthenticatedRoute: React.StatelessComponent<AuthenticatedRouteProps> = (props) => {
	const {component, hidden, ...rest} = props;
	const Component = component as any;
	return <Route {...rest} render={ (props: RouteComponentProps<AuthenticatedRouteProps>) => {
		if(Network.isLoggedIn) {
			return <Component {...props} />;
		}
		if(hidden) {
			return null;
		}
		return <Login {...props} />;
	}} />;
};
export default AuthenticatedRoute;
