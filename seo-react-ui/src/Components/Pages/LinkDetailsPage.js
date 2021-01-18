import _default from "react-bootstrap/esm/CardColumns"


import { useContext, useState, useEffect} from "react";
import { LinkDetailsContext } from "../../Contexts/LinkDetailsContext";
import { useLocation} from "react-router-dom";
import { Position } from "../Graphs/Position";
import { CssChart } from "../Graphs/CssChart";
import { JsChart } from "../Graphs/JsChart";
import { WordCountChart } from "../Graphs/WordCountChart";
import { useLoading, Oval } from '@agney/react-loading'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../Css/LinkDetailList.css"
import { ExternalLinks } from "../ExternalLinks";

export const LinkDetailsPage = () =>{

    const {linkDetails, resetData, getLinksDetails} = useContext(LinkDetailsContext);

    const [positions, setPositions] = useState([]);
    const [dates, setDates] = useState([]);
    const [js, setJs] = useState([]);
    const [css, setCss] = useState([]);
    const [wordCount, setWordCount] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [isloading, setIsLoading] = useState(true);
    const { containerProps, indicatorEl } = useLoading({
        loading: isloading,
        indicator: <Oval width="50" />,
      });

    const dataPass = useLocation();

 

    useEffect(() => {
        if(linkDetails.lenght !== 0)
        {
            linkDetails.map(detailObject =>{
                setPositions(prevData => [...prevData, detailObject.position]);
                setDates(prevData => [...prevData, detailObject.date]);
                setJs(prevData => [...prevData, detailObject.js]);
                setCss(prevData => [...prevData, detailObject.css]);
                setWordCount(prevData => [...prevData, detailObject.wordCount]);
            });
        }
        
      
    }, [linkDetails])
    
    useEffect(async() => {
        console.log(dataPass.dataPass.link);
        setIsLoading(true);
        await getLinksDetails(dataPass.dataPass.link, dataPass.dataPass.keyword, new Date(2000, 1, 1), new Date());
        setIsLoading(false);
        return () => {
            setIsLoading(true);
            console.log("Component unmount");
            resetData();
        }
    }, [])

    const getLinksDetailsByDate = async() => {
        setIsLoading(true);
        resetData();
        resetLocalData();
        await getLinksDetails(dataPass.dataPass.link, dataPass.dataPass.keyword, startDate, endDate);
        setIsLoading(false);
    }

    const resetLocalData = () =>{
        setDates([]);
        setJs([]);
        setCss([]);
        setPositions([]);
        setWordCount([]);
    }

    return(
        <div>
            {isloading ? 
            <div className = "spinner">{indicatorEl}</div>
            : 
            <div className = "container-fluid chartContainer">
                    <div className = "row">
                        <div className = "col-md-6 centerChart">
                            <Position positions = {positions} dates = {dates}/>
                        </div>
                        <div className = "col-md-6 centerChart">
                            <CssChart css = {css} dates = {dates}/>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col-md-6 centerChart">
                            <JsChart js = {js} dates = {dates}/>
                        </div>
                        <div className = "col-md-6 centerChart">
                            <WordCountChart wordCount = {wordCount} dates = {dates}/>
                        </div>
                    </div>
                    <div className = "row datePickersDiv">
                        <div className = "col-md-6 startDate">
                            <label>Start date:</label>
                            <DatePicker 
                                className = "startDatePicker"
                                selected = {startDate}
                                dateFormat="P"
                                onChange = {date => setStartDate(date)}/>
                        </div>
                        <div className = "col-md-6 endDate">
                            <label>End date:</label>
                            <DatePicker 
                                className = "startDatePicker"
                                selected = {endDate}
                                dateFormat="P"
                                onChange = {date => setEndDate(date)}/>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col-md-12 chartBtnDiv">
                            <button onClick = {getLinksDetailsByDate}>Get data</button>
                        </div>
                    </div>
                </div>
            }
            <div className = "container">
                <ExternalLinks link = {dataPass.dataPass.link}/>
            </div>
        </div>
       
    )
}