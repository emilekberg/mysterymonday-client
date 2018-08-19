import * as React from "react";
import Network from "../network";
import GroupSelector from "../components/group-selector";
import {Link} from "react-router-dom";
export default class Header extends React.Component<{},{}>{
	public render() {
		const authedContent = <header>
			<h1 className="logo">Mystery Monday</h1>
			<div className="nav-bar">
				<Link to="/home">Home</Link>
				<Link to="/manage-restaurants">Restuarants</Link>
				<Link to="/manage-groups">Groups</Link>
			</div>
			<div className="login-bar">Logged in as {Network.name}</div>
			<GroupSelector />
		</header>;
		return Network.isLoggedIn ? authedContent : null;
	}
}