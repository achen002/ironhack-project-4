import React, { Component } from 'react'
import USER_SERVICE from '../../../services/UserService';

export default class index extends Component {
    state = {
        firstName : '',
        lastName : '',
        userName : '',
        email: '',
        photo : '',
        password: '',
        message : null
    }
    
      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
    
    
      handleFormSubmission = event => {
        event.preventDefault();
    
        const {  photo, firstname, lastname, password } = this.state
        const { username, email }= this.props.currentUser

        
        //console.log('this is in form submission',this.props.location)
        USER_SERVICE.update(this.props.currentUser._id,{  username, email, photo, firstname, lastname, password })
          .then(responseFromServer => {
            const { updatedUser } = responseFromServer.data;
    
            this.props.onUserChange(updatedUser);
            this.props.history.push('/');
          })
          .catch(err => {
            if (err.response && err.response.data) {
              return this.setState({ message: err.response.data.message });
            }
          });
      };
    
      render() {
            //console.log(this.props.currentUser)
        const {  photo, firstname, lastname, password, message} = this.state
        //console.log('this is the props', this.props.location.info.exercise)
        return (
          <>
            <section>
              <h2> Update your information </h2>
    
              <form className="form-group" onSubmit={this.handleFormSubmission}>
                <label>
                  Enter first name:
                  <input
                  className="form-control"
                    name='firstname'
                    type='text'
                    placeholder={firstname}
                    value={firstname}
                    onChange={this.handleInputChange}
                  />
                </label>
    
                <label>
                  Change your password?
                  <input
                  className="form-control"
                    name='password'
                    type='password'
                    placeholder ='*********'
                    value={password}
                    onChange={this.handleInputChange}
                  />
                </label>
    
                <label>
                  Enter last name :
                  <input
                  className="form-control"
                    name='lastname'
                    type='text'
                    placeholder={lastname}
                    value={lastname}
                    onChange={this.handleInputChange}
                  />
                </label>
    
    
                {/* <label>
                  Enter new email: 
                  <input
                    name='email'
                    type='text'
                    placeholder={email}
                    value={email}
                    onChange={this.handleInputChange}
                  />
                </label> */}

                <label>
                  Update new photo
                  <input
                    name='photo'
                    type='text'
                    placeholder={photo}
                    value={photo}
                    onChange={this.handleInputChange}
                  />
                </label>

    
                <button> Update User Info? </button>
              </form>
    
              {message && <div>{message}</div>}
            </section>
          </>
        );
      }
    }