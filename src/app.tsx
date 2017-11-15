import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./views/login";
import Signup from "./views/signup";
import { AuthenticatedRoute } from "./components/authenticated-route";
import Home from "./views/authenticated/home";
import Restaurant from "./views/authenticated/restaurant";

class App extends React.Component {
	public render() {
		return <BrowserRouter>
			<div>
				<Route exact path="/" component={Login} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<AuthenticatedRoute exact path="/home" component={Home} />
				<AuthenticatedRoute exact path="/restaurant" component={Restaurant} />
			</div>
		</BrowserRouter>;
	}
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
);
