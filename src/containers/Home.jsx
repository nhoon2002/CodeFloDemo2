import React, { Component } from 'react';
import Register from './Register.jsx';
import LoginModal from '../components/LoginModal.jsx';
import regisCont from './registerCont.jsx';




const Home = React.createClass ({
	render() {

        let random = null;

        return (
        <div>

            <div className="jumbotron home">
                <h1 className="homeBanner">Welcome to</h1>

                {
                    this.props.isLoggedInCheck || this.props.isLoggedInReg

                    ?

                    random

                    :
                    <div>
                    <Register
                        open={this.props.openModal}
                        close={this.props.closeModal}
                        show={this.props.showModal}
                        create={this.props.createUser}
                        regErr={this.props.errorMsgs}
                    />

                    <LoginModal
                        open={this.props.openModalL}
                        close={this.props.closeModalL}
                        show={this.props.loginModal}
                        logg={this.props.login}
                    />
                    </div>
                }

            </div>


        </div>

    );
  }

});


export default Home;
