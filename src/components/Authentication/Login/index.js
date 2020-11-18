import React from 'react';

import AUTH_SERVICE from '../../../services/AuthService';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    message: null
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  handleFormSubmission = event => {
    event.preventDefault();

    const { email, password } = this.state;

    AUTH_SERVICE.login({ email, password })
      .then(responseFromServer => {
        const { user } = responseFromServer.data;
        //console.log("The user after log in is", user)
        // Lift the user object to the App.js
        this.props.onUserChange(user);

        // Redirect user to home page after successful sign up
        this.props.history.push('/');
      })
      .catch(err => {
        if (err.response && err.response.data) {
          return this.setState({ message: err.response.data.message });
        }
      });
  };

  render() {
    return (
      <>
        <section className="form-group">
          <h2> Login </h2>

          <form onSubmit={this.handleFormSubmission}>
            <label>
              Email:
              <input
              className ="form-control"
                name='email'
                type='email'
                placeholder='myemail@gmail.com'
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Password:
              <input
              className ="form-control"
                name='password'
                type='password'
                placeholder='**********'
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>

            <button className="btn btn-secondary"> Login </button>
          </form>

          {/* if the message is not NULL then show the message */}
          {this.state.message && <div> {this.state.message} </div>}
        </section>
      </>
    );
  }
}
