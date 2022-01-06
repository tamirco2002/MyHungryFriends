
import axios from 'axios';
import React, {Component} from 'react';
import Review from './Review';


const images = require.context('../../../backend/db_images/users', true);

//The reviews feature for the restaurants pages
export default class ReviewBox extends Component {

    constructor(props){
        super(props);
        this.state={
            reviews: this.props.reviewList,
            reviewNum: 0,
            names: this.props.names,

         } 
    }

    componentWillMount(){
    }
    getNames = () =>{
        var namesDict={};
        Object.entries(this.props.reviewList).map( ([user, review]) => {
            axios
            .get("/api/userselective/", {params:{userid:user}})
            .then((res) =>{
                namesDict[user]=[res.data[0]["fullname"],res.data[0]["username"]]
                this.setState({names:namesDict});
            } )
            .catch((err) => console.log(err));}
        )
        
    }

    renderReviews =()=>{
        if(this.props.names.length>0){
            return(
                <Review 
                            image={this.loadImage(this.props.names[this.state.reviewNum][1][1])}
                                        name={this.props.names[this.state.reviewNum][1][0]}
                                        
                                    text={this.props.reviewList[parseInt(this.props.names[this.state.reviewNum][0])]}/>);
            
        }
        return;
    }
    reviewChange= (direction) =>{
        if(direction=="prev"){
            if(this.state.reviewNum==0){this.setState({reviewNum:(this.props.names.length-1)})}
            else{this.setState({reviewNum:(this.state.reviewNum-1)})}
        };
        if(direction=="next"){this.setState({reviewNum:(this.state.reviewNum+1)%(this.props.names.length)})};
    }

    loadImage = (username) => (images(`./${username+".png"}`).default);

    render(){
        if(this.props.names.length>0){
        return(<div className="customer-reviews-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="heading-title text-center">
                                    <h2>Friends Reviews</h2>
                                    <p>This is what your friends thought of <b style={{"font-weight":"bold","color":"rgb(32, 140, 241)"}}>{this.props.restname}</b>:</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 mr-auto ml-auto text-center">
                                <div id="reviews" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner mt-4">
                                    
                                        {this.renderReviews()}
                                    
                                    </div>
                                    <button className="carousel-control-prev" onClick={(e) => this.reviewChange("prev")} role="button" data-slide="prev">
                                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                                        <span className="sr-only">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" onClick={(e) => this.reviewChange("next")} role="button" data-slide="next">
                                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                                        <span className="sr-only">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
        else{return(<div/>)}
                                
        }
    }
