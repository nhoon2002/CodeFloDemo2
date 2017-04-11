import React, { Component } from 'react';
import axios from 'axios';
import { Button, Collapse, Well } from 'react-bootstrap';

class Tasks extends Component {
	constructor(props){
		super(props)

		this.state = {
			tasks: ""
		}

		this.openCollapse = this.openCollapse.bind(this);
	}

	openCollapse(event) {
	    this.setState({open: !this.state.open})
	    // console.log("TASK SET STATE", this.state.tasks)
	    var projectID = this.props.router.params.id;
	    var userID = event.target.getAttribute('data-memberID');

		 //******can attach a .then to asynchronous actions. Since this action creator 
	    //function this.props.populateTasks returns an axios request, I am able to attach a then() to it
	    //and then set the state.	  
	    this.props.populateTasks(projectID, userID).then(() => {
	    	this.setState({tasks: this.props.userTasks})
			console.log("PROPS USER TASKS", this.state.tasks)
	    	
	    })
	}

	render(){
		const { members } = this.props;
		console.log("MEMBERS", members);

		let nothing = null;

		return (
				<div className="container">
				  <Button bsStyle="success" className="open-collapse-button" data-memberID={members._id} onClick={this.openCollapse}>View Tasks</Button>
			          <Collapse className="task-collapse" in={this.state.open}>
			            <div>
			              <Well>
			              { 
			                this.state.tasks 

			                ?

			                this.state.tasks.map((task, i) => 
			                  <p key={i}>{task.task.toString()}</p>
			                )

			                :

			                nothing
			              }
			              </Well>
			            </div>
			          </Collapse>
			    </div>
		)
	}
}

export default Tasks;