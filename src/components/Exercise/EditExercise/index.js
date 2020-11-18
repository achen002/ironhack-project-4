import React, { Component } from 'react'
import EXERCISE_SERVICE from '../../../services/ExerciseService';

export default class index extends Component {
    state = {
        name: '',
        date: '',
        sets: 0,
        reps: 0,
        weight: 0,
        volume: 0,
        description: '',
        message: null
      };
    
      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
    
    
      handleFormSubmission = event => {
        event.preventDefault();
    
        const { name, date, sets, reps, weight, description } = this.state;
        const volume = sets * reps * weight;
        //console.log('this is in form submission',this.props.location)
        EXERCISE_SERVICE.update(this.props.location.info.exercise._id,{  name, date, sets, reps, weight, volume, description })
          .then(responseFromServer => {
            const { exercise } = responseFromServer.data;
    
            //this.props.onAuthorsChange(weight);
            this.props.history.push('/');
          })
          .catch(err => {
            if (err.response && err.response.data) {
              return this.setState({ message: err.response.data.message });
            }
          });
      };
    
      render() {

        const {  name, sets, reps, weight, description } = this.state;
        console.log('this is the props', this.props.location.info.exercise)
        return (
          <>
            <section>
              <h2> Edit this exercise </h2>
    
              <form onSubmit={this.handleFormSubmission}>
                <label>
                  Enter name of exercise:
                  <input
                    name='name'
                    type='text'
                    placeholder={this.props.location.info.exercise.name}
                    value={name}
                    onChange={this.handleInputChange}
                  />
                </label>
    
                {/* <label>
                  Enter the Date:
                  <input
                    name='date'
                    type='date'
                    value={date}
                    onChange={this.handleInputChange}
                  />
                </label> */}
    
                <label>
                  Description:
                  <input
                    name='description'
                    type='text'
                    placeholder={this.props.location.info.exercise.description}
                    value={description}
                    onChange={this.handleInputChange}
                  />
                </label>
    
    
                <label>
                  Sets:
                  <input
                    name='sets'
                    type='number'
                    placeholder={this.props.location.info.exercise.sets}
                    value={sets}
                    onChange={this.handleInputChange}
                  />
                </label>

                <label>
                  Reps:
                  <input
                    name='reps'
                    type='number'
                    placeholder={this.props.location.info.exercise.reps}
                    value={reps}
                    onChange={this.handleInputChange}
                  />
                </label>

                <label>
                  Weight:
                  <input
                    name='weight'
                    type='number'
                    placeholder={this.props.location.info.exercise.weight}
                    value={weight}
                    onChange={this.handleInputChange}
                  />
                </label>

               
    
                <button className="btn btn-secondary"> Update Exercise </button>
              </form>
    
              {/* {message && <div>{message}</div>} */}
            </section>
          </>
        );
      }
    }