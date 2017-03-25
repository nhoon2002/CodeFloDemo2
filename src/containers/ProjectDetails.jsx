import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentteam: ''
    };
    this.handleJoin = this.handleJoin.bind(this);
  }

  componentDidMount() {
    var id = this.props.location.pathname;
    axios.get(id)
      .then(res => {
        console.log(res);
        const currentteam = res.data[0];
        console.log(currentteam);
        this.setState({ currentteam });
      });
  }

  handleJoin(e) {
    this.props.addMember(this.props.CheckSeshUserID, this.state.currentteam._id)
    console.log(this.state.currentteam);
    this.props.router.push('/newproject');



  }

  render() {

    return (
      <div className='container'>



            <div className='jumbotron teams' data-mid={this.state.currentteam._id}>
              <h1>{this.state.currentteam.teamname}</h1>
              <h2>{this.state.currentteam.tech}</h2>
              <h3>{this.state.currentteam.description}</h3>
              <button type='button' onClick={this.handleJoin}>Join Team</button>
            </div>


      </div>
    );
  }
}

export default ProjectDetails;
