import * as React from "react";
import Network from "../network";
import GroupSelector from "./group-selector";
interface HeaderState {
	something: string;
}
export default class Header extends React.Component<{}, HeaderState>{
	constructor() {
		super();
		this.state = {
			something: ""
		};
	}

	public componentDidMount() {
		// Network.socket.emit("get-user-groups");
	}

	public render() {
		const authedContent = <div id="header-content">
			<div>Logged in as {Network.name}</div>
			<GroupSelector />
		</div>;
		return Network.isLoggedIn ? authedContent : null;
	}
}
