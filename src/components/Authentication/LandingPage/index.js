import React, { Component } from 'react'
import Signup from '../Signup'
import Login from '../Login'

export default class index extends Component {


    render() {
        console.log('this is the landing page', this.props)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <Signup {...this.props} onUserChange={this.props.onUserChange}/>
                    </div>
                    
                    <div className="col-sm" >
                        <Login {...this.props} onUserChange={this.props.onUserChange}/>
                    </div>

                </div>
                
                
            </div>
        )
    }
}
