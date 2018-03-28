import * as React from "react";
import {render} from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./views/login";
import Signup from "./views/signup";
import { AuthenticatedRoute } from "./components/authenticated-route";
import Home from "./views/auth/home";
import Restaurant from "./views/auth/restaurant";
import Header from "./components/header";
import ManageRestaurants from "./views/auth/manage-restaurants";
import ManageGroups from "./views/auth/manage-groups";
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux'
import changeGroupReducer from './redux/reducers/change-group-reducer'
const store = createStore(changeGroupReducer);
 
class App extends React.Component {
	public render() {
		return <BrowserRouter>
			<>
				<Route path="/" component={Header} />
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<AuthenticatedRoute exact path="/home" component={Home} />
					<AuthenticatedRoute exact path="/restaurant" component={Restaurant} />
					<AuthenticatedRoute exact path="/manage-restaurants" component={ManageRestaurants} />
					<AuthenticatedRoute exact path="/manage-groups" component={ManageGroups} />
				</Switch>
			</>
		</BrowserRouter>;
	}
}

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
