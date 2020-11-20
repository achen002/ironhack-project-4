import React, { Component } from 'react'
import USER_SERVICE from '../../../services/UserService'
import { Link } from 'react-router-dom'
import EditDetails from '../EditDetails'
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

    // onUserEdit = (user) => {
    //     console.log(user)
    // }
    // redirectToEdit = () => {
    //     this.props.history.pu
    // }

    render() {
        const { username, email, photo, firstname, lastname } = this.props.currentUser
        //console.log(this.props.currentUser)
        return (
            <div className="container">

                <div className="row" style={{margin : "25px"}}>
                    <div className="col-md" >

                    </div>

                    <div className="col card">
                        <div >
                            <h5>Username: </h5>{username}
                        </div>
                        <div>
                        <h5>First Name:</h5> {firstname}
                        </div>
                        <div>
                        <h5>Last Name:</h5> {lastname}
                        </div>
                        <div>
                        <h5>Email:</h5> {email}
                        </div>
                        <div>
                            <Link className="" to='/edit-user'>Edit your account info</Link>
                            {/* <button className="btn btn-secondary" onClick={() => this.redirectToEdit()}>Edit Profile</button>  */}
                            
                        </div>
                        <div>
                           <button className="btn btn-secondary" onClick={() => this.deleteProfile()}>Delete Profile?</button> 
                        </div>

                    </div>

                    <div className="col">

                    </div>
                
                </div>
               
            </div>
        )
    }
}

