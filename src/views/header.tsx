import * as React from "react";
import Network from "../network";
import GroupSelector from "../components/group-selector";

export default class Header extends React.Component<{},{}>{
	public render() {
		const authedContent = <header className="flex-row flex-between">
			<div>Logged in as {Network.name}</div>
			<GroupSelector />
		</header>;
		return Network.isLoggedIn ? authedContent : null;
	}
}