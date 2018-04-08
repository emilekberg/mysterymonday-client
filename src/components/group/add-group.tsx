import * as React from "react";
import Network from "../../network";
import { ApplicationState } from "../../redux/reducers";
import { Dispatch, connect } from "react-redux";
import { addGroup } from "../../redux/actions/group-actions";
import Loader from "../../components/loader";
import TextInput from "../../components/text-input"
import { getUsers } from "../../redux/actions/user-actions";

interface AddGroupState {
	groupName: string,
	usersToAdd: Array<string>
}
interface AddGroupProps {
	isFetching: boolean,
	users: Array<string>
	dispatch: Dispatch<ApplicationState>
}
const mapStateToProps = (state: ApplicationState) => {
	return {
		isFetching: state.group.isFetching,
		users: state.user.users.map(({username}) => username)
	};
}
class AddGroup extends React.Component<AddGroupProps, AddGroupState> {
	state: AddGroupState = {
		groupName: "",
		usersToAdd: []
	}

	componentWillMount() {
		this.props.dispatch(getUsers());
	}
	render() {
		const inputFields = this.state.usersToAdd.map((user, key) => {
			return <div key={key}>
				<TextInput 
					type="text" 
					value={user} 
					onInput={(e) => this.onUsernameInput(e, key)}
					autocomplete={this.props.users}
				/>
				<button onClick={() => this.onRemoveUser(key)}>-</button>
			</div>
		});
		return <div>
			<h5>Add Group</h5>
			<div>
				<p>name:<input onChange={(e) => this.onGroupNameInput(e)} type="text" value={this.state.groupName} /></p>
				<p>users: <button onClick={() => this.onAddUser()}>+</button></p>
				<div className="inputFields">{inputFields}</div>
				<button onClick={() => this.onSubmit()}>submit</button>
			</div>
			{
				this.props.isFetching ? <Loader /> : null
			}
		</div>
	}

	onGroupNameInput(e: React.FormEvent<HTMLInputElement>) {
		this.setState({
			groupName: e.currentTarget.value
		});
	}

	onUsernameInput(e: React.FormEvent<HTMLInputElement>, index: number) {
		this.state.usersToAdd[index] = e.currentTarget.value;
		this.forceUpdate();
	}

	onAddUser() {
		this.setState((prevState) => ({
			usersToAdd: [...prevState.usersToAdd, '']
		}));
	}

	onRemoveUser(key: number) {
		const usersToAdd = this.state.usersToAdd.concat();
		usersToAdd.splice(key, 1);
		this.setState((prevState) => ({
			usersToAdd
		}));
	}

	onSubmit() {
		this.props.dispatch(addGroup(this.state));		
	}
}
export default connect(
	mapStateToProps
)(AddGroup);