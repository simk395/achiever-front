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

    // changes value of allAchievements.defaultvalue to 1 to indicate if achievement was unlocked by going through some validations
    findAchieved = () => {
        const { allAchievements } = this.state
        const { achievements } = this.state.playerAchievements.player_achievements || []
        if ( achievements && achievements.length > 0) {
            achievements.map(achievement => {
                if ( achievement.achieved === 1 && allAchievements.achievements !== undefined) {
                    const achieved = allAchievements.achievements.find(search => search.name === achievement.apiname)
                    if (achieved) {
                        achieved.defaultvalue = 1;
                    }
                }
            })
        }
    }

    // Sorts the achievements so that it shows the unlocked achievements first
    sortAchieved = () => {
        const { allAchievements } = this.state
        const achievements = []
        if ( allAchievements.achievements ){
            if ( allAchievements.achievements.length > 0 ){
                const unlocked = allAchievements.achievements.filter(achievement => achievement.defaultvalue === 1)
                const locked = allAchievements.achievements.filter(achievement => achievement.defaultvalue === 0)
                achievements.push(unlocked,locked)
                allAchievements.achievements  = achievements.flat()
            }
        }
    }

    displayAchieved = () => {
        const { allAchievements } = this.state
        if ( allAchievements.achievements ) {
            const display = allAchievements.achievements.slice(0, 10)
            allAchievements.achievements = display
        }
    }

    render() {
        // console.log(this.props)
        const { game } = this.props
        const { allAchievements, playerAchievements } = this.state 
        // console.log("allachievements", allAchievements, 'playerachievements', playerAchievements)      
        // console.log(allAchievements.achievements.sort(achievement => achievement.defaultvalue === 1))
        this.findAchieved()
        this.sortAchieved()
        this.displayAchieved()
        return (
            <li className='games-card'> 
                <img className="games-img" src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg?t=1558546673`}></img>
                <div className='games-info'>
                    <h2>{game.name}</h2>
                    <p>Time Played: { Math.floor(game.playtime_forever/60) } hours</p>
                    { allAchievements.achievements ? allAchievements.achievements.map( achievements =>  achievements.defaultvalue === 1 ? <img src={achievements.icon}/> : <img src={achievements.icongray}/>) : null}
                </div>
            </li>
        )
    }
}

export default GamesCard
