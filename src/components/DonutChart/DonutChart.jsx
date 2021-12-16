import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
  

const DonutChart = ({macronutrients}) => {
   
    const {fat, carbs, protein, kcal} = macronutrients

    const dataPie = {
        labels: [fat.label, carbs.label, protein.label],
        datasets: [
          {
            data: [fat.quantity, carbs.quantity, protein.quantity],
            backgroundColor: [
                // "#afa0fc",
                // "#ff79a7",
                // "#ffa600",
                "#00db97",
                "#a3cb37",
                "#ffa600"
            ],
            hoverBackgroundColor: [
              "#00db9780",
              "#a3cb3780",
              "#ffa60080",
            //   "#A8B3C5",
            //   "#616774",
            //   "#DA92DB"
            ]
          }
        ]
      }
    
  
    
      return (
        <MDBContainer>
        <div className="row align-items-center">
          <div className="col-12 col-xl-4">
            <ul className="list-group">
              <li className="list-group-item">{kcal.label}: {Math.round(kcal.quantity)}{kcal.unit}</li>
              <li className="list-group-item">{fat.label}: {Math.round(fat.quantity)}{fat.unit}</li>
              <li className="list-group-item">{carbs.label}: {Math.round(carbs.quantity)}{carbs.unit}</li>
              <li className="list-group-item">{protein.label}: {Math.round(protein.quantity)}{protein.unit}</li>
            </ul>
          </div>
          <div className="col-12 col-xl-8 mt-3 mt-xl-0">
            <Pie data={dataPie} options={{ responsive: true }} />
          </div>
        </div>
        </MDBContainer>
      );
    

}

export default DonutChart;
