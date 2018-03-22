import * as React from "react";
import Network from "../../network";
interface GroupSelectorProps {
	groups: Array<{name: string}>;
}
export default class Groups extends React.Component<GroupSelectorProps, {}>{
	constructor(props: GroupSelectorProps) {
		super(props);
	}

	render() {
		const groups = this.props.groups.map((group, i) => {
			return <p key={i}>{group.name}</p>
		});
		return <div>
			<h5>Your Groups</h5>
			{
				groups
			}
		</div>
	}
}
