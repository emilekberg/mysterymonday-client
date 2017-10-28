import * as React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import Network from "../network";
import { queryStringToJson, urlToQueryString } from "../utils";
interface LoginState {
	username: {
		isValid: boolean;
		value: string;
	};
	password: {
		isValid: boolean;
		value: string;
	};
	remember: boolean;
}
interface LoginResult {
	status: string;
	reason: string;
	token: string;
}
export default class Login extends React.Component<RouteComponentProps<any>,LoginState> {
	private validateUsername = /[\S]{3,}/;
	private validatePassword = /[\S]{8,}/;
	constructor() {
		super();
		this.state = {
			username: {
				isValid: false,
				value: ""
			},
			password: {
				isValid: false,
				value: ""
			},
			remember: false
		};

		Network.socket.on("login", (data: LoginResult) => {
			switch(data.status) {
				case "failed":
					// console.log(data.reason);
					break;
				case "ok":
					if(data.token) {
						const rememberData = JSON.stringify({
							username: this.state.username.value,
							token: data.token
						});
						localStorage.setItem("remember", rememberData);
					}
					this.props.history.push("/home");
					break;
			}
		});
		Network.socket.on("login-session", (data: LoginResult) => {
			switch(data.status) {
				case "failed":
					// localStorage.removeItem("remember");
					console.log(data.reason);
					break;
				case "ok":
					this.props.history.push("/home");
					break;
			}
		});
	}

	public componentWillMount() {
		const query = queryStringToJson(urlToQueryString(this.props.location.search)) as any;
		if(query.username) {
			this.state.username.value = query.username;
			this.state.username.isValid = this.validateUsername.test(query.username);
			this.forceUpdate();
		}

		const remember = localStorage.getItem("remember");
		if(remember) {
			const data = JSON.parse(remember);
			Network.socket.emit("login-session", data);
		}
	}

	public render() {
		const isValid = this.state.password.isValid && this.state.username.isValid;
		return <div>
			<div>
				<input type="username" placeholder="username" name="username" onChange={this.onChange} value={this.state.username.value} />
				<input type="password" placeholder="password" name="password" onChange={this.onChange} />
				<input type="checkbox" name="remember" onChange={this.onChange} /> Remember me
				<button onClick={this.onLogin} disabled={!isValid}>login</button>
			</div>
			<Link to="signup">Signup</Link>
		</div>;
	}

	private onChange = (e: React.FormEvent<HTMLInputElement>) => {
		let value: string;
		let isValid: boolean;
		switch(e.currentTarget.name) {
			case "password":
				value = btoa(e.currentTarget.value);
				isValid = this.validatePassword.test(e.currentTarget.value);
				this.setState({
					password: {
						value,
						isValid
					}
				});
				break;
			case "username":
				value = e.currentTarget.value;
				isValid = this.validateUsername.test(value);
				this.setState({
					username: {
						value,
						isValid
					}
				});
				break;
			case "remember":
				this.setState({
					remember: !this.state.remember
				});
				break;
		}
	}

	private onLogin = () => {
		Network.socket.emit("login", {
			username: this.state.username.value,
			password: this.state.password.value,
			remember: this.state.remember
		});
	}
}
