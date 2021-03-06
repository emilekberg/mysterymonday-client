import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Network from "../network";
interface SignupState {
	username: {
		isValid: boolean;
		value: string;
	};
	email: {
		isValid: boolean;
		value: string;
	};
	password: {
		isValid: boolean;
		value: string;
	};
	verifyPassword: {
		isValid: boolean;
		value: string;
	};
}
interface SignupResult {
	status: string;
	reason: string;
}
export default class Signup extends React.Component<RouteComponentProps<any>,SignupState> {
	private validateUsername = /[\S]{3,}/;
	private validatePassword = /[\S]{3,}/;
	private validateMail = /([.\S]+)(@)([.\S]+\.[.\S]+)/;
	constructor(props: any) {
		super(props);
		this.state = {
			username: {
				isValid: false,
				value: ""
			},
			email: {
				isValid: false,
				value: ""
			},
			password: {
				isValid: false,
				value: ""
			},
			verifyPassword: {
				isValid: false,
				value: ""
			}
		};

		Network.socket.on("signup", (data: SignupResult) => {
			switch(data.status) {
				case "ok":
					this.props.history.push(`/?username=${this.state.username.value}`);
					break;
			}
		});
	}
	public render() {
		const isValid = this.state.password.isValid && this.state.verifyPassword.isValid && this.state.username.isValid && this.state.email.isValid && (this.state.password.value === this.state.verifyPassword.value);
		return <>
			<div>
				<input type="username" placeholder="username" name="username" onChange={this.onChange} />
				<input type="email" placeholder="email" name="email" onChange={this.onChange} />
				<input type="password" placeholder="password" name="password" onChange={this.onChange} />
				<input type="password" placeholder="verify password" name="verifyPassword" onChange={this.onChange} />

				<button onClick={this.onSignup} disabled={!isValid}>signup</button>
			</div>
		</>;
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
			case "verifyPassword":
				value = btoa(e.currentTarget.value);
				isValid = this.validatePassword.test(e.currentTarget.value);
				this.setState({
					verifyPassword: {
						value,
						isValid
					}
				});
				break;
				case "email":
				value = e.currentTarget.value;
				isValid = this.validateMail.test(e.currentTarget.value);
				this.setState({
					email: {
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
		}
	}

	private onSignup = () => {
		Network.socket.emit("signup", {
			username: this.state.username.value,
			email: this.state.email.value,
			password: this.state.password.value
		});
	}
}
