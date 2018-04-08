import * as React from "react";

interface Props {
	autocomplete: Array<string>;
	defaultValue?: string;
	placeholder?: string;
	type?: string;
	disabled?: boolean;
	value?: string;
	required?: boolean;
	onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
}
interface State {
	text: string;
	hasInputChanged: boolean;
	hasFocus: boolean;
	overrideAutocorrectTimeoutReached: boolean
	selectedAutocompleteIndex?: number;
}
export default class TextInput extends React.Component<Props, State> {
	state: State = {
		text: "",
		hasFocus: false,
		overrideAutocorrectTimeoutReached: false,
		hasInputChanged: false
	}
	private timeoutId?: NodeJS.Timer;

	render() {
		const {autocomplete, ...rest} = this.props;
		const inputHasFocusAndBeenUpdated = (this.state.hasFocus && this.state.hasInputChanged);
		const showAutocomplete = inputHasFocusAndBeenUpdated || this.state.overrideAutocorrectTimeoutReached;
		const found = showAutocomplete || this.state.overrideAutocorrectTimeoutReached ? <div>{autocomplete
			.filter(s => s.includes(this.state.text))
			.map((s, i) => <p key={i}>{s}</p>)}</div> : null;
		return <div className="autocomplete">
			<input
				{...rest}
				value={this.state.text}
				onInput={e => this.onInput(e)}
				onFocus={e => this.onFocus()}
				onBlur={e => this.onBlur() }
				onKeyDown={e => this.onKeyDown(e)}
			/>
			{found}
		</div>
	}

	private onFocus() {
		this.setState({
			hasFocus: true
		});
		if(this.timeoutId) {
			clearTimeout(this.timeoutId)
		}
		this.timeoutId = setTimeout(() => {
			this.setState({
				overrideAutocorrectTimeoutReached: true
			});
		}, 500);
	}

	private onBlur() {
		if(this.timeoutId) {
			clearTimeout(this.timeoutId)
		}
		this.setState({
			hasFocus: false,
			overrideAutocorrectTimeoutReached: false,
			hasInputChanged: false,
			selectedAutocompleteIndex: undefined
		});
	}

	private onInput(e: React.FormEvent<HTMLInputElement>) {
		this.setState({
			text: e.currentTarget.value,
			hasInputChanged: true
		});
		if(this.props.onInput) {
			this.props.onInput(e);
		}
		
	}

	private onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		let {selectedAutocompleteIndex} = this.state;
		if(!selectedAutocompleteIndex) {
			selectedAutocompleteIndex = 0;
		} else if(e.keyCode === 38) {
			selectedAutocompleteIndex++;
		} else if (e.keyCode === 40) {
			selectedAutocompleteIndex--;
		}
		this.setState({
			selectedAutocompleteIndex
		});
	}
}