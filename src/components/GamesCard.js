import React, { Component } from 'react'
import Adapter from '../Adapter'

export class GamesCard extends Component {
    state = {
        allAchievements: [],
        playerAchievements: []
    }

    componentDidMount(){
        const { game, steamId } = this.props
        Adapter.schema(game.appid).then(allAchievements => this.setState({ allAchievements }))
        Adapter.achievements(game.appid, steamId).then(playerAchievements => this.setState({ playerAchievements }))

    }

    componentDidUpdate(prevProps){
        const { game, steamId } = this.props
        if( prevProps !== this.props ) {
            Adapter.schema(game.appid).then(allAchievements => this.setState({ allAchievements }))
            Adapter.achievements(game.appid, steamId).then(playerAchievements => this.setState({ playerAchievements }))
        }
    }



    // findAchievement = (appid) => {
    //     const { achievements } = this.state
    //     const result = {}
    //     // console.log(achievements)
        
    //     // achievements.allAchievements.forEach( game => console.log(game))

    // }


    render() {
        // console.log(this.props)
        const { game, achievements } = this.props
        console.log(this.state.allAchievements)
        const { allAchievements, playerAchievements } = this.state
        // const achieve = this.findAchievement(game.appid)
        // console.log( achievements.allAchievements )
       
        return (
            <li className='games-card'> 
                <img className="games-img" src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg?t=1558546673`}></img>
                <div className='games-info'>
                    <h2>{game.name}</h2>
                    <p>Time Played: { Math.floor(game.playtime_forever/60) } hours</p>
                    { allAchievements.achievements ? allAchievements.achievements.map( achievements =>  <img src={achievements.icon}/>): null}
                </div>
            </li>
        )
    }
}

export default GamesCard
