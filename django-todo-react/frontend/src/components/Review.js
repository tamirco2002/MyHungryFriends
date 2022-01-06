import React, {Component} from 'react';


//A single review for the reviews feature at the bottom of the restaurant's pages
export default class Review extends Component {

    render(){
        return(
            <div className="carousel-item text-center active">
                <div className="img-box p-1 border rounded-circle m-auto">
                    <img className="d-block w-100 rounded-circle" src={this.props.image} alt="" />
                </div>
                <h5 className="mt-4 mb-0"><strong className="text-warning text-uppercase">{this.props.name}</strong></h5>
                <h6 className="text-dark m-0">{this.props.role}</h6>
                <p className="m-0 pt-3">{this.props.text}</p>
            </div>
        )
    }
} 