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
    // this.handleClick = this.handleClick.bind(this);
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
  // shouldComponentUpdate(nextProps) {
	// 	if (this.props.teamModal !== nextProps.teamModal) {
	// 		console.log('ComponentUpdate Received');
	// 		this.forceUpdate();
	// 		return true;
	// 	}
	// 	return false;
	// }
 

  render() {
    // const reverseState = this.state.teams.reverse()
    return (
      <div className='container'>

          {/* Using the .reverse() method to show most revent at the top. */}

          {this.state.teams.map((team, i) =>
            <Link key={i} to={'/newproject/' + team._id}>
            <div className='jumbotron teams general-projects'>
              <h1 data-mid={team._id}>{team.teamname}</h1>
              <h2 data-mid={team._id}>{team.tech}</h2>
              <h3 data-mid={team._id}>{team.description}</h3>

              <h3> Members:</h3>
              {/* {team.teamMembers} */}
              {team.teamMembers.map((member, j) =>
              <h3 key={j}>{member.username}</h3>)}



            </div>
            </Link>
          )}

      </div>
    );
  }
}

export default ProjectList;
