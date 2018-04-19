import * as React from "react";
import Network from "../network";
import {connect, MapDispatchToProps, MapStateToProps, Dispatch} from 'react-redux'
import {changeGroup, getUserGroups} from '../state/group/group-actions'
import { ApplicationState } from "../state/application-state";

interface GroupSelectorProps {
	selectedGroup: string;
	groups: string[]
	dispatch: Dispatch<ApplicationState>
}
const mapStateToProps = (state: ApplicationState) => {
	return {
		selectedGroup: state.group.selected,
		groups: state.group.names
	};
}
class GroupSelectorComponent extends React.Component<GroupSelectorProps, any>{
	public componentDidMount() {
		const selectedGroup = localStorage.getItem("selectedGroup");
		if(selectedGroup) {
			this.props.dispatch(changeGroup(selectedGroup));
		}
		this.props.dispatch(getUserGroups());
	}

	public render() {
		return <div className="groupSelector">
			<span>Selected Group: </span>
			<select value={this.props.selectedGroup} onChange={this.onGroupChange}>
				{
					this.props.groups.map((name, i) => {
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