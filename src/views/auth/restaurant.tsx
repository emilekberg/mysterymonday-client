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

		Network.socket.once("ratings", (data: any) => {
			if(data.status !== "ok") {
				this.setState({
					error: "error while fetching data"
				});
			}
			else if(!Array.isArray(data.ratings)) {
				this.setState({
					data: data.ratings
				});
			}
			else if(data.ratings.length > 0) {
				this.setState({
					error: "got too much data ffs"
				});
			}
		});
	}

	public componentWillMount() {
		const {name} = getQuery<any>();
		this.setState({
			name
		});

		Network.socket.emit("find-ratings", {
			restaurant: name
		});
	}

	public render() {
		let elements: JSX.Element | undefined;
		if(this.state.error) {
			elements = <h3>ERROR: {this.state.error}</h3>;
		}
		else if(this.state.data) {
			const {cost, cozyness, service, taste} = this.state.data.rating;
			elements = <div>
				<dl>Ordered food</dl>
				<dd>{this.state.data.orderedFood}</dd>
				<dl>General Comment</dl>
				<dd>{this.state.data.comment}</dd>
				<dl>Score</dl>
				<dd>
					<h4>Cost</h4>
					<progress max="5" value={cost.score} />
					<label>{cost.comment}</label>
					<h4>Cozyness</h4>
					<progress max="5" value={cozyness.score} />
					<label>{cozyness.comment}</label>
					<h4>Service</h4>
					<progress max="5" value={service.score} />
					<label>{service.comment}</label>
					<h4>Taste</h4>
					<progress max="5" value={taste.score} />
					<label>{taste.comment}</label>
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