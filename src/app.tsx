import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./views/login";
import Signup from "./views/signup";

class App extends React.Component {
	public render() {
		return <BrowserRouter>
			<div>
				<Route exact path="/" component={Login} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
			</div>
		</BrowserRouter>;
	}
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
);
