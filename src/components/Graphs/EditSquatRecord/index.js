import React, { Component } from 'react'
import SQUAT_SERVICE from '../../../services/SquatRecordService'

export default class index extends Component {
    state = {
        squatRecords : []

    }

    componentDidMount = () => {
        SQUAT_SERVICE.getDetails(this.props.currentUser._id)
        .then(responseFromServer => {
            //console.log(responseFromServer.data)
            this.setState({
                squatRecords : responseFromServer.data.squatrecords
            })
        }).catch(err => console.log(err))

    }

    listTheSquatRecords = () => {
        return this.state.squatRecords.map(ele => {
            return (
            <li>Date: {ele.date} Weight: {ele.weight} lbs.</li>
            )
        })
    }


    render() {
         const theRecords = this.listTheSquatRecords();
         
        console.log(this.state.squatRecords)
        return (
            <div>
                Listing the squat records
                <ul>
                    {theRecords}
                </ul>
            </div>
        )
    }
}
