import * as React from "react";
import Network from "../network";
import {connect, MapDispatchToProps, MapStateToProps, Dispatch} from 'react-redux'
import {changeGroup, getUserGroups} from '../redux/actions/group-actions'
import { ApplicationState } from "../redux/reducers";

interface GroupSelectorProps {
	selectedGroup: string;
	groups: Array<{name: string}>
	dispatch: Dispatch<ApplicationState>
}
const mapStateToProps: MapStateToProps<{},{}, ApplicationState> = (state) => {
	return {
		selectedGroup: state.group.selected,
		groups: state.group.groups
	};
}
class GroupSelectorComponent extends React.Component<GroupSelectorProps, {}>{
	constructor(props: GroupSelectorProps) {
		super(props);
		const selectedGroup = localStorage.getItem("selectedGroup");
		if(selectedGroup) {
			this.props.dispatch(changeGroup(selectedGroup));
		}
	}

	public componentDidMount() {
		this.props.dispatch(getUserGroups());
	}

	public render() {
		return <div className="group-selector">
			<span>Selected Group: </span>
			<select value={this.props.selectedGroup} onChange={this.onGroupChange}>
				{
					this.props.groups.map(({name}, i) => {
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