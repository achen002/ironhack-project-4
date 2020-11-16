import React, { Component } from 'react'
import WORKOUT_SERVICE from '../../../services/WorkoutService'
import { Link } from 'react-router-dom'

export default class index extends Component {
    state = {
        name : '',
        date : '',
        exercises : []
    }


    componentDidMount = () => {
        WORKOUT_SERVICE.getAllWorkouts(this.props.currentUser._id)
        .then(responseFromServer => {
            console.log(responseFromServer.data.workouts)

            const copyArr = [...responseFromServer.data.workouts]
            const reverseArr = copyArr.reverse();
            console.log('this is reverse', reverseArr)
            const latestWorkout = reverseArr[0]
            console.log(latestWorkout)
            const formattedDate = new Date(latestWorkout.date).toISOString().slice(0, 10).split('-').reverse().join('/')
            this.setState({
                date : formattedDate,
                name : latestWorkout.name,
                exercises : latestWorkout.exercises
            })


        }).catch(err=> console.log(err))

    }


render() {
    //console.log(this.state)
    return (
        <div className="card" style={{width : "25rem"}}>
            <div className="card-body">
                <div className="card-title">
                    <h3>Your latest workout</h3>
                </div>
                <div>
                    {this.state.date}
                </div>
                <div>
                    {this.state.name}
                </div>
                <div>
                    <Link>Go to this workout</Link>
                </div>

            </div>
            
        </div>
    )
}
}
