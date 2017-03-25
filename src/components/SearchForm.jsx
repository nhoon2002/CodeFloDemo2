import axios from 'axios';
import React, { Component, Props }from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
const AsyncExample = React.createClass({
  getInitialState() {
    return {
      options: [],
    };
  },


  render() {
    return (


      <AsyncTypeahead
        labelKey="username"
        onSearch={this._handleSearch}
        options={this.state.options}
        placeholder="Search for a user..."
        renderMenuItemChildren={(option, props, index) => (
          <div onClick={this._handleClick} data-user={option.username}>
            <img
              data-user={option.username}
              className='img-circle'
              src='http://placehold.it/30x30'
              style={{

                marginRight: '10px'

              }}
            />
            <span data-user={option.username}>{option.username}</span>
            {/* .login is the username field from the github response. */}
          </div>

        )}
      />


    );
  },

  _handleSearch(query) {
    if (!query) {
      return;
    }


    fetch(`/register/${query}`)
      .then(resp => resp.json())
      // // .then(json => console.log(this))
      .then(json => this.setState({options: json}))


      // this.setState({options: data})



  },
  _handleClick(e){
    var id = e.target.dataset.user;
    console.log(id);
    this.props.router.push('/user/'+id);
  }
});
export default AsyncExample;
