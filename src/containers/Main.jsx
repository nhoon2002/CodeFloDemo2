import React, { Component } from 'react';
import Header from '../components/Header.jsx';
// import ChatBox2 from '../components/ChatBox2.jsx';
import Chat from './Chat.jsx';



class Main extends Component {

  render() {
    return (
      <div className="Main">

         <Header
           logout={this.props.logout}
           logCheck={this.props.isLoggedInCheck}
           logRegCheck={this.props.isLoggedInReg}
           router={this.props.router}
           avatar={this.props.CheckSeshUser.avatar}
         />


        <div className="container Main-content">
      {/*<iframe width="560" height="315" src="https://www.youtube.com/embed/xUxIlLWjkgk?autoplay=1&playlist=xUxIlLWjkgk&loop=1"></iframe>*/}

          {React.cloneElement(this.props.children, this.props)}


        </div>

      <Chat {...this.props} />
      </div>

    );

  }
}

// Main.propTypes = {
// 	children: PropTypes.node,
// 	routes: PropTypes.array
// };

export default Main;
