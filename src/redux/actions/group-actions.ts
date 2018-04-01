export enum GroupActions {
	CHANGE_GROUP = 'change-group'
}
export const changeGroup = (group: string) => ({
	type: GroupActions.CHANGE_GROUP,
	group
});