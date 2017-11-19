import * as React from "react";
import Network from "../network";
interface GroupSelectorState {
	selectedGroup: string;
	groups: Array<{name: string}>;
}
export default class GroupSelector extends React.Component<{}, GroupSelectorState>{
	constructor() {
		super();
		this.state = {
			selectedGroup: "",
			groups: []
		};
	}

	public componentDidMount() {
		Network.socket.on("user-groups", (data: Array<{name: string}>) => {
			const selectedGroup = data.length > 0 ? data[0].name : "";
			this.setState({
				groups: data,
				selectedGroup: !this.state.selectedGroup ? selectedGroup : this.state.selectedGroup
			});
		});
		Network.socket.emit("get-user-groups");
	}

	public componentWillUnmount() {
		Network.socket.removeEventListener("user-groups");
	}

	public render() {
		return <div className="group-selector">
			<span>Selected Group: </span>
			<select defaultValue={this.state.selectedGroup} onChange={this.onGroupChange}>
				{
					this.state.groups.map(({name}, i) => {
						return <option value={name} key={i}>{name}</option>;
					})
				}
			</select>
		</div>;
	}

	private onGroupChange = (e: React.FormEvent<HTMLSelectElement>) => {
		this.setState({
			selectedGroup: e.currentTarget.value
		});
	}
}
