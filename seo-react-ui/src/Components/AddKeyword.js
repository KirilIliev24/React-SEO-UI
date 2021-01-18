
import { useContext, useState} from "react";
import { KeywordsContext } from "../Contexts/KeywordsContext";
// import axios from "axios";
import "../Css/AddKeyword.css";

export const AddKeyword = () =>{

    const [word, setWord] = useState("");
    const {setKeywords} = useContext(KeywordsContext);
  


    const updateWord = e =>{
      setWord(e.target.value);
    }
  
    const addKeyword = e =>{
      e.preventDefault();
      //add post keyword
      setKeywords(previousKeywords => [...previousKeywords, word]);
      setWord("");
    }

    return (
        <div className = "row inputComponentDiv">
          <div className = "col-lg-5 inputDiv">
            <input className = "inputField" type = "text" name = "word" value = {word} onChange = {updateWord}></input>   
          </div> 
          <div className = "col-lg-5 addBtnDiv">
            <button className = "addBtn" onClick = {addKeyword} >ADD KEYWORD</button>
          </div>
        </div>
    );
}