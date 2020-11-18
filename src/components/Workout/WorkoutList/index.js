import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import WORKOUT_SERVICE from '../../../services/WorkoutService'
import WorkoutForm from '../../Workout'
import '../../../List.css'

export default class index extends Component {

    state = {
        listOfWorkouts: []
    }


    componentDidMount = () => {
  
        // Promise.all([WORKOUT_SERVICE.getAllWorkouts(this.props.currentUser._id)])
        //   .then(responseFromServer => {
        //     const {workouts} = responseFromServer[0].data;
        //     console.log('this is in did mount', responseFromServer[0].data)

        //     //this.setState({listOfWorkouts: workouts})
        //     this.setState({
        //         listOfWorkouts : workouts
        //     })
        //     console.log('this is after setstate', this.state.listOfWorkouts)
        //     console.log('blah blaee')
        //   }).catch(err => console.log(err));

        this.loadListofWorkouts();
      
      
    }

    loadListofWorkouts  = () => {
        WORKOUT_SERVICE.getAllWorkouts(this.props.currentUser._id)
        .then(responseFromServer => {
            const {workouts} = responseFromServer.data;
            
            this.setState({listOfWorkouts : workouts})
            
        }).catch(err => console.log(err))
    }

    // renderListofExercises = () => {
    //     return listofExercises = this.state.listOfWorkouts.map(eachWorkout => {

    //     })
    // }


    onWorkoutChange = (workout) => {
        const updatedWorkouts = [...this.state.listOfWorkouts, workout]
        this.setState({listOfWorkouts : updatedWorkouts})
    }

    render() {
        console.log(this.state.listOfWorkouts)
        //console.log('why is this unefined?',this.state.listOfWorkouts)
        const listOfWorkouts = this.state.listOfWorkouts.map(eachWorkout => {
            const theDate = new Date(eachWorkout.date).toISOString().slice(0, 10).split('-').reverse().join('/')

            return (
            <div className="card" sytle={{width :"15rem"}}>
                <div className="card-body">
                <h3>{eachWorkout.name}</h3>
                <>{theDate}</>
                
                    
                <p className="card-text">{eachWorkout.description}</p>
                <Link  className="card-link" to={{pathname:'/update-workout', info: {
                    workout: eachWorkout
                }}}>Edit this Workout</Link>
                <br></br>
                {/* <li><Link to={{pathname:'/add-exercise', info: {
                    workout: eachWorkout
                }}}>Add exercises to this Workout</Link></li> */}
                <Link className="card-link" to={{pathname:'/workout-details', info: {
                    workout: eachWorkout
                }}}>See details of this workout</Link>
                    
                </div>
               
            </div>
            )
        })
        
        return (
            <div className="container">
                <WorkoutForm currentUser={this.props.currentUser} onWorkoutChange={this.onWorkoutChange}/>
                <h3>this is the list of workouts</h3>
                <ul>
                    <li className="image-list">{listOfWorkouts}</li>
                </ul>
            </div>
        )
    }
}
