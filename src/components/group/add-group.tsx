import * as React from "react";
import Network from "../../network";

interface AddGroupState {
	groupName: string,
	usersToAdd: Array<string>
}
export default class AddGroup extends React.Component<{}, AddGroupState> {
	state: AddGroupState = {
		groupName: "",
		usersToAdd: []
	}
	render() {
		const inputFields = this.state.usersToAdd.map((user, key) => {
			return <input type="text" value={user} key={key} onInput={(e) => this.onUsernameInput(e, key)} />;
		});
		return <div>
			<h5>Add Group</h5>
			<div>
				<p>name:<input onChange={(e) => this.onGroupNameInput(e)} type="text" value={this.state.groupName} /></p>
				<p>users: <button onClick={() => this.onAddUser()}>+</button></p>
				<div className="inputFields">{inputFields}</div>
				<button onClick={() => this.onSubmit()}>submit</button>
			</div>
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

	onSubmit() {
		Network.socket.once('add-group', (data: {status: string}) => {
			if(data.status === "ok") {
				console.log("OK!");
			} else {
				console.log("ERROR!");
			}
		});
		Network.socket.emit('add-group', this.state);
		
	}
}
