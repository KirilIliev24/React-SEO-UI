
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
        <div className = "row">
          <div className = "col-md-12">
            <input type = "text" name = "word" value = {word} onChange = {updateWord}></input>   
            <button className = "addBtn" onClick = {addKeyword} >ADD KEYWORD</button>
          </div> 
        </div>
    );
}