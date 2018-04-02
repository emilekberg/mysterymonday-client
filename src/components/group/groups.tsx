import * as React from "react";
import Network from "../../network";
interface GroupSelectorProps {
	groups: Array<{name: string}>;
}
export const Groups: React.StatelessComponent<GroupSelectorProps> = (props) => {
	const groups = props.groups.map((group, i) => {
		return <p key={i}>{group.name}<button>Edit</button></p>
	});
	return <div>
		<h5>Your Groups</h5>
		{
			groups
		}
	</div>
};
export default Groups;