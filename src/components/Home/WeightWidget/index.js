import React, { Component } from 'react'
import WEIGHT_SERVICE from '../../../services/WeightService'

export default class index extends Component {
        state = {
            weight : 0,
            date : ''
        }


        componentDidMount = () => {
            WEIGHT_SERVICE.getAllWeights(this.props.currentUser._id)
            .then(responseFromServer => {
                console.log(responseFromServer.data.weights)

                const copyArr = [...responseFromServer.data.weights]
                const reverseArr = copyArr.reverse();
               // console.log('this is reverse', reverseArr)
                const latestWeight = reverseArr[0]
                //console.log(latestWeight)
                const formattedDate = new Date(latestWeight.date).toISOString().slice(0, 10).split('-').reverse().join('/')
                this.setState({
                    weight : latestWeight.weight,
                    date : formattedDate
                })


            }).catch(err=> console.log(err))

        }


    render() {
        console.log(this.state)
        return (
            <div className="card" style={{width : "25rem"}}>
                <div className="card-body">
                    <div className="card-title">
                        <h3>Your latest weight entry</h3>
                    </div>
                    <div>
                        {this.state.date}
                    </div>
                    <div>
                        {this.state.weight} lbs
                    </div>

                </div>
                
            </div>
        )
    }
}
