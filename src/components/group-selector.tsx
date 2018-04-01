import * as React from "react";
import Network from "../network";
import {connect, MapDispatchToProps, MapStateToProps, Dispatch} from 'react-redux'
import {changeGroup} from '../redux/actions/group-actions'

interface GroupSelectorState {
	groups: Array<{name: string}>;
}
interface GroupSelectorProps {
	selectedGroup?: string;
	dispatch: Dispatch<{}>
}
const mapStateToProps: MapStateToProps<{},{}, any> = (state) => {
	return {
		selectedGroup: state.group.selected
	};
}
class GroupSelectorComponent extends React.Component<GroupSelectorProps, GroupSelectorState>{
	constructor(props: GroupSelectorProps) {
		super(props);
		const selectedGroup = localStorage.getItem("selectedGroup");
		this.state = {
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
			const selectedGroup = !this.props.selectedGroup ? firstGroupInData : this.props.selectedGroup;
			if(selectedGroup !== this.props.selectedGroup) {
				Network.socket.emit("select-group", {
					groupName: selectedGroup
				});
			}
			this.setState({
				groups: data
			});
			this.props.dispatch(changeGroup(selectedGroup));
		});
		Network.socket.emit("get-user-groups");
	}

	public componentWillUnmount() {
		Network.socket.removeEventListener("user-groups");
	}

	public render() {
		return <div className="group-selector">
			<span>Selected Group: </span>
			<select value={this.props.selectedGroup} onChange={this.onGroupChange}>
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
		this.props.dispatch(changeGroup(selectedGroup));

		localStorage.setItem("selectedGroup", selectedGroup);
		Network.socket.emit("select-group", {
			groupName: selectedGroup
		});
	}
}
export default connect(
	mapStateToProps
)(GroupSelectorComponent);