import React from 'react'
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AUTH_SERVICE from './services/AuthService';
// import WEIGHT_SERVICE from './services/WeightService';
// import WORKOUT_SERVICE from './services/WorkoutService';
import UserDetails from './components/User/GetDetails'
import EditUser from './components/User/EditDetails'
import LandingPage from './components/Authentication/LandingPage';
import WeightList from './components/Weight/ListWeights'
import Weight from './components/Weight'
import UpdateWeight from'./components/Weight/EditWeight'
import CreateExercise from './components/Exercise/CreateExercise'
import UpdateExercise from './components/Exercise/EditExercise'
import Workout from './components/Workout'
import WorkoutDetails from'./components/Workout/WorkoutDetails'
import WorkoutList from './components/Workout/WorkoutList'
import UpdateWorkout from './components/Workout/EditWorkout'
import Navbar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import Graphs from './components/Graphs'
import SquatRecords from './components/Graphs/EditSquatRecord'


class App extends React.Component {
state = {
  currentUser : null,
  listOfWeights: [],
  listOfWorkouts: []
};

componentDidMount = () => {
  
    AUTH_SERVICE.getAuthenticatedUser()
      .then(responseFromServer => {
        console.log(responseFromServer.data)
        const { user } = responseFromServer.data
        this.setState({
          currentUser : user
        })
      }).catch(err => console.log(err));
    
  
  
}

updateUser = user => {
  this.setState({currentUser: user})
}

  render() {
    //console.log(this.state.currentUser)
    //console.log(this.state.listOfWeights)
      return (
      <div className="container-fluid">
        <h1>Iron fitness</h1>
        <BrowserRouter>
        <nav>
        <Navbar currentUser={this.state.currentUser} onUserChange={this.updateUser} />
        </nav>
        <Switch>
        <Route exact path='/' render={props => <LandingPage {...props}  onUserChange={this.updateUser } /> } />
        {/* <Route exact path='/' render={props => {this.state.currentUser ? <Home {...props} currentUser={this.state.currentUser}/>:<LandingPage  onUserChange={this.updateUser } />}  } /> */}

        {/* <LoginRoute
              path='/'
              authorized={this.state.currentUser}
              redirect={'/home'}
              render={props => <LandingPage onUserChange={this.updateUser} />}
            /> */}

        <ProtectedRoute
              path='/user-details'
              authorized={this.state.currentUser}
              redirect={'/'}
              render={props => <UserDetails {...props} currentUser={this.state.currentUser} onUserChange={this.updateUser} />}
            />

        <ProtectedRoute
              path='/edit-user'
              authorized={this.state.currentUser}
              redirect={'/'}
              render={props => <EditUser {...props} currentUser={this.state.currentUser} />}
            />

        <ProtectedRoute
              path='/home'
              authorized={this.state.currentUser}
              redirect={'/'}
              render={props => <Home {...props} currentUser={this.state.currentUser} />}
            />
        
        <ProtectedRoute
              path='/workouts'
              authorized={this.state.currentUser}
              redirect={'/'}
              render={props => <WorkoutList {...props} currentUser={this.state.currentUser} />}
            />

        <ProtectedRoute
              path='/update-workout'
              authorized={this.state.currentUser}
              redirect={'/'}
              render={props => <UpdateWorkout {...props} currentUser={this.state.currentUser} />}
            />

        <ProtectedRoute
              path='/workout-details'
              authorized={this.state.currentUser}
              redirect={'/'}
              render={props => <WorkoutDetails {...props} currentUser={this.state.currentUser} />}
            />

        <ProtectedRoute
              path='/add-exercise'
              authorized={this.state.currentUser}
              redirect={'/'}
              render={props => <CreateExercise {...props} currentUser={this.state.currentUser} />}
            />

        <ProtectedRoute
              path='/edit-exercise'
              authorized={this.state.currentUser}
              redirect={'/'}
              render={props => <UpdateExercise {...props} currentUser={this.state.currentUser} />}
            />

        <ProtectedRoute
                      path='/weight'
                      authorized={this.state.currentUser}
                      redirect={'/'}
                      render={props => <WeightList {...props} currentUser={this.state.currentUser} />}
                    />

          <ProtectedRoute
                      path='/update-weight'
                      authorized={this.state.currentUser}
                      redirect={'/'}
                      render={props => <UpdateWeight {...props} currentUser={this.state.currentUser} />}
                    />

        <ProtectedRoute
                      path='/graphs'
                      authorized={this.state.currentUser}
                      redirect={'/'}
                      render={props => <Graphs {...props} currentUser={this.state.currentUser} />}
                    />

        <ProtectedRoute
                      path='/squat-records'
                      authorized={this.state.currentUser}
                      redirect={'/'}
                      render={props => <SquatRecords {...props} currentUser={this.state.currentUser} />}
                    />

        {/* <ProtectedRoute
                      path='/deadlift-records'
                      authorized={this.state.currentUser}
                      redirect={'/'}
                      render={props => <Graphs {...props} currentUser={this.state.currentUser} />}
                    />

        <ProtectedRoute
                      path='/benchpress-records'
                      authorized={this.state.currentUser}
                      redirect={'/'}
                      render={props => <Graphs {...props} currentUser={this.state.currentUser} />}
                    /> */}
      
      

        </Switch>
      
        
        
        {/* <hr/> 
        <Weight />
        <hr/>
        <Exercise />
        <hr/>
        <Workout /> */}
     
        </BrowserRouter>
         </div>
    );
  }
  
}

export default App;
