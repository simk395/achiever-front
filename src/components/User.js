import React, { Component } from 'react'
import Adapter from '../Adapter'

export class User extends Component {
  

  componentWillMount(){
    const { steamid } = this.props.location.state
    Adapter.ownedGames(steamid).then(console.log).catch(error => this.props.history.push("/404"))
  }

  render() {
    console.log(this.props)
    const { steamid } = this.props.location.state
    return (
      <div>
        hello
      </div>
    )
  }
}

export default User
