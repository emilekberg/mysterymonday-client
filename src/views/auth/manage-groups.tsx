import * as React from "react";
import { Link } from "react-router-dom";
import Network from "../../network";
import Groups from "../../components/group/groups"
import AddGroup from "../../components/group/add-group"
import EditGroup from "../../components/group/edit-group"
import { getUserGroups } from "../../state/group/group-actions";
import { ApplicationState } from "../../state/application-state";
import { Dispatch, connect } from "react-redux";
enum Mode {
	ALL_GROUPS,
	ADD_GROUP,
	MANAGE_GROUP
}
interface GroupsState {
	mode: Mode;
}
interface GroupsProps {
	selectedGroup: string;
	groups: string[]
	dispatch: Dispatch<ApplicationState>
}
const mapStateToProps = (state: ApplicationState) => {
	return {
		groups: state.group.names
	};
}
export class ManageGroups extends React.Component<GroupsProps, GroupsState> {
	state = {
		mode: Mode.ADD_GROUP
	}
	public componentDidMount() {
		this.props.dispatch(getUserGroups());
	}
	public render() {
		let view: JSX.Element;
		switch(this.state.mode)
		{
			default:
			case Mode.ALL_GROUPS:
				view = <Groups groups={this.props.groups}/>;
			break;
			case Mode.ADD_GROUP:
				view = <AddGroup />;
			break;
		}
		return <>
			<Link to="/home">back</Link>
			<h3>Manage Groups</h3>
			<div>
				<button onClick={() => this.switchMode(0)}>Your Groups</button>
				<button onClick={() => this.switchMode(1)}>Create new Group</button>
			</div>
			{
				view
			}
		</>;
	}

	private switchMode(mode: Mode) {
		this.setState({
			mode
		});
	}
}
export default connect(
	mapStateToProps
)(ManageGroups);