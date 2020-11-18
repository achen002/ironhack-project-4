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

      handleImageChange = (event) => {
        const { files } = event.target;

        this.setState({ photo: files[0] });
    };
    
    
      handleFormSubmission = event => {
        event.preventDefault();
    
        //const {  photo, firstname, lastname, password } = this.state
        const { username, email }= this.props.currentUser

        const uploadData = new FormData();

        uploadData.append("photo", this.state.photo);
        uploadData.append("firstname", this.state.firstName);
        uploadData.append("lastname", this.state.lastName);
        uploadData.append("username", username);
        uploadData.append("email", email);
        
        uploadData.append("password", this.state.password);
        

        
        //console.log('this is in form submission',this.props.location)
        USER_SERVICE.update(this.props.currentUser._id,uploadData)
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
                  Change first name:
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
                  Change last name :
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
                  className="form-control"
                    name='photo'
                    type='file'
                    placeholder={photo}
                    //value={photo}
                    onChange={this.handleImageChange}
                    ref={(ref)=> (this.fileInput = ref)}
                  />
                </label>

    
                <button className="btn btn-secondary" > Update User Info? </button>
              </form>
    
              {message && <div>{message}</div>}
            </section>
          </>
        );
      }
    }