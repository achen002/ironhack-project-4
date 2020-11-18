import React, { Component } from 'react'
import WEIGHT_SERVICE from '../../services/WeightService';

export default class index extends Component {
    state = {
        weight: '',
        date: '',
        picture: '',
        description: '',
        message: null
      };
    
      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
    
    
      handleFormSubmission = event => {
        event.preventDefault();
    
        const { weight, date, picture, description, } = this.state;
        const userId = this.props.currentUser._id;
        console.log(userId)
    
        WEIGHT_SERVICE.createWeight(userId,{ weight, date, picture, description })
          .then(responseFromServer => {
            const { weight } = responseFromServer.data;
            
            this.props.onWeightChange(weight);
            this.props.history.push('/');
          })
          .catch(err => {
            if (err.response && err.response.data) {
              return this.setState({ message: err.response.data.message });
            }
          });
      };
    
      render() {
        const { weight, date, picture, description, } = this.state;
        return (
          <>
            <section>
              <h2> Create new Weight </h2>
    
              <form className="form-group" onSubmit={this.handleFormSubmission}>
                <label>
                  Enter your weight in pounds:
                  <input
                  className="form-control"
                    name='weight'
                    type='text'
                    placeholder='150'
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
    
                <label>
                  Description:
                  <input
                  className="form-control"
                    name='description'
                    type='text'
                    placeholder='I had three krispy kreme donuts yesterday'
                    value={description}
                    onChange={this.handleInputChange}
                  />
                </label>
    
    
                <label>
                  Upload a picture:
                  <input
                  className="form-control"
                    name='picture'
                    type='text'
                    placeholder='www.cool-image.com'
                    value={picture}
                    onChange={this.handleInputChange}
                  />
                </label>
    
                <button className="btn btn-secondary"> Submit Weight </button>
              </form>
    
              {/* {message && <div>{message}</div>} */}
            </section>
          </>
        );
      }
    }
    