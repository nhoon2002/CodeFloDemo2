import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { FormGroup, FormControl, ControlLabel, Button, Collapse, Well } from 'react-bootstrap';
import TasksForms from '../components/forms/tasksForms.jsx';
import Tasks from '../components/ShowTasks.jsx';

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {}

    this.handleJoin = this.handleJoin.bind(this);
    this.open = this.open.bind(this);
    // this.openCollapse = this.openCollapse.bind(this);
  }

  componentWillMount() {
    console.log("HEEEEEEEEEEEEEEEEEEEEEY")
    var id = this.props.router.params.id
    console.log("ID IN componentDidMount PROEJECT DETAILS", id)

    this.props.teamDetails(id);
  }

  handleJoin(e) {
    this.props.addMember(this.props.CheckSeshUserID, this.props.teamDet.teamInfo._id)

    this.props.router.push('/newproject');
  }

  // openCollapse(event) {
  //   this.setState({open: !this.state.open})

  //   var projectID = this.props.router.params.id;
  //   var userID = event.target.getAttribute('data-memberID');

  //   this.props.populateTasks(projectID, userID)
  // }

  open(event) {
    this.props.openModalTask()
    var userID = event.target.getAttribute('data-member-id')

    //sets the userID in the button to open modal to the store so that it can be referenced in <TasksForms/>
    this.props.taskAssignUser(userID);
  }

  render() {

    const { members } = this.props.teamDet;
    console.log("TEAM MEMBERS ARRAY", members)

    let nothing = null;
    var adminPresent = false;
    if(this.props.CheckSeshUserID === this.props.teamDet.adminID){ 
      adminPresent = true;
    }

    var teamMems = "";

    //What ever html is being created in map, needs to be wrapped inside a html dom element
    if(members.length > 0){
      teamMems = members.map((members, i) =>
        <div key={i} className='container'>
          <h4>{members.username}</h4>

    

          <Tasks {...this.props} members={members} />
          {

            adminPresent 

            ? 
              <div>
                <Button className="createButton" bsStyle="info" data-member-id={members._id} onClick={this.open}>
                  Assign a Task
                </Button>
              </div>
           
            : 

            nothing

          }
        </div>
        
      ) 
    }


    return (
      //One of the problems was previously I had this.props.teamDetails, but this did not work since I already had an 
      //action function called teamDetail. That is why it was not recognizing this.props.teamDetails._id etc, 
      //because teamDetails was a function. In the react dev tool it was also showing as a function and not the state
      //properties I needed
      <div className='container'>

            <div className='jumbotron teams' data-mid={this.props.teamDet.teamInfo._id} data-admin={this.props.teamDet.adminID}>

              <h1>Project Name</h1>
              <h3>{this.props.teamDet.teamInfo.teamname}</h3>
              <h2>Project Admin</h2>
              <h3>{this.props.teamDet.admin}</h3>
              <h2>Technologies and Languages</h2>
              <h3>{this.props.teamDet.teamInfo.tech}</h3>
              <h2>Project Details</h2>
              <h3>{this.props.teamDet.teamInfo.description}</h3>
              <h2>Team Members</h2>
      
                  {teamMems}
    
              <button type='button' onClick={this.handleJoin}>Join Team</button>
              <TasksForms {...this.props} /> 
            </div>

      </div>
    );
  }
}

export default ProjectDetails;
