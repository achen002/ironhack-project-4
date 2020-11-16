import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import WEIGHT_SERVICE from '../../../services/WeightService'

export default class index extends Component {
    constructor(props) {
        super(props)

        this.data = {
            labels: [],
            datasets: [
              {
                label: "Weight",
                data: [],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              },
              
            ]
          };

    }

    componentDidMount = () => {
  
        Promise.all([WEIGHT_SERVICE.getAllWeights(this.props.currentUser._id)])
          .then(responseFromServer => {
            const {weights} = responseFromServer[0].data;
            const weightsForList = [];
            console.log(responseFromServer[0].data.weights)
            for(let i=0; i < 5; i ++) {
                weightsForList.push(responseFromServer[0].data.weights[i])
            }
            console.log(weights)
            this.configureLineChart(weights)
            this.setState({listOfWeights: weights})
          }).catch(err => console.log(err));
    
      
      
    }

    configureLineChart = (data) => {
        console.log(data)
        data.forEach((ele, index) => {
            const theDate = new Date(ele.date).toISOString().slice(0, 10).split('-').reverse().join('/')
           
            this.data.labels.push(theDate)
            this.data.datasets[0].data.push(ele.weight)
        })

        console.log(this.data.labels)
        console.log(this.data.datasets[0].data)

    }
    render() {
        return (
            <div>
                <Line data = {this.data} />
            </div>
        )
    }
}
