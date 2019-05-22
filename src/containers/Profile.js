import React, { Component } from 'react'
import Games from '../components/Games'
import User from '../components/User'

export class Profile extends Component {
  render() {
    const { steamid } = this.props.location.state
    return (
      <div className="profile">
        <User/>
        <Games steamId={steamid}/>
      </div>
    )
  }
}

export default Profile
