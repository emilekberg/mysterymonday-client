import * as React from "react";
import Network from "../network";
import GroupSelector from "../components/group-selector";

export default class Header extends React.Component<{},{}>{
	public render() {
		const authedContent = <div id="header-content">
			<div>Logged in as {Network.name}</div>
			<GroupSelector />
		</div>;
		return Network.isLoggedIn ? authedContent : null;
	}
}