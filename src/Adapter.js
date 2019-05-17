export class Adapter{
    static ownedGames = (steamid) => {
        console.log(steamid)
        return fetch(`http://localhost:3000/games/${steamid}`)
        .then(resp => resp.json())
    }
}

export default Adapter




