
import React, { Component } from 'react';
import ChatBox2 from '../components/ChatBox2.jsx'
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import io from 'socket.io-client';
const clientSocket = io();

class Chat extends Component {
// socket = {};
	constructor(props) {
    super(props);

	 clientSocket.on('sockusers', (payload1, payload2, payload3) => {
		console.log('Sockusers, avatars received');
		console.log(payload1, payload2, payload3);
		this.updateSockusers(payload1, payload2, payload3);
	 })


	 this.state = { showChat: false, sockusers: [], avatars: [], usernames: [] }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
	 this.updateSockusers = this.updateSockusers.bind(this);
	}

	  close() {
	    this.setState({ showChat: false });
		  clientSocket.emit('chat closed', this.props.CheckSeshUser)


	  }

	  open() {
		  this.setState({ showChat: true});
		  clientSocket.emit('chat opened', this.props.CheckSeshUser)
		  clientSocket.emit('get sockusers', this.props.CheckSeshUserID);
	  }

	  updateSockusers(payload1, payload2, payload3) {

		  this.setState({sockusers: payload1, avatars: payload2, usernames: payload3})
		  console.log('sockusers state updated: %s', this.state.sockusers);
	  }
	//   componentDidMount() {
	// 	  console.log('component did mount');
	// 	  this.updateSockusers();
	//   }
	//  shouldComponentUpdate(nextProps, nextState) {
   //  // return a boolean value
   //  	return true;
	//  }
	//   componentWillUpdate() {
	// 	  console.log('component will update');
	// 	  this.updateSockusers();
	//   }


		render() {



   return(
		 <div>
			 {/* <Link to='/chat/lobby'> */}
				 <Button
					 bsStyle="primary"
					 bsSize="large"
					 onClick={this.open}
					 >
					 Enter Chat Lobby
				 </Button>
		 	 {/* </Link> */}
			 <Modal show={this.state.showChat} onHide={this.close}>
			           <Modal.Header closeButton>
			             <Modal.Title>Lobby</Modal.Title>
			           </Modal.Header>
			           <Modal.Body>
							   {this.state.avatars.map((avatar, i) =>
								  <img className='img-circle' src={avatar} key={i}/>
							  )}


			        			<ChatBox2 {...this.props} clientSocket={clientSocket}/>
			           </Modal.Body>
			           <Modal.Footer>
			             <Button onClick={this.close}>Close</Button>
			           </Modal.Footer>
			         </Modal>
	 	 </div>
   )
   }
}

export default Chat;
