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

    this.props.teamDetails(id).then(() => {
      if(this.props.CheckSeshUser.avatar){
        var updateAvatar = {
          avatar: this.props.CheckSeshUser.avatar,
          id
        }
        axios.post('/avatar-projectlist', updateAvatar).then((data) => {
          console.log("DATAAA", data)
        })
      }
    })
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

    const { members, teamInfo } = this.props.teamDet;
    console.log("TEAM MEMBERS ARRAY", members)

    let nothing = null;
    var adminPresent = false;
    var joined = false;

    if(members.length > 0){

      for(var i = 0; i < members.length ; i++ ){
        console.log("HEEEYYYYYYYYYYYY")
        if(this.props.CheckSeshUserID === members[i]._id){
          console.log("MATCHEDDDD")
          joined = true;
        }
      }

    }
    
    if(this.props.CheckSeshUserID === this.props.teamDet.adminID){ 
      adminPresent = true;
    }

    var teamMems = "";

    //What ever html is being created in map, needs to be wrapped inside a html dom element
    if(members.length > 0){
      teamMems = members.map((members, i) =>
        <div key={i} className='container'>
          <h4>{members.username}<span><img className='navbar-profilepic img-circle' src={members.avatar ? members.avatar : "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg" } /></span></h4>

        {/*put the part where tasks are displayed into an another component Tasks since before
        when it was in this component, the map function would give them all the same onClick function
        that would set the same state to open the Collapse component. By putting it inside its own
        component and then putting the component inside the map function, each component will have its
        own version of the state `open`. That is why clicking on one would now not open all of them.
        It like making a new instance of the Task compoent class with each map and they all have their
        own copies of the variables/states and functions etc*/}

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

            <div className='container' data-mid={this.props.teamDet.teamInfo._id} data-admin={this.props.teamDet.adminID}>

              <h1>Project Name</h1>
              <h3>{this.props.teamDet.teamInfo.teamname}</h3>
              <h2>Project Admin</h2>
              <h3>{this.props.teamDet.admin}<span><img className='navbar-profilepic img-circle' src={this.props.teamDet.teamInfo.adminAvatar ? this.props.teamDet.teamInfo.adminAvatar : "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg" } /></span></h3>
              <h2>Technologies and Languages</h2>
              <h3>{this.props.teamDet.teamInfo.tech}</h3>
              <h2>Project Details</h2>
              <h3>{this.props.teamDet.teamInfo.description}</h3>
              <h2>Team Members</h2>
      
                  {teamMems}
              
              {

                joined || adminPresent

                ?

                  nothing

                :

                  <button type='button' onClick={this.handleJoin}>Join Team</button>

              }

              <TasksForms {...this.props} /> 
            </div>

      </div>
    );
  }
}

export default ProjectDetails;
