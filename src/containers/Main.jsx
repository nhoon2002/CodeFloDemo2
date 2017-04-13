import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import MainFooter from '../components/MainFooter.jsx';
// import ChatBox2 from '../components/ChatBox2.jsx';




class Main extends Component {

  render() {

    return (
      <div className="Main">


         <Header
           {...this.props}
           logout={this.props.logout}
           logCheck={this.props.isLoggedInCheck}
           logRegCheck={this.props.isLoggedInReg}
           router={this.props.router}
           avatar={this.props.CheckSeshUser.avatar}
         />


        <div className="container Main-content">

          {React.cloneElement(this.props.children, this.props)}


        </div>
        <MainFooter {...this.props}/>
      </div>

    );

  }
}

// Main.propTypes = {
// 	children: PropTypes.node,
// 	routes: PropTypes.array
// };

export default Main;
