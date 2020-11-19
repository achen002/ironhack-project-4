import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AUTH_SERVICE from '../../services/AuthService';


export default class index extends Component {
    
    
    logoutAndLiftUserState = () => {
          AUTH_SERVICE.logout()
            .then(() => this.props.onUserChange(null))
            .catch(err => console.log(err));
        };

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
                <Link className="navbar-brand" to='/home'>Home</Link>
                <Link className="navbar-brand" to='/workouts'>Workouts</Link>
                <Link className="navbar-brand" to='/weight'>Check your Weight Progress</Link>
                <Link className="navbar-brand" to='/graphs'>Track your lifting progress</Link>
                
                {this.props.currentUser && 
                
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src={this.props.currentUser.photo} alt="your avatar"style={{width: "35px"}}/>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                       <Link className=" dropdown-item " to='/user-details'>Check your account info</Link>
                        <button className=" dropdown-item btn btn-secondary" onClick={this.logoutAndLiftUserState}> Logout </button>
                    </div>
                </div>
                
                
                
                }
                

            </nav>
        )
    }
}
