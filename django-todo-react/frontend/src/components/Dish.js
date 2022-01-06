import React, {Component} from 'react';


//Dish box in the menu of the restaurants
export default class Dish extends Component {

    constructor(props){
        super(props);
        this.state={
            count:0, 
            inCart:false,
        }
      }

      componentWillReceiveProps= (nextProps)=>{

        if(nextProps.chosenDishId!=this.props.id){
            this.setState({inCart:false});
        }
    
    }
    
    
    

    decrementCount= (event) =>{
        if(this.state.count>0){
            this.setState({count:(this.state.count-1)});
        }
        this.props.chooseDish(this.props.id);
    }
    incrementCount= (event) =>{
        this.setState({count:(this.state.count+1)});
        this.props.chooseDish(this.props.id);
    }
    AddToCart = () =>{
        this.setState({inCart:!this.state.inCart});
        this.props.chooseDish(this.props.id);
       
        
    }
    RemoveFromCart = () =>{
        this.setState({inCart:!this.state.inCart});
        this.props.chooseDish(0);
        
        
    }

    
    
    render(){
        if(!this.state.inCart){
            return(
            
                <div className="col-lg-4 col-md-6 special-grid drinks">
                    <div className="gallery-single fix">
                    <img src={this.props.image} className="img-fluid" alt="Image" style={{"object-fit":"cover"}}/>
                        <div className="why-text" style={{"overflow-y":"scroll"}}>
                            <h4>{this.props.name}</h4>
                            <p style={{"border-bottom":"none","marginBottom":"-10px","font-weight":"bold"}}>{this.props.description}</p>
                            <p style={{"marginBottom":"5px"}}><b>Ingredients:</b> {this.props.ingredients}</p>
                            <h5> {this.props.price} ₪</h5>
                        </div>
                    </div>
                    <button class="button-3" role="button" onClick={this.AddToCart}>Add To Cart</button>
                </div>
                
            );
        }
        else{
            return(
            
                <div className="col-lg-4 col-md-6 special-grid drinks">
                    <div className="gallery-single fix">
                        <img src={this.props.image} className="img-fluid" alt="Image" style={{"border":"7px solid #0678d6", "objectFit":"cover"}}/>
                        <div className="why-text">
                            <h4>{this.props.name}</h4>
                            <p>{this.props.description}</p>
                            <h5> {this.props.price} ₪</h5>
                        </div>
                        
                    </div>                    
                    <button className="button-3" role="button" style={{ "background-color": "#ee1111", "margin-left": "12%"}} onClick={this.RemoveFromCart}>Remove From Cart</button>
                </div>
                
            );
        }
        
    }
}