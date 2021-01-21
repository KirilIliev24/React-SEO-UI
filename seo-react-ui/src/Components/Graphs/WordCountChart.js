import {useEffect, useState} from "react"
import {Bar} from "react-chartjs-2"
import "../../Css/Charts.css"

export const WordCountChart = (props) =>{

    return(
        <div id = "chartDiv">
             <Bar
                data = {{
                    labels: props.dates,
                    datasets: [
                        {
                            label: "Word count",
                            data: props.wordCount    
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