import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const eye = <FontAwesomeIcon icon= {faEye}/>;
const eyeSlash = <FontAwesomeIcon icon= {faEyeSlash}/>;
toast.configure();

//login page
export default class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            username: "",
            password: "",
            passwordShown: false,
            user:null ,
            auth:false,
            
        }
    }

    checkAuth = (name) => {
        axios
          .get("/api/userselective/",{params: {username:name}})
          .then((res) =>{this.setState({ user: res.data[0]})
          if(res.data[0]!=null){
            if(res.data[0]["passname"]!=null){
                if(res.data[0]["passname"]===this.state.password){
                    this.setState({auth:true})
                    this.props.userChange(name,res.data[0]["userid"])
                    window.open("/","_self")
                }
                else
                {
                    toast.error("Wrong Username or Password");
                }
            }
        }
        else{
            toast.error("Wrong Username or Password");
        }     
        }
           )
          .catch((err) => console.log(err));
        
        
      };



    handleButtonClick =(event) =>{
        event.preventDefault();
        this.checkAuth(this.state.username)
        
    }
    

    handleUserNameChanged(event) {
        this.setState({username: event.target.value}) 
    }
    handlePasswordChanged(event) {
        this.setState({password: event.target.value}) 
    }

    togglePasswordVisiblity = () => {
        this.setState({passwordShown: !this.state.passwordShown});
      };

    render() {
        return (
            
            <div className="auth-wrapper" id="login">
            <div className="auth-inner">
        
            <form className="login">
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input 
                        type="username" 
                        className="form-control" 
                        placeholder="Enter username"
                        onChange={this.handleUserNameChanged.bind(this)}
                        />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                     type={this.state.passwordShown ? "text" : "password"}
                    className="form-control" 
                    placeholder="Enter password"
                    onChange={this.handlePasswordChanged.bind(this)}
                    />
                    <i onClick={this.togglePasswordVisiblity}>{this.state.passwordShown?eye:eyeSlash}</i>
                </div>
                

                <div className="form-group">

                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={this.handleButtonClick}>Submit</button>
                

            </form>
            </div>
            </div>
                        
        );
    }
}
