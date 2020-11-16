import React, { Component } from 'react'
import Signup from '../Signup'
import Login from '../Login'

export default class index extends Component {


    render() {
        //console.log(this.props)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <Signup onUserChange={this.props.onUserChange}/>
                    </div>
                    
                    <div className="col-sm" >
                        <Login onUserChange={this.props.onUserChange}/>
                    </div>

                </div>
                
                
            </div>
        )
    }
}
