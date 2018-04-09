import * as React from "react";

interface Props {
	autocomplete: Array<string>;
	defaultValue?: string;
	placeholder?: string;
	type?: string;
	disabled?: boolean;
	value?: string;
	required?: boolean;
	onChange?: (s: string) => void;
}
interface State {
	text: string;
	hasInputChanged: boolean;
	hasFocus: boolean;
	selectedIndex?: number;
	filtered: string[]
}
export default class TextInput extends React.Component<Props, State> {
	state: State = {
		text: "",
		hasFocus: false,
		hasInputChanged: false,
		filtered: this.props.autocomplete
	}

	render() {
		const {autocomplete, ...rest} = this.props;
		const inputHasFocusAndBeenUpdated = (this.state.hasFocus && this.state.hasInputChanged);
		const found = (inputHasFocusAndBeenUpdated) && this.state.filtered.length > 0  ? <div className="autocomplete-items">{this.state.filtered
			.map((s, i) => {
				const {text} = this.state;
				const index = s.toLocaleLowerCase().indexOf(text.toLowerCase());
				const first = s.substr(index, text.length);
				const second = s.substr(index+text.length);
				const className = i === this.state.selectedIndex ? 'selected' : '';
				return <div className={className} key={i} onMouseDown={(e) => {this.setText(s)}}>
					<strong>{first}</strong>{second}
				</div>;
			})}</div> : null;
		return <div className="autocomplete">
			<input
				{...rest}
				value={this.state.text}
				onChange={e => this.onChange(e)}
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
	}

	private onBlur() {
		this.setState({
			hasFocus: false,
			hasInputChanged: false,
			selectedIndex: undefined
		});
	}

	private setText(text: string) {
		this.setState({
			text,
			hasInputChanged: false,
			hasFocus: false,
			filtered: this.props.autocomplete.filter(s => s.includes(this.state.text))
		});
		if(this.props.onChange) {
			this.props.onChange(text);
		}
	}

	private onChange(e: React.FormEvent<HTMLInputElement>) {
		this.setState({
			text: e.currentTarget.value,
			hasInputChanged: true,
			selectedIndex: undefined,
			filtered: this.props.autocomplete.filter(s => s.includes(this.state.text))
		});
		if(this.props.onChange) {
			this.props.onChange(e.currentTarget.value);
		}
		
	}

	private onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		let {selectedIndex} = this.state;
		let delta = 0;

		switch(e.keyCode) {
			case 13:
				if(selectedIndex !== undefined) {
					this.setText(this.state.filtered[selectedIndex]);
				}
				break;
			case 38:
				delta = selectedIndex !== undefined ? -1 : this.state.filtered.length;
				break;
			case 40:
				delta = selectedIndex !== undefined ? 1 : 0;
				break;
			default:
				return;
		}
		selectedIndex = Math.max(0, Math.min((selectedIndex || 0) + delta , this.state.filtered.length));
		this.setState({
			selectedIndex
		});		
	}
}