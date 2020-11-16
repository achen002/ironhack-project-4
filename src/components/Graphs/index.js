import React, { Component } from 'react'
import { Line } from "react-chartjs-2"
import CreateSquatRecord from './CreateSquatRecord'
import CreateDeadliftRecord from './CreateDeadliftRecord'
import CreateBenchpressRecord from './CreateBenchpressRecord'
import DEADLIFT_SERVICE from '../../services/DeadLiftRecordService'
import BENCHPRESS_SERVICE from '../../services/BenchpressRecordService'
import SQUAT_SERVICE from '../../services/SquatRecordService'
export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // data : {
            //         labels: [],
            //         datasets: [
            //           {
            //             label: "Squat Weight",
            //             data: [],
            //             fill: true,
            //             backgroundColor: "rgba(75,192,192,0.2)",
            //             borderColor: "rgba(75,192,192,1)"
            //           },
                      
            //         ]
            //       }
        
        }

        this.data = {
            labels: [],
            datasets: [
              {
                label: "Squat Weight",
                data: [],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              },
              
            ]
          }

    }

    componentDidMount = () => {
        SQUAT_SERVICE.getDetails(this.props.currentUser._id)
        .then(responseFromServer => {
            //console.log(responseFromServer.data)
            this.configureSquatData(responseFromServer.data)
        }).catch(err=> console.log(err))
    }

    configureSquatData = (data) => {
        console.log(data)
        data.squatrecords.forEach((ele, index) => {
            const theDate = new Date(ele.date).toISOString().slice(0, 10).split('-').reverse().join('/')
            this.data.labels.push(theDate)
            this.data.datasets[0].data.push(ele.weight)
          
            

        })

        // console.log(this.data.labels)
        // console.log(this.data.datasets[0].data)

    }


    render() {
        return (
            <div>
                
                    <CreateSquatRecord currentUser={this.props.currentUser} />
                    <Line data ={this.data} />
            </div>
        )
    }
}
