import * as React from "react";

interface LoaderState {
	tickCount: number;
}
export default class Loader extends React.Component<{},LoaderState> {
	private intervalId: number;
	constructor() {
		super();
		this.state = {
			tickCount: 0
		};
	}
	public componentWillMount() {
		if(this.intervalId === -1) {
			this.clearInterval();
		}
		this.intervalId = window.setInterval(() => {
			this.setState({
				tickCount: this.state.tickCount + 1
			});
		}, 50);
	}

	public componentWillUnmount() {
		this.clearInterval();
	}

	public render() {
		let sign = "-";
		switch(this.state.tickCount%5) {
			case 0:
				sign = "-";
				break;
			case 1:
				sign = "\\";
				break;
			case 2:
				sign = "|";
				break;
			case 3:
				sign = "/";
				break;
		}
		let dots = "";
		for(let i = 0; i < (this.state.tickCount / 10) % 3; i++) {
			dots += ".";
		}
		if(!dots) {
			dots = ".";
		}
		return <div className="loader"><span>[{sign}]</span>Loading<span>{dots}</span></div>;
	}

	private clearInterval() {
		window.clearInterval(this.intervalId);
		this.intervalId = -1;
	}
}
