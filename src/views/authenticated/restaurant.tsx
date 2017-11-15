import * as React from "react";
import {Link, RouteComponentProps} from "react-router-dom";
import Network from "../../network";
import { queryStringToJson, urlToQueryString, getQuery } from "../../utils";
import Loading from "../../components/loading";
interface Rating {
	comment: string;
	orderedFood: string;
	rating: {
		cost: CommentScore;
		cozyness: CommentScore;
		service: CommentScore;
		taste: CommentScore;
	};
}
interface CommentScore {
	comment: string;
	score: number;
}
interface RestaurantState {
	name: string;
	error?: string;
	data?: Rating;
}
export default class Restaurant extends React.Component<RouteComponentProps<{}>, RestaurantState> {
	private validateUsername = /[\S]{3,}/;
	private validatePassword = /[\S]{8,}/;
	constructor() {
		super();
		this.state = {
			name: "",
		};

		Network.socket.on("ratings", (data: any) => {
			if(!Array.isArray(data.ratings)) {
				this.setState({
					data: data.ratings
				});
			}
			else {
				this.setState({
					error: "got too much data ffs"
				});
			}
		});
	}

	public componentWillMount() {
		const query = getQuery<any>();
		this.setState({
			name: query.name
		});

		Network.socket.emit("find-ratings", {
			restaurant: query.name
		});
	}

	public render() {
		let elements: JSX.Element | undefined;
		if(this.state.error) {
			elements = <h3>ERROR: {this.state.error}</h3>;
		}
		else if(this.state.data) {
			elements = <div>
				<dl>Ordered food</dl>
				<dd>{this.state.data.orderedFood}</dd>
				<dl>General Comment</dl>
				<dd>{this.state.data.comment}</dd>
				<dl>Score</dl>
				<dd>
					<h4>Cost</h4>
					<progress max="5" value={this.state.data.rating.cost.score} />
					<label>{this.state.data.rating.cost.comment}</label>
					<h4>Cozyness</h4>
					<progress max="5" value={this.state.data.rating.cozyness.score} />
					<label>{this.state.data.rating.cozyness.comment}</label>
					<h4>Service</h4>
					<progress max="5" value={this.state.data.rating.service.score} />
					<label>{this.state.data.rating.service.comment}</label>
					<h4>Taste</h4>
					<progress max="5" value={this.state.data.rating.taste.score} />
					<label>{this.state.data.rating.taste.comment}</label>
				</dd>
			</div>;
		}
		else {
			elements = <Loading />;
		}
		return <div>
			<Link to="/home">back</Link>
			<h1>{this.state.name}</h1>
			{elements}
		</div>;
	}
}
