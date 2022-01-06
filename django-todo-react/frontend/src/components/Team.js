import React, { Component } from "react";
import TeamMember from "./TeamMember";

const images = require.context('../../../backend/db_images/Team', true);

//Team's page
export default class Team extends Component {
    loadImage = (name) => (images(`./${name+".png"}`).default);
    render(){
        return(
            <div className="stuff-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="heading-title text-center">
                                <h2>The Team</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                    <TeamMember image={this.loadImage("eliran")} name="Eliran Ohel" job="Backend"/>
                    <TeamMember image={this.loadImage("yuval")} name="Yuval Bloom" job="Backend and DB"/>
                    <TeamMember image={this.loadImage("inbar")} name="Inbar Havilio" job="Frontend and Design"/>
                    </div>
                    <div className="row-team2">
                    <TeamMember image={this.loadImage("tamir")} name="Tamir Cohen" job="Frontend and Fullstack"/>
                    <TeamMember image={this.loadImage("betty")} name="Betty Kaplun" job="Frontend and Design"/>
 
                    </div>
                </div>
            </div>
	
        );
    }
}