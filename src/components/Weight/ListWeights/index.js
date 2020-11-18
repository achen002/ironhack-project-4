import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import WEIGHT_SERVICE from '../../../services/WeightService'
import WeightForm from '../../Weight'
import "../../../List.css"
import { Line } from "react-chartjs-2";

 

export default class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
                labels: [],
                data: [],
                listOfWeights : []
            }

    //     this.data = {
    //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    //     datasets: [
    //       {
    //         label: "Weight",
    //         data: [33, 53, 85, 41, 44, 65],
    //         fill: true,
    //         backgroundColor: "rgba(75,192,192,0.2)",
    //         borderColor: "rgba(75,192,192,1)"
    //       },
          
    //     ]
    //   };

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
            // this.setState({
            //     labels : [...this.state.labels, theDate],
            //     data : [...this.state.data, ele.weight]
            // })
            this.data.labels.push(theDate)
            this.data.datasets[0].data.push(ele.weight)
        })

        console.log(this.data.labels)
        console.log(this.data.datasets[0].data)

    }

    onWeightChange = (weight) => {
        const updatedWeights = [...this.state.listOfWeights, weight]
        this.setState({listOfWeights : updatedWeights})
    }

    


    render() {


        
        const listOfWeights = this.state.listOfWeights.map(eachWeight => {
            const theDate = new Date(eachWeight.date).toISOString().slice(0, 10).split('-').reverse().join('/')
            return (
            <div className="card" sytle={{width :"15rem"}}>
                <div className="card-body">
                    <h5 >{theDate}</h5>
                    <h6 className="card-subtitle">{eachWeight.weight} lbs</h6>
                    <p className="card-text">{eachWeight.description}</p>
                    <Link className="card-link" to={{pathname:'/update-weight', info: {
                        weight: eachWeight
                    }}}>Edit this Weight</Link>

                </div>
                
            </div>
            )
        })
        return (
            <div>
                <WeightForm currentUser={this.props.currentUser} onWeightChange={this.onWeightChange}/>
                <h3>this is the list of weights</h3>
                <ul>
                    <li className="image-list">{listOfWeights}</li>
                </ul>
                <Line data = {this.data} />
            
            </div>
        )
    }
}
