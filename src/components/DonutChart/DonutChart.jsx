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
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
            //   "#A8B3C5",
            //   "#616774",
            //   "#DA92DB"
            ]
          }
        ]
      }
    
  
    
      return (
        <MDBContainer>
          <p className="mt-2">KCAL: {Math.round(kcal.quantity)}</p>
          <Pie data={dataPie} options={{ responsive: true }} />
        </MDBContainer>
      );
    

}

export default DonutChart;
