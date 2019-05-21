import React, { Component } from 'react'
import Adapter from '../Adapter'

export class Landing extends Component {
  state = {
    steamid: ""
  }
  
  componentDidMount(){
    // Prevents 'e', '+', '=', '-', '*' as input for searchbar 
    document.querySelector(".search").addEventListener("keydown", (e) => {
      if ([69, 187, 188, 189, 190].includes(e.keyCode)) {
        e.preventDefault();
      }
    })
  }

  // Save the user input from the searchbar into a state
  handleInput = (e) => {
    this.setState({steamid: e.target.value})
    console.log(e.target.value)
  }

  // Pushes user to their statistics page that shows all of their achievements if user exists
  handleSearch = async (e) => {
    e.preventDefault();
    const { steamid } = this.state
    const profiles = await Adapter.profiles(steamid)
    const status = await profiles.status
    if ( status === 400) {
      return this.props.history.push({ pathname: '/404', state: { steamid } })
    }
    this.props.history.push({ pathname: `/user/steamid=${this.state.steamid}`, state: { steamid } })
  }

  render() {
    const { steamid } = this.state
    return (
      <main className="landing">
        <h1 className="title">Achiever!</h1>
        <form onSubmit={this.handleSearch}>
          <input type="number" 
                 className="search" 
                 placeholder="steamid" 
                 onChange={this.handleInput} 
                 value={steamid}/>
        </form>
        <p className="search-help">*SteamID is found in the URL of your profile page. Click <a href="#">here</a> for a tutorial</p>
      </main>
    )
  }
}

export default Landing

