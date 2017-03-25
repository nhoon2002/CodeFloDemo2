import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';


// import LoginModal from '../components/LoginModal.jsx'




class ProjectForm extends Component {

      constructor(props) {
   		super(props);



   		this.open = this.open.bind(this)
   		this.close = this.close.bind(this)

   		this.handleForm = this.handleForm.bind(this);

   	}


   	handleForm(e){
   		console.log("Team Creation Control", this.refs.teamname.value)
   		var formInput = {
   			teamname: this.refs.teamname.value,
   			description: this.refs.description.value,
   			tech: this.refs.tech.value

   		}

   		console.log("FORMMMM INPUTTTT", formInput);


        this.props.create(formInput)
        this.props.router.push('/newproject');


      }



   	close() {
   		this.props.close()
   	}

   	open() {
   		this.props.open()
   	}

   	render() {

        return (
           <div>
             <Button
            className="createButton"
    				bsStyle="primary"
    				onClick={this.open}
    			>
    				Create New Team
    			</Button>


    			<Modal show={this.props.show} onHide={this.close}>
    				<Modal.Header closeButton>
    					<Modal.Title>Create Your Team</Modal.Title>
    				</Modal.Header>
    					<Modal.Body>


    					<form>
    						<div className="form-group">
    						    <label htmlFor="inputTeamName" className="sr-only">Team Name</label>
    						    <input type="text" ref="teamname" id="inputTeamName" className="form-control" placeholder="Name of your Team / Project" />
    						</div>

    						<div className="form-group">
    						    <label htmlFor="inputDescription" className="sr-only">Description</label>
    						    <input type="text" ref="description" id="inputDescription" className="form-control" placeholder="A brief description" />
    						</div>

    					   <div className="form-group">
    						    <label htmlFor="inputTech" className="sr-only">Technologies Used</label>
    						    <input type="text" ref="tech" id="inputTech" className="form-control" placeholder="i.e. Node.js, Java, MERN, MySQL..." />
    						</div>

                     <div className="form-check">
                       <label className="form-check-label">
                         <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="private" />
                         Private
                       </label>
                     </div>
    					</form>

    					</Modal.Body>
    				<Modal.Footer>
                  <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.handleForm}>Register Team</button>
    					<button className="btn btn-lg btn-warning btn-block" type="button" onClick={this.close}>Close</button>
    				</Modal.Footer>
    			</Modal>

 		   </div>

    );
  }

};

export default ProjectForm;
