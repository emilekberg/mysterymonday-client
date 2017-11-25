import * as React from "react";
import Network from "../network";
interface GroupSelectorState {
	selectedGroup: string;
	groups: Array<{name: string}>;
}
interface GroupSelectorProps {
	onChange?: (name: string) => void;
}
export default class GroupSelector extends React.Component<GroupSelectorProps, GroupSelectorState>{
	constructor(props: GroupSelectorProps) {
		super(props);
		const selectedGroup = localStorage.getItem("selectedGroup");
		this.state = {
			selectedGroup: selectedGroup ? selectedGroup : "",
			groups: []
		};
		if(selectedGroup) {
			Network.socket.emit("select-group", {
				groupName: selectedGroup
			});
		}
	}

	public componentDidMount() {
		Network.socket.on("user-groups", (data: Array<{name: string}>) => {
			const firstGroupInData = data.length > 0 ? data[0].name : "";
			const selectedGroup = !this.state.selectedGroup ? firstGroupInData : this.state.selectedGroup;
			if(selectedGroup !== this.state.selectedGroup) {
				Network.socket.emit("select-group", {
					groupName: selectedGroup
				});
			}
			this.setState({
				groups: data,
				selectedGroup
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
			<select value={this.state.selectedGroup} onChange={this.onGroupChange}>
				{
					this.state.groups.map(({name}, i) => {
						return <option value={name} key={i}>{name}</option>;
					})
				}
			</select>
		</div>;
	}

	private onGroupChange = (e: React.FormEvent<HTMLSelectElement>) => {
		const selectedGroup = e.currentTarget.value;
		this.setState({
			selectedGroup
		});
		if(this.props.onChange) {
			this.props.onChange(selectedGroup);
		}
		localStorage.setItem("selectedGroup", selectedGroup);
		Network.socket.emit("select-group", {
			groupName: selectedGroup
		});
	}
}
