
import { useContext, useState, useEffect } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { KeywordsContext } from "../Contexts/KeywordsContext";
import { LinksContext } from "../Contexts/LinksContext";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Css/SelectKeyword.css";


export const SelectKeyword = () =>{

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState( [] );
    const [selectedWord, setSelectedWord] = useState("");
    const [startDate, setStartDate] = useState(new Date(2000, 1, 1));   
    const [endDate, setEndDate] = useState(new Date());   
    const [chooseDatePanel, setChooseDatePanel] = useState(false);
    const {keywords, getAllKeywords} = useContext(KeywordsContext);
    const {links, getLinks} = useContext(LinksContext);
   

    useEffect( async() => {
        await getAllKeywords();
        setIsLoading(false);
    }, [])

    useEffect(() => {
        setOptions(keywords);
    }, [keywords])


    const getLinksBtn = async() =>{
        setIsLoading(true);
        await getLinks(selectedWord, startDate, endDate);
        setIsLoading(false);
    }

    const chooseDate = () =>{
        setChooseDatePanel(!chooseDatePanel);
    }
       
    return (
            <div className = "row centerDiv">
                <div className = "col-md-6">
                    <Dropdown className = "dropDown" onChange = {word => setSelectedWord(word.label)} options = {options}  value = "Choose keyword" />
                </div>
                <div className = "col-md-6 buttons">
                    <button className = "getBtn" onClick = {chooseDate}>Date</button>
                    <button className = "getBtn" onClick = {getLinksBtn} disabled = {isLoading}>Get links</button>

                </div>
                {/* <div className = "col-md-2">
                </div> */}
              
                {chooseDatePanel ? 
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-md-4">
                                <label>Start date:</label>
                                <DatePicker 
                                    className = "startDatePicker"
                                    selected = {startDate}
                                    dateFormat="P"
                                    onChange = {date => setStartDate(date)}/>
                            </div>
                            <div className = "col-md-4">
                                <label>End date:</label>
                                <DatePicker 
                                    className = "startDatePicker"
                                    selected = {endDate}
                                    dateFormat="P"
                                    onChange = {date => setEndDate(date)}/>
                            </div>
                        </div>
                      
                    </div>
                : null}
            </div>
    );
}