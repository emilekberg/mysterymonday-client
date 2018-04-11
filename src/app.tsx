import * as React from "react";
import {render} from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import thunk from 'redux-thunk';
import Login from "./views/login";
import Signup from "./views/signup";
import { AuthenticatedRoute } from "./components/authenticated-route";
import Home from "./views/auth/home";
import Restaurant from "./views/auth/restaurant";
import Header from "./views/header";
import ManageRestaurants from "./views/auth/manage-restaurants";
import ManageGroups from "./views/auth/manage-groups";
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import rootReducer from './state/reducers';
interface w extends Window {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R;
}
const composeEnhancers = (window as w).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer, 
	composeEnhancers(
		applyMiddleware(thunk)
	)
);
const App: React.StatelessComponent = () => {
	return <BrowserRouter>
		<>
			<Header />
			<main className="container">
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<AuthenticatedRoute exact path="/home" component={Home} />
					<AuthenticatedRoute exact path="/restaurant" component={Restaurant} />
					<AuthenticatedRoute exact path="/manage-restaurants" component={ManageRestaurants} />
					<AuthenticatedRoute exact path="/manage-groups" component={ManageGroups} />
				</Switch>
			</main>
			<footer>
			</footer>
		</>
	</BrowserRouter>;
}

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
