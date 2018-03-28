export const CHANGE_GROUP = 'change-group';
export const changeGroup = (group: string) => ({
	type: CHANGE_GROUP,
	group
});
export default changeGroup;