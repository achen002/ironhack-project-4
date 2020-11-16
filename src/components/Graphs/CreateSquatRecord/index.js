import React, { Component } from 'react'
import SQUAT_SERVICE from '../../../services/SquatRecordService';
import { Link } from 'react-router-dom'

export default class index extends Component {
    state = {
        weight: 0,
        date : '',
        message : null
    }
    
      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
    
    
      handleFormSubmission = event => {
        event.preventDefault();
    
        const {  weight, date } = this.state


        

        
        //console.log('this is in form submission',this.props.location)
        SQUAT_SERVICE.createRecord(this.props.currentUser._id,{  weight, date })
          .then(responseFromServer => {
            const { newRecord } = responseFromServer.data;
    
            //this.props.onUserChange(newRecord);
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
        const {  weight, date} = this.state
        //console.log('this is the props', this.props.location.info.exercise)
        return (
          <>
            <section>
              <h2> Enter your squat personal record </h2>
                <Link to='/squat-records'>See previous squat entries</Link>
              <form className="form-group" onSubmit={this.handleFormSubmission}>
                <label>
                  Weight:
                  <input
                  className="form-control"
                    name='weight'
                    type='number'
                    placeholder='100'
                    value={weight}
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
    
    

    
                <button> input Personal record </button>
              </form>
    
              {this.state.message && <div>{this.state.message}</div>}
            </section>
          </>
        );
      }
    }