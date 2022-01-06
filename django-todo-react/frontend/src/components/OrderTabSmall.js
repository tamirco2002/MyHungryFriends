import React, { Component } from 'react'

// A tab for the ratings list at the friends page
export default class OrderTab extends Component {
    render() {
        return (
            <article>
                <div style={{"width":"150px","textAlign":"end","marginLeft":"2%", "marginBottom":"7%", "height":"20%"}}>
                <span class="leaderboard__value"style={{"marginRight":"20%"}} >{this.props.foodRating}   </span>
                <span class="leaderboard__value" style={{"color": "orange", "marginRight":"20%"}} >{this.props.serviceRating}   </span>
                <span class="leaderboard__value" style={{"color": "red"}}>{this.props.deliveryRating}   </span>
                </div>
            </article>
        )
    }
}
