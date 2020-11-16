import React, { Component } from 'react'
import WeightWidget from './WeightWidget'
import WorkoutWidget from './WorkoutWidget'
import WeightChart from './WeightChart'
//import './Home.css'


export default class index extends Component {
    render() {
        return (
            <div className="container">
                <div className="row" style={{marginTop : "25px"}}>
                    <div className="col">
                        <WeightWidget currentUser={this.props.currentUser}/>
                    </div>
                    <div className="col">
                        <WorkoutWidget currentUser={this.props.currentUser}/>
                    </div>
                </div>
                
                <div className="col" style={{marginTop : "25px"}}>
                    <WeightChart currentUser={this.props.currentUser} />
                </div>
               
                
                
            </div>
        )
    }
}
