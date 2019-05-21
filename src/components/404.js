import React, { Component } from 'react'

export class Err extends Component {
    render() {
        const { steamid } = this.props.location.state
        return (
            <div className="error">
                <h1 className="error-heading"> No results for '{steamid}'.</h1>
            </div>
        )
    }
}

export default Err
