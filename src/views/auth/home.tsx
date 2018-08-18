import * as React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import Network from "../../network";
import { Dispatch, connect } from "react-redux";
import TextInput from "../../components/text-input"
import { ApplicationState } from "../../state/application-state";
interface HomeState {
	restaurants: Array<{
		name: string,
		average: number
	}>;
}
interface HomeProps {
	selectedGroup: string;
	dispatch: Dispatch<ApplicationState>
}
const mapStateToProps = (state: ApplicationState) => {
	return {
		selectedGroup: state.group.selected,
	};
}
class Home extends React.Component<HomeProps, HomeState> {
	private validateUsername = /[\S]{3,}/;
	private validatePassword = /[\S]{8,}/;

	state: HomeState = {
		restaurants: []
	}

	public componentDidMount() {
		Network.socket.on("restaurant-score", (data: {status: "ok"|"failed", restaurants: Array<{name: string, average: number}>}) => {
			if(data.status === "failed") {
				return;
			}
			const {restaurants} = data;
			this.setState({
				restaurants
			});
		});
		if(this.props.selectedGroup) {
			Network.socket.emit("get-restaurants-score", { group: this.props.selectedGroup });
		}
	}

	public componentWillUpdate(nextProps: HomeProps) {
		if(nextProps.selectedGroup !== this.props.selectedGroup) {
			Network.socket.emit("get-restaurants-score", { group: nextProps.selectedGroup });
		}
	}

	public componentWillUnmount() {
		Network.socket.removeEventListener("add-restaurant");
		Network.socket.removeEventListener("restaurant-score");
		Network.socket.removeEventListener("selected-group");
	}

	public render() {
		return <>
			<h3>Home</h3>
			<div>
				<div><Link to="/manage-restaurants">Manage Restuarants</Link></div>
				<div><Link to="/manage-groups">Manage Groups</Link></div>
			</div>
			<h4>Reviewed restaurants in {this.props.selectedGroup}</h4>
			{this.renderTable()}
			<div>
				<TextInput placeholder="autocomplete" autocomplete={["hejsan", "emil", "är", "emil igen", "jag tycker om emil"]} />
			</div>
		</>;
	}

	private renderTable() {
		return <table>
			<thead>
				<tr>
					<th>restaurant name</th>
					<th>total average score</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
			{
				this.state.restaurants.map(({name, average}, i) => {
					return <tr key={i}>
						<td>{name}</td>
						<td>{average}</td>
						<td><Link to={`/restaurant?name=${name}`}>view</Link></td>
					</tr>;
				})
			}
			</tbody>
		</table>;
	}
}
export default connect(
	mapStateToProps
)(Home); 