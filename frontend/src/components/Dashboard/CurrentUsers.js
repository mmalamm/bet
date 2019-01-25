import React, { Component } from 'react'
import icons from '../../assets/icons';

import { connect } from 'react-redux';

class CurrentUsers extends Component {
  render() {
    console.log('currUsrs', this.props.currentUsers)
    return (
      <div>
        {this.props.currentUsers.map(usr => {
          return (
            <div key={usr.username}>
              <img src={icons[usr.icon]} alt={usr.username} />
              <p>{usr.username}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => ({ currentUsers: users });

export default connect(mapStateToProps)(CurrentUsers)