import React, { Component } from 'react'
import WORKOUT_SERVICE from '../../../services/WorkoutService';
import EXERCISE_SERVICE from '../../../services/ExerciseService';
import { Link } from 'react-router-dom'

export default class index extends Component {
    state = {
        name: '',
        description: '',
        exercises: []
    }

    componentDidMount = () => {
  
        this.loadListofWorkouts();
      
    }

    loadListofWorkouts  = () => {
        WORKOUT_SERVICE.getDetails(this.props.location.info.workout._id)
        .then(responseFromServer => {
            const {workout} = responseFromServer.data;
            //console.log(workout)
            this.setState({
                name : workout.name,
                description: workout.description,
                exercises: workout.exercises
            })
            
        }).catch(err => console.log(err))
    }

    deleteWorkout = (id) => {
            WORKOUT_SERVICE.delete(id)
            .then(responseFromServer => {
                this.props.history.push('/');
            }).catch(err => console.log(err))
    }

    deleteExercise = (id) => {
        EXERCISE_SERVICE.delete(id)
            .then(responseFromServer => {
                this.props.history.push('/');
            }).catch(err => console.log(err))
    }

    render() {
       // console.log(this.props.location.info.workout)
        
        const listOfExercises = this.state.exercises.map((eachExercise) => {
                console.log(eachExercise)
            return <li>{eachExercise.name}
            <Link to={{pathname:'/edit-exercise', info: {
                exercise: eachExercise
                }}}>Edit This Workout</Link>
                <button onClick={() => this.deleteExercise(eachExercise._id)}>Delete this exercise from this workout?</button>
            </li>

        })
        //console.log(this.state.exercises)
        return (
            <div>
                <ul>
                    <li>
                        {this.state.name}
                    </li>
                    <li>
                        {this.state.description}
                    </li>
                    <li>
                        <ul>
                            {listOfExercises}
                        </ul>
                    </li>
                    

                    <li><Link to={{pathname:'/add-exercise', info: {
                        workout: this.props.location.info.workout
                        }}}>Add exercises to this Workout</Link>
                    </li>
                    <li>
                        <button onClick={() =>this.deleteWorkout(this.props.location.info.workout._id)}>
                            Delete this workout?
                        </button>
                    </li>
                    
                </ul>
            </div>
        )
    }
}
