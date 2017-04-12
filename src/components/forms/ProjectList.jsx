import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { browserHistory, Link } from "react-router";
// import { Link } from 'react-router';

class ProjectList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: []
    };
    this.profile = this.profile.bind(this);
  }

  componentDidMount() {
    // axios.get('/teams')
    //   .then(res => {
    //     const teams2 = res.data.map(obj => obj);
    //     console.log('teams', teams2);
    //     // const members = res.data.
    //   });

      axios.get('/populate').then(res=> {
        console.log(res)
        const teams = res.data.reverse().map(obj => obj);
        this.setState({ teams });
        console.log("populate teams",teams);

      });
  }


  profile(event){

    let id = event.target.getAttribute('data-id');
    // let username = event.target.getAttribute('data-username');

    console.log("ID", id);

    browserHistory.push('/profile/' + id)
  }
 

  render() {
    // const reverseState = this.state.teams.reverse()
    let nothing = null;

    return (
      <div className='container'>

          {this.state.teams.map((team, i) =>
           <div key={i} className='jumbotron teams general-projects'>
            <Link to={'/newproject/' + team._id}>
              <h1 data-mid={team._id}>{team.teamname}</h1>
            </Link>
              <h1>{team.adminName}<span><img className='navbar-profilepic img-circle' src={team.adminAvatar ? team.adminAvatar : "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg" } /></span></h1>
              <h2 data-mid={team._id}>{team.tech}</h2>
              <h3 data-mid={team._id}>{team.description}</h3>

              <h3> Members:</h3>
              {/* {team.teamMembers} */}
              {team.teamMembers.map((member, j) =>
              <h3 key={j} data-username={member.username} data-id={member._id} onClick={this.profile}>{member.username}<span><img className='navbar-profilepic img-circle' src={member.avatar ? member.avatar : "http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg" } /></span></h3>)}

            </div>
          )}

      </div>
    );
  }
}

export default ProjectList;
