import * as React from "react";
import { Link } from "react-router-dom";
import Network from "../../network";

export default class ManageGroups extends React.Component<any, {}> {
	constructor() {
		super();
		this.state = {
		};
	}

	public render() {
		return <div>
			<Link to="/home">back</Link>
			<h3>Manage Groups</h3>
		</div>;
	}
}
