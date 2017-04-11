export function teamDetailsReducer (state= {
	teamInfo: "",
	admin: "",
	adminID: "",
	teamMembers: ""
	}, action) {


	switch (action.type) {
		case "SET_TEAM_DETAILS": {
			return {
				...state,
				teamInfo: action.payload.teamInfo,
				admin: action.payload.admin,
				adminID: action.payload.adminID,
				teamMembers: action.payload.teamMembers
			}
		}
		default: {
			return {...state}
		}
	}

	return state;
}