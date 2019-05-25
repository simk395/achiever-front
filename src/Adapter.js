const url = 'http://localhost:3000'

export class Adapter{

    static profiles = (steamid) => {
        return fetch(`${url}/profiles/${steamid}`)
        // .then(resp => resp.json())
    }

    static ownedGames = (steamid) => {
        // console.log(steamid)
        return fetch(`${url}/games/${steamid}`)
        .then(resp => resp.json())
        .catch(error => console.log(error))
    }

    static schema = (appid) => {
        return fetch(`${url}/schema/${appid}`)
        .then(resp => resp.json())
        .catch(error => console.log(error))
    }

    static achievements = (appid, steamid) => {
        // console.log('appid:', appid, 'steamid:', steamid)
        return fetch(`${url}/achievements/${appid}/${steamid}`)
        .then(resp => resp.json())
        .catch(error => console.log(error))
    }
}

export default Adapter




