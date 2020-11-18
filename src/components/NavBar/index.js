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
                <Link className="navbar-brand" to='/user-details'>Check your account info</Link>
                <button className="btn btn-secondary" onClick={this.logoutAndLiftUserState}> Logout </button>

            </nav>
        )
    }
}
