import React, { Component } from 'react'
import Games from '../components/Games'

export class User extends Component {
  render() {
    const { steamid } = this.props.location.state
    return (
      <div>
        <Games steamId={steamid}/>
      </div>
    )
  }
}

export default User
