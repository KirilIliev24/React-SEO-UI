import {useEffect, useState} from "react"
import {Line} from "react-chartjs-2"
import "../../Css/Charts.css"

export const Position = (props) =>{


    return(
        <div id = "chartDiv">
            <Line
                data = {{
                    labels: props.dates,
                    datasets: [
                        {
                            label: "Position",
                            data: props.positions,
                            fill: false  
                        }
                        
                    ]
                }}
                height = {20}
                width = {40}
                options = {{
                    maintainAspectRatio: true
                }}
            />
        </div>
    )
}