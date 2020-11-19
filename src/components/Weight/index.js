import React, { Component } from 'react'
import WEIGHT_SERVICE from '../../services/WeightService';
import axios from 'axios'

export default class index extends Component {
    state = {
        weight: '',
        date: '',
        photo: '',
        description: '',
        message: null
      };
    
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
    
        const { weight, date, picture, description, } = this.state;
        const userId = this.props.currentUser._id;
        
    
        // WEIGHT_SERVICE.createWeight(userId,{ weight, date, picture, description })
        //   .then(responseFromServer => {
        //     const { weight } = responseFromServer.data;
            
        //     this.props.onWeightChange(weight);
        //     this.props.history.push('/');
        //   })
        //   .catch(err => {
        //     if (err.response && err.response.data) {
        //       return this.setState({ message: err.response.data.message });
        //     }
        //   });

        const uploadData = new FormData();

        uploadData.append("photo", this.state.photo);
        uploadData.append("weight", this.state.weight);
        uploadData.append("date", this.state.date);
        uploadData.append("description", this.state.description);
          //console.log('this is the upload data', uploadData)
        axios
            .post(`${process.env.REACT_APP_SERVER_POINT}/weight/${userId}`, uploadData, {
                 headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            })
            .then((responseFromServer) => {
              const { weight } = responseFromServer.data;
             // console.log(weight)
                this.props.onWeightChange(weight);
                   this.props.history.push('/');
                this.fileInput.value = "";

                // this.setState({
                //     title: "",
                //     price: 0,
                //     inStock: false,
                //     description: "",
                // });
            })
            .catch(err => {
                  if (err.response && err.response.data) {
                    return this.setState({ message: err.response.data.message });
                  }
                });

      };
    
      render() {
        const { weight, date, photo, description, } = this.state;
        return (
          <>
            <section>
              <h2> Enter your Weight </h2>
    
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
                    name='photo'
                    type='file'
                    placeholder='www.cool-image.com'
                    //value={picture}
                    onChange={this.handleImageChange}
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
    