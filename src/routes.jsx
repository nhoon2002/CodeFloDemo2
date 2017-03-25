import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store.js';
import App from './containers/App.jsx';
// import Main from './containers/Main.jsx';
import Home from './containers/Home.jsx';
import Profile from './containers/Profile.jsx';
// import TodoApp from './containers/TodoApp.jsx';
import Register from './containers/Register.jsx';
import NewProject from './containers/NewProject.jsx';
import ProjectDetails from './containers/ProjectDetails.jsx'
import { checkSession } from './actions/usersAction';

// <Route path="/register" onEnter={checkSesh()} component= {Register} />
const checkSesh = () => {
	console.log("INSIDE CHECK SESH FUNCTION");
	store.dispatch(checkSession());
}


const theRoutes = (
   	<Provider store={store}>
	  	<Router history={history}>
		    <Route path="/" component={App}>

		      <IndexRoute onEnter={checkSesh} component={Home}/>
		      <Route path="/profile" onEnter={checkSesh} component= {Profile} />
		      <Route path="/newproject" onEnter={checkSesh} component= {NewProject} />
		      <Route path="/newproject/:id" onEnter={checkSesh} component= {ProjectDetails} />

		    </Route>
		</Router>
	</Provider>
  );

export default theRoutes;
