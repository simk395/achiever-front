import React, { Component } from 'react'
import Adapter from '../Adapter'

export class Games extends Component {
    state = {
        ownedGames: [],
        ownedGamesCopy: []
    }

    // Will fetch owned games from Steam API to set into state
    componentDidMount(){
        const { steamId } = this.props
        Adapter.ownedGames(steamId).then(games => this.setState({
            ownedGames: games,
            ownedGamesCopy: games
            }))
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
        this.setState({ownedGamesCopy: games})
    }

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
        const { ownedGamesCopy, games } = this.state
        const pagesArr = this.createPageNumbers()
        return (
            <div>
                <ul className="page-index">
                    {pagesArr.map(pageNumber => <a href="#">{pageNumber}</a>)}
                </ul>
            </div>
        )
    }
}

export default Games
