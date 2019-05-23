import React, { Component } from 'react'
import Adapter from '../Adapter'

export class GamesCard extends Component {
    state = {
        userAchievements: [],
        allAchievements: []
    }

    componentDidMount(){
        
    }

    render() {
        console.log(this.props)
        const { game } = this.props
        return (
            <li className='games-card'> 
                <img className="games-img" src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg?t=1558546673`}></img>
                <div className='games-info'>
                    <h2>{game.name}</h2>
                    <p>Time Played: { Math.floor(game.playtime_forever/60) } hours</p>
                </div>
            </li>
        )
    }
}

export default GamesCard
