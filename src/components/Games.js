import React, { Component } from 'react'
import Adapter from '../Adapter'
import Card from './GamesCard'

export class Games extends Component {
    state = {
        ownedGames: [],
        ownedGamesCopy: [],
        displayedGames: [],
    }

    // Will fetch owned games from Steam API to set into state
    componentDidMount(){
        const { steamId } = this.props
        Adapter.ownedGames(steamId).then(allGames => this.setState({
            ownedGames: allGames,
            ownedGamesCopy: allGames,
            displayedGames: allGames.games.slice(0, 10)
            }))
    }

    shouldComponentUpdate(nextState) {
        if (nextState === this.state){
            return false
        }
        return true
    }

    // Gets games in intervals of 10 based on page number
    divideOwnedGames = (pageNumber = 1) => {
        const { ownedGamesCopy } = this.state
        let games = ownedGamesCopy.games || [],
            range = 10 * pageNumber,
            start = -10 + range,
            end = 0 + range
        if ( games ) {
            games = games.slice(start, end)
        }
        this.setState({ displayedGames: games })
    }

    // Creates the amount of pages needed
    createPageNumbers = () => {
        const pageArr = []
        const { ownedGamesCopy } = this.state
        const games = ownedGamesCopy.games || []
        const pages = Math.ceil(games.length / 10)
        for (let i = 1; i <= pages; i++) {
            pageArr.push(i)
        }
        return pageArr
    }

    render() {
        // console.log(this.props)
        const { steamId } = this.props
        const { ownedGamesCopy, displayedGames } = this.state
        const pagesArr = this.createPageNumbers()
        return (
            <div className="games">
                <ul className="games-list">
                    { displayedGames.map(game => <Card game={game} steamId={steamId}/>) }
                </ul>
                <ul className="page-index">
                    { pagesArr.map(pageNumber => <button onClick={ () => this.divideOwnedGames(pageNumber) }> { pageNumber } </button>) }
                </ul>
            </div>
        )
    }
}

export default Games
