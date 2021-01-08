
import { useContext, useState, useEffect } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { KeywordsContext } from "../Contexts/KeywordsContext";
import { LinksContext } from "../Contexts/LinksContext";
import axios from "axios";
import "../Css/SelectKeyword.css";


export const SelectKeyword = () =>{

    const [options, setOptions] = useState( [] );
 
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

    const getLinks = async(value) =>{
        await axios
        .get(
            `https://localhost:44325/SearchEngine/getByKeyword/${value.value}`,
            {headers: 
                {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "startDate": "2000-01-01",
                    "endDate": "2020-12-31"
                }
            })
        .then((result) => {
            const data = result.data;
            setLinks(data);
        })
        .catch((error) => console.log(error));
        console.log(value.value);
    }
       
    return (
            <div className = "row centerDiv">
                <div className = "col-md-12">
                    <Dropdown className = "dropDown" options = {options} onChange = {getLinks} value = "Choose keyword" />
                </div>
            </div>
    );
}