import axios from 'axios';
import fetch from 'isomorphic-fetch'
import { browserHistory } from "react-router";


export function addMember(userid, teamid) {
	return function(dispatch) {
		axios.post(`/updatemember/${userid}/${teamid}`).then((data) => {
					console.log("got to addMember", data);

			 })

	}
}

// export function setTodos(todos) {
// 	return function(dispatch) {
// 		axios.post('/todo', todos).then((data) => {
// 			console.log('RETURN TODOS', data);
// 		})
// 	}
// }





export function createUser(formData) {
	return function(dispatch) {
		axios.post('/register', formData).then((data) => {
			console.log("RETURN DATA FROM AXIOS REGISTER POST", data);
			console.log('\n\n');
			console.log("RETURNed DATA ERRORS", data.data);
			console.log('\n\n');
			if(data.data.length > 0){
				dispatch({ type: "SUCC_CLR_ERRS" });
				dispatch({ type: "ERROR_MSGS", payload: data.data })
			}else{
				console.log("INSIDE CREATE USER ELSE", data)
				dispatch({ type: "SESSION_EXIST", payload: {
						checkSessionId: data.data.sessionUserId,
						checkSessionUser: data.data.sessionInfo

					}
				});
				// sessionUserID: action.payload.checkSessionId,
				// sessionUser: action.payload.checkSessionUser
				dispatch({ type: "SUCC_CLR_ERRS" });

				dispatch({ type: "CLOSE_MODAL", payload: false });
			}
		});
	}
}
export function createTeam(formData) {
	return function(dispatch) {
		axios.post('/teams', formData).then((data) => {
			console.log("RETURN DATA FROM AXIOS TEAM POST", data);
			console.log('\n\n');
			// console.log("RETURNed DATA ERRORS", data.data);
			console.log('\n\n');
			var teamnames = [];
			var techs = [];
			var descriptions = [];
			teamnames.push(data.data.teamname);
			techs.push(data.data.tech);
			descriptions.push(data.data.description);
			dispatch({type: "TEAM_CREATE", payload: {teamname: teamnames, tech: techs, description: descriptions}})
			dispatch({ type: "CLOSE_MODAL_TEAM", payload: false });
			teamnames = [];
			techs = [];
			descriptions = [];


			}
		);
	}
};

// export function updateTeams() {
// 	return function(dispatch) {
// 		axios.get('/teams').then((data) => {
// 			console.log("RETURN DATA FROM AXIOS ALL TEAMS GET", data);
// 			console.log('\n\n');
// 			var teams = [];
// 			teams.push(data.data)
// 			dispatch({type: "UPDATE_TEAMS", payload: {teams: teams}})
// 		})
//
// 	}
// }


// SEND BACK USER SESSION INFO ALSO ON "ONENTER"  // SEND BACK USER SESSION INFO ALSO ON "ONENTER"
export function checkSession() {
	return function(dispatch) {
		axios.get('/checkssion').then((data) => {
			console.log("CHECK SESSION DATA", data);
			if(data.data.sessionUserId){
				dispatch({ type: "SESSION_EXIST", payload: {
						checkSessionId : data.data.sessionUserId,
						checkSessionUser: data.data.sessionUserInfo
					}
				});
			}else{
				dispatch({ type: "NO_SESSION" })
				browserHistory.push('/');
			}
		});
	}
}

export function login(loginInput) {
	return function(dispatch) {

		axios.post('/login', loginInput).then((data) => {
			console.log("USER AFTER LOGIN", data);
			if(data){
				dispatch({ type: "SESSION_EXIST", payload: {
		            checkSessionId: data.data.sessionUserId,
				    checkSessionUser: data.data.sessionInfo
				    }
				});
				dispatch({ type: "CLOSE_MODAL_LOG", payload: false})
			}else{
				dispatch({ type: "NO_SESSION" })
			}
		})
		// .catch((err) => {
		// 	debugger;
		// });

	}
}

export function logout(){
	return function(dispatch) {
		console.log("INSIDE LOG OUT ACTION");
		axios.get('/logout').then((data) => {
			console.log("DATA AFTER SERVER LOG OUT", data)
			dispatch({ type: "NO_SESSION" });
			browserHistory.push('/');
		});
	}
}


export function openModal() {
	return {
		type: "OPEN_MODAL",
		payload: true
	}
}

export function closeModal() {
	return {
		type: "CLOSE_MODAL",
		payload: false
	}
}

export function openModalL() {
	return {
		type: "OPEN_MODAL_LOG",
		payload: true
	}
}

export function closeModalL() {
	return {
		type: "CLOSE_MODAL_LOG",
		payload: false
	}
}
export function openModalT() {
	return {
		type: "OPEN_MODAL_TEAM",
		payload: true
	}
}

export function closeModalT() {
	return {
		type: "CLOSE_MODAL_TEAM",
		payload: false

	}
}

export function getPhoto(username, id){
	console.log("username", username)
	return function (dispatch) {
		fetch(`https://api.github.com/users/${username}`).then(function(response){
			return response.json()
		}).then(function(json){
			console.log(json.avatar_url);
			let avatar_url = json.avatar_url;
			console.log(avatar_url)
			if(avatar_url){
				axios.post('/savepic/' + id, { avatarURL: avatar_url }).then((data) => {
					console.log(data);
					dispatch({ type: "SESSION_EXIST", payload: {
			            checkSessionId: data.data.sessionUserId,
					    checkSessionUser: data.data.sessionInfo
					    }
					});

				})
			}else{
				// let avatar_url = "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg"
				// axios.post('/savepic/' + id, { avatarURL: avatar_url }).then((data) => {
				// 	console.log("DEFAULT IMAGE", data)
				// 	dispatch({ type: "SESSION_EXIST", payload: {
			 //            checkSessionId: data.data.sessionUserId,
				// 	    checkSessionUser: data.data.sessionInfo
				// 	    }
				// 	});
				// })
				return;
			}
		})

	}
}

// export function editUsername(id){
// 	return function(dispatch){
// 		axios.post('/edit/username', { id: id }).then((data) => {

// 		})
// 	}
// }

// export function editSkills(id){
// 	return function(dispatch){
// 		axios.post('/edit/skills', { id: id }).then((data) => {

// 		})
// 	}
// }
