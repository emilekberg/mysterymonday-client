import * as React from "react";
import * as ReactDOM from "react-dom";
import io from "socket.io-client";

const socket = io("http://localhost:8080");
socket.on("connect", () => {
	console.log("hey");
})

class App extends React.Component {
	public render() {
		return <div>Hellooo! Fan vad kul</div>;
	}
}

ReactDOM.render(
	<App />,
	document.getElementById("root")
);
