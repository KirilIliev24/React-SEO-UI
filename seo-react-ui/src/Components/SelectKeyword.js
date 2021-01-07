
import { useContext, useState, useEffect } from "react";
import Dropdown from 'react-dropdown';
import { KeywordsContext } from "../Contexts/KeywordsContext";
import axios from "axios";

export const SelectKeyword = () =>{

    const [chosenWord, setChosenWord] = useState("Some word");
    const {options, setOptions} = useState([]);
    const {keywords, setKeywords} = useContext(KeywordsContext);
   
    useEffect( async() => {
            await axios
            .get(
                `https://localhost:44325/SearchEngine/getKeywords`,
                {headers: {}})
            .then((result) => {
                const data = result.data;
                setKeywords({data});
                setOptions(keywords.data);
                console.log(keywords.data.lenght());
            })
            .catch((error) => console.log(error));
    }, [])


    // onSelect(() => {
    //     console.log(chosenWord);
    // })
       
    return (
        <div>
           {/* <Dropdown options = {keywords} value = {chosenWord} placeholder = "Select keyword"/> */}
        </div>
    );
}