import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { browserHistory, Link } from "react-router";
import Coverflow from 'react-coverflow';
import * as Blueprint from "@blueprintjs/core";
import ProjectForm from './ProjectForm.jsx';

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

    const size = 5

    return (
      <div className='container'>
        <Coverflow width="1400" height="400"
          displayQuantityOfSide={2}
          navigation={true}
          enableScroll={true}
          clickable={true}
          active={2}
          >


            {this.state.teams.slice(0, size).map((team, i) =>
              <div className='coverflowdiv' key={i}>
                <Link to={'/newproject/' + team._id}>
                <span><h1 className='coverflow_h1' data-mid={team._id}>{team.teamname}</h1></span>
                <div>
                <img className='img-circle carousel' src='https://placehold.it/70x70/?text=admin'/>
                </div>
                </Link>
              </div>





            )}



        </Coverflow>

        <ProjectForm

          open={this.props.openModalT}
          close={this.props.closeModalT}
          show={this.props.teamModal}
          create={this.props.createTeam}
          router={this.props.router}
          user={this.props.CheckSeshUserID}
          //  updateTeams = {this.props.updateTeams
        />
        {/* CARDS */}
        <div className="docs-card-example">


          {/* // {(i%3=0) ? <div className='row'> : null} */}
          <div className='row'>

            {/* <div className='col-md-4 col-lg-3 col-sm-6'>
              <div className="pt-card pt-elevation-2 pt-interactive">

                <ProjectForm {...this.props} />
              </div>
            </div> */}
            {this.state.teams.map((team, i) =>
              <div className='col-md-4 col-lg-3 col-sm-6'>
                <div className="pt-card pt-elevation-2 pt-interactive" key={i}>
                  <Link to={'/newproject/' + team._id}>
                    <h3 className="pt-card-h3" data-mid={team._id}>{team.teamname}</h3>
                  </Link>
                  <p data-mid={team._id}><strong>Tech Stack</strong>: {team.tech}</p>
                  <p data-mid={team._id}><br /><strong>Description:</strong>: {team.tech}</p>
                </div>
              </div>

              )}
          </div>
        </div>





          {/* Using the .reverse() method to show most revent at the top. */}

          {/* {this.state.teams.map((team, i) =>
            <div className='jumbotron teams general-projects' key={i}>
              <Link to={'/newproject/' + team._id}>
              <h1 data-mid={team._id}>{team.teamname}</h1>
              </Link>
              <h2 data-mid={team._id}>{team.tech}</h2>
              <h3 data-mid={team._id}>{team.description}</h3>

              <h3> Members:</h3>

              {team.teamMembers.map((member, j) =>
              <h3 key={j}>{member.username}</h3>)}



            </div>
          )} */}




      </div>
    );
  }
}

export default ProjectList;
