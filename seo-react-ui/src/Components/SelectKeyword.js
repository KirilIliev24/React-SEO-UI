
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

    const [options, setOptions] = useState( [] );
    const [selectedWord, setSelectedWord] = useState("");
    const [startDate, setStartDate] = useState(new Date(2000, 1, 1));   
    const [endDate, setEndDate] = useState(new Date());   
    const [chooseDatePanel, setChooseDatePanel] = useState(false);
    const {keywords, setKeywords} = useContext(KeywordsContext);
    const {links, setLinks} = useContext(LinksContext);
   
    useEffect( async() => {
            await axios
            .get(
                `https://localhost:44325/SearchEngine/getKeywords`,
                {headers: {}})
            .then((result) => {
                const data = result.data;
                setKeywords(data);
                setOptions(data);
                console.log(keywords.data.lenght());
            })
            .catch((error) => console.log(error));
    }, [])

    useEffect(() => {
        setOptions(keywords);
    }, [keywords])


    const getLinks = async() =>{
        await axios
        .get(
            `/getByKeyword/${selectedWord}`,
            {headers: 
                {
                    "startDate": `${startDate.toLocaleDateString()}`,
                    "endDate": `${endDate.toLocaleDateString()}`
                }
            })
        .then((result) => {
            const data = result.data;
            setLinks(data);
        })
        .catch((error) => console.log(error));
        console.log(selectedWord);
        console.log(startDate.toLocaleDateString());
        console.log(endDate.toLocaleDateString());


    }

    const chooseDate = () =>{
        setChooseDatePanel(!chooseDatePanel);
    }
       
    return (
            <div className = "row centerDiv">
                <div className = "col-md-8">
                    <Dropdown className = "dropDown" onChange = {word => setSelectedWord(word.label)} options = {options}  value = "Choose keyword" />
                </div>
                <div className = "col-md-2">
                    <button className = "getBtn" onClick = {chooseDate}>Date</button>
                </div>
                <div className = "col-md-2">
                    <button className = "getBtn" onClick = {getLinks}>Get links</button>
                </div>
              
                {chooseDatePanel ? 
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-md-5">
                                <DatePicker 
                                    className = "startDatePicker"
                                    selected = {startDate}
                                    dateFormat="P"
                                    onChange = {date => setStartDate(date)}/>
                            </div>
                            <div className = "col-md-5">
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