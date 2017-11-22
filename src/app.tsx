import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./views/login";
import Signup from "./views/signup";
import { AuthenticatedRoute } from "./components/authenticated-route";
import Home from "./views/auth/home";
import Restaurant from "./views/auth/restaurant";
import Header from "./components/header";
import ManageRestaurants from "./views/auth/manage-restaurants";

class App extends React.Component {
	public render() {
		return <BrowserRouter>
			<div>
				<Route path="/" component={Header} />
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<AuthenticatedRoute exact path="/home" component={Home} />
					<AuthenticatedRoute exact path="/restaurant" component={Restaurant} />
					<AuthenticatedRoute exact path="/manage-restaurants" component={ManageRestaurants} />

				</Switch>
			</div>
		</BrowserRouter>;
	}
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
);
