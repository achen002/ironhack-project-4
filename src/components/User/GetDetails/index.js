import React, { Component } from 'react'
import USER_SERVICE from '../../../services/UserService'
import { Link } from 'react-router-dom'
export default class index extends Component {
    state = {
        firstName : '',
        lastName : '',
        userName : '',
        email: '',
        photo : ''
    }


    // componentDidMount = () => {
    //     this.loadUserDetails();

    // }

    // loadUserDetails = () => {
    //     USER_SERVICE.getDetails(this.props.currentUser._id)
    //     .then(responseFromServer => {
    //         console.log(responseFromServer)


    //     }).catch(err => console.log(err))
    // }

    deleteProfile = () => {
        USER_SERVICE.delete(this.props.currentUser._id)
        .then(responseFromServer => {
            this.props.onUserChange(null)
            this.props.history.push('/')
        }).catch(err => console.log(err))
    }

    render() {
        const { username, email, photo, firstname, lastname } = this.props.currentUser
        console.log(this.props.currentUser)
        return (
            <div>
                <ul>
                    <li>Username: {username}</li>
                    <li>Email: {email}</li>
                    <li>First Name: {firstname}</li>
                    <li>Last Name: {lastname}</li>
                </ul>
                <Link className="" to='/edit-user'>Edit your account info</Link>
                <button onClick={() => this.deleteProfile()}>Delete Profile?</button>
            </div>
        )
    }
}

