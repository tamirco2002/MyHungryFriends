import React, { Component } from 'react'
import '../css/orderTable.css';
import axios from 'axios';



//My orders page
export default class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          OrderList:[],
          loaded:false,
          finalOrders:[],
          sortedOrders:[],
        };
      }
    
    componentDidMount(){
        this.getOrders();
    }


    getOrders = () =>{
        axios
          .get("/api/userorders/",{params:{userid:this.props.userid}})
          .then((res) => {this.setState({OrderList:res.data})
        this.renderOrders(res.data)})
          .catch((err) => console.log(err));
    }

    renderOrders (Orders){
        if(this.state.OrderList.length>0){
            
            if(!this.state.loaded){
            this.setState({loaded:true})

            this.state.OrderList.map((order) => {  
                var currOrder={};
                
                axios
                    .get("/api/restselective/",{params:{restaurantid:order["restaurantid"]}})
                    .then((response) => {
                        axios
                            .get("/api/dishbyid/",{params:{dishid:order["dishid"]}})
                            .then((res) => {
                                currOrder={dishname:res.data[0]["nameofdish"],
                                price:res.data[0]["price"],
                                restaurant:response.data[0]["restaurantname"],
                                timestamp:order["timestamporder"],
                                orderid:order["orderid"],
                            }

                                this.setState({finalOrders:[...this.state.finalOrders, currOrder]})
                            }
                                
                            )
                            .catch((err) => console.log(err))                        
                    })
                    .catch((err) => console.log(err));     
            })
        }
    }
    }


    sortValues=(finalOrders)=>{
        finalOrders.sort(function(a,b) {
            return b.orderid - a.orderid
            });
    }


    render() {
    this.sortValues(this.state.finalOrders);
    return (
        <div className="OrderPage">      	
            <div className="limiter">
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100">
                            <table>
                                <thead>
                                    <tr className="table100-head">
                                        <th className="column1">Date</th>
                                        <th className="column2">Order ID</th>
                                        <th className="column3">Restaurant</th>
                                        <th className="column4">Dish</th>
                                        <th className="column5">Quantity</th>
                                        <th className="column6">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(this.state.finalOrders).map((order)=>{   
                                        if(order!=null){   
                                            const formated_date = new Date(order["timestamp"])                                               
                                            return(     
                                            <tr>
                                                <td className="column1">{`${formated_date.getFullYear()}-${formated_date.getMonth()+1}-${formated_date.getDate()}, ${formated_date.getHours()}:${formated_date.getMinutes()}:${formated_date.getSeconds()}`}</td>
                                                <td className="column2">{order["orderid"]}</td>
                                                <td className="column3">{order["restaurant"]}</td>
                                                <td className="column4">{order["dishname"]}</td>
                                                <td className="column5">1</td>
                                                <td className="column6">{order["price"]} ₪</td>
                                            </tr>);
                                        }
                                    })}  
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
        )
    }
}


