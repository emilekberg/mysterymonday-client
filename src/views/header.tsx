import * as React from "react";
import Network from "../network";
import GroupSelector from "../components/group-selector";
import {Link} from "react-router-dom";
export default class Header extends React.Component<{},{}>{
	public render() {
		const authedContent = <header>
			<h1>Mystery Monday</h1>
			<div className="menu">
				<Link to="/home">Home</Link>
				<Link to="/manage-restaurants">Restuarants</Link>
				<Link to="/manage-groups">Groups</Link>
			</div>
			<div className="login">Logged in as {Network.name}</div>
			<GroupSelector />
		</header>;
		return Network.isLoggedIn ? authedContent : null;
	}
}