import React, { Component } from 'react'

// A tab for the ratings list at the restaurants page
export default class OrderTab extends Component {
    render() {
        return (
            <article class="leaderboard__profile">
                <img src={this.props.image} alt={this.props.name} class="leaderboard__picture"/>
                <span class="leaderboard__name">{this.props.name}</span>
                <row style={{"width":"150px","textAlign":"end","marginLeft":"10%"}}>
                <span class="leaderboard__value"style={{"marginRight":"8%"}} >{this.props.foodRating}   </span>
                <span class="leaderboard__value" style={{"color": "orange", "marginRight":"8%"}} >{this.props.serviceRating}   </span>
                <span class="leaderboard__value" style={{"color": "red"}}>{this.props.deliveryRating}   </span>
                </row>
            </article>
        )
    }
}
