import React, { Component } from 'react'
import WORKOUT_SERVICE from '../../services/WorkoutService';

export default class index extends Component {
    state = {
        name: '',
        date: '',
        description: '',
        message: null
      };
    
      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
    
    
      handleFormSubmission = event => {
        event.preventDefault();
    
        const { name, date, description, } = this.state;
        const userId = this.props.currentUser._id;
    
        WORKOUT_SERVICE.createWorkout(userId, { name, date, description })
          .then(responseFromServer => {
            const { workout } = responseFromServer.data;
    
            this.props.onWorkoutChange(workout);
            this.props.history.push('/');
          })
          .catch(err => {
            if (err.response && err.response.data) {
              return this.setState({ message: err.response.data.message });
            }
          });
      };
    
      render() {
        const { name, date, description, } = this.state;
        return (
          <>
            <section >
              <h2> What is your workout </h2>
    
              <form className="form-group" onSubmit={this.handleFormSubmission}>
                <label>
                  Name of workout:
                  <input
                  className="form-control"
                    name='name'
                    type='text'
                    placeholder='Lower Body, quad focus'
                    value={name}
                    onChange={this.handleInputChange}
                  />
                </label>
    
                <label>
                  Enter the Date:
                  <input
                  className="form-control"
                    name='date'
                    type='date'
                    value={date}
                    onChange={this.handleInputChange}
                  />
                </label>
    
                <label>
                  Description:
                  <input
                  className="form-control"
                    name='description'
                    type='text'
                    placeholder='Not much sleep last night, felt slow on the squats'
                    value={description}
                    onChange={this.handleInputChange}
                  />
                </label>
    

    
                <button> Create your workout </button>
              </form>
    
              {/* {message && <div>{message}</div>} */}
            </section>
          </>
        );
      }
    }
    