import React, { Component } from 'react'
import { Line } from "react-chartjs-2"
import CreateSquatRecord from './CreateSquatRecord'
import CreateDeadliftRecord from './CreateDeadliftRecord'
import CreateBenchpressRecord from './CreateBenchpressRecord'
import DEADLIFT_SERVICE from '../../services/DeadLiftRecordService'
import BENCHPRESS_SERVICE from '../../services/BenchpressRecordService'
import SQUAT_SERVICE from '../../services/SquatRecordService'
export default class index extends Component {
    state = {
        data: {
            labels: [],
            datasets: [
                {
                    label: "Squat Weight",
                    data: [],
                    fill: false,
                    backgroundColor: "red",
                    borderColor: "red"
                },
                {
                    label: "Deadlift Weight",
                    data: [],
                    fill: false,
                    backgroundColor: "blue",
                    borderColor: "blue"
                },
                {
                    label: "Benchpress Weight",
                    data: [],
                    fill: false,
                    backgroundColor: "green",
                    borderColor: "green"
                }

            ]
        },
        options: {

        },

        legend : {
            display: true,
            position: 'top',
            labels: {
                fontColor: "#323130",
                fontSize: 15
              }

        }
    }


    componentDidMount = () => {
        // SQUAT_SERVICE.getDetails(this.props.currentUser._id)
        // .then(responseFromServer => {
        //     //console.log(responseFromServer.data)
        //     this.configureSquatData(responseFromServer.data)
        // }).catch(err=> console.log(err))
        Promise.all([SQUAT_SERVICE.getDetails(this.props.currentUser._id), DEADLIFT_SERVICE.getDetails(this.props.currentUser._id), BENCHPRESS_SERVICE.getDetails(this.props.currentUser._id)])
            .then(responseFromServer => {
                console.log(responseFromServer)
                //const { squats } = responseFromServer[0].data;
                let stateData = { ...this.state.data }
                stateData = this.configureSquatData(responseFromServer[0].data, stateData)
                //const { deadlifts } = responseFromServer[1].data;
                stateData = this.configureDeadliftData(responseFromServer[1].data, stateData)
                //const { benchpress } = responseFromServer[2].data;
                stateData = this.configureBenchpressData(responseFromServer[2].data, stateData)

                this.setState({
                    data: stateData,
                })
            })
            .catch(err => console.log(err));

    }

    configureSquatData = (data, stateData) => {
        //console.log(data)
        data.squatrecords.forEach((ele, index) => {
            const theDate = new Date(ele.date).toISOString().slice(0, 10).split('-').reverse().join('/')
            stateData.labels.push(theDate)
            stateData?.datasets?.[0]?.data.push(ele.weight)

        })
        return stateData;
        // console.log(this.data.labels)
        // console.log(this.data.datasets[0].data)

    }

    configureDeadliftData = (data, stateData) => {
        //console.log(data)
        data.deadliftrecords.forEach((ele, index) => {
            //const theDate = new Date(ele.date).toISOString().slice(0, 10).split('-').reverse().join('/')
            //this.data.labels.push(theDate)
            stateData?.datasets?.[1]?.data?.push(ele.weight)

        })
        return stateData;
        // console.log(this.data.labels)
        // console.log(this.data.datasets[0].data)

    }

    configureBenchpressData = (data, stateData) => {
        //console.log(data)
        data.benchrecords.forEach((ele, index) => {
            //const theDate = new Date(ele.date).toISOString().slice(0, 10).split('-').reverse().join('/')
            //this.data.labels.push(theDate)
            stateData?.datasets?.[2]?.data?.push(ele.weight)
        })
        return stateData;
        // console.log(this.data.labels)
        // console.log(this.data.datasets[0].data)

    }


    render() {
        console.log(this.state.data)
        return (
            <div className="container" >
                <div className="row" style={{margin :"25px"}}>
                    <div className="col">
                        <CreateSquatRecord currentUser={this.props.currentUser} />
                    </div>
                    <div className="col">
                        <CreateBenchpressRecord currentUser={this.props.currentUser} />
                    </div>
                    <div className="col">
                        <CreateDeadliftRecord currentUser={this.props.currentUser} />
                    </div>

                </div>
                <Line data={this.state.data} legend={this.state.legend} />
              
            </div>
        )
    }
}
