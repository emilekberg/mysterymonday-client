import * as React from "react";
import { Link } from "react-router-dom";
import Network from "../../network";
import Groups from "../../components/group/groups"
import AddGroup from "../../components/group/add-group"
import EditGroup from "../../components/group/edit-group"
enum Mode {
	ALL_GROUPS,
	ADD_GROUP,
	MANAGE_GROUP
}
interface GroupsState {
	groups: Array<{}>
	mode: Mode;
}
export default class ManageGroups extends React.Component {

	state = {
		groups: [],
		mode: Mode.ALL_GROUPS
	}
	public componentDidMount() {
		Network.socket.on('user-groups', (e: any) => {
			this.setState({
				groups: e
			});
		});
		Network.socket.emit('get-user-groups');
	}

	public componentWillUnmount() {
		Network.socket.removeEventListener('user-groups');
	}
	public render() {
		let view: JSX.Element;
		switch(this.state.mode)
		{
			default:
			case Mode.ALL_GROUPS:
				view = <Groups groups={this.state.groups}/>;
			break;
			case Mode.ADD_GROUP:
				view = <AddGroup />;
			break;
		}
		return <div>
			<Link to="/home">back</Link>
			<h3>Manage Groups</h3>
			<div>
				<button onClick={() => this.switchMode(0)}>Your Groups</button>
				<button onClick={() => this.switchMode(1)}>Create new Group</button>
			</div>
			{
				view
			}
		</div>;
	}

	private switchMode(mode: Mode) {
		this.setState({
			mode
		});
	}
}
