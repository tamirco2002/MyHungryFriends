import React, { Component } from "react";
import {BrowserRouter as Router,Route,Routes,Link,Navigate} from "react-router-dom";

import { Dropdown,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {Nav, NavDropdown} from "react-bootstrap";
import BestDish from "./BestDish";
const images = require.context('../../../backend/db_images', true);
const profileImg = require.context('../../../backend/db_images/users', true);
export default class NavBar extends Component {

	Logo =images(`./${"logo.png"}`).default
	
	loadImage = (username) => (profileImg(`./${username+".png"}`).default);
	constructor(props) {
		super(props)
		this.state = {
			userTabOpen: false,
		}
	  }
	  handleOpen = () => {
		this.setState({ userTabOpen: true })
	  }
	
	  handleClose = () => {
		 this.setState({ userTabOpen: false })
	  }

	  
	
    render(){
		if(this.props.userName!="NULL"){
		
        return(
			
        <header className="top-navbar">
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<Link className="navbar-brand" to="/">
					<img className="logo" src={this.Logo} alt="" />
				</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars-rs-food" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
				  <span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbars-rs-food">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
						<li className="nav-item"><Link className="nav-link" to="/team">Team</Link></li>
						<li className="nav-item">
							<Link className="nav-link" to="#" onClick={this.props.modalClick}>I'm feeling lucky</Link>

						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/friends">Friends</Link>

						</li>
						<Dropdown className="nav-item dropdown">
							<DropdownToggle caret>
							{this.props.userName}
							</DropdownToggle>
							<DropdownMenu className='dropdown-menu'>
								<DropdownItem tag={Link} to="/orders" className='dropdown-item'>My Orders</DropdownItem>
								<DropdownItem tag={Link} to="/" onClick={this.props.signOut} className='dropdown-item'>Sign-Out</DropdownItem>
							</DropdownMenu>
                        </Dropdown>
						
					</ul>
					<img className="logo" src={this.loadImage(this.props.userName)} style={{"borderRadius":"100%","width":"80px","marginLeft":"20px"}}alt="" />
				</div>
			</div>
		</nav>
		<br/><br/><br/><br/>
		
	</header>
        
        );}
		else{
			return(
				<header className="top-navbar">
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container">
					<Link className="navbar-brand" to="/">
						<img src={this.Logo} alt="" />
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars-rs-food" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
					  <span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbars-rs-food">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item"><Link className="nav-link" to="/">Sign-In</Link></li>
						</ul>
					</div>
				</div>
			</nav>
			<br/><br/><br/><br/>
		</header>
			
			);

		}
    }
}
