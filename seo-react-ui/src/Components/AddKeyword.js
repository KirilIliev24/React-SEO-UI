
import { useContext, useState, useEffect } from "react";
import { KeywordsContext } from "../Contexts/KeywordsContext";

export const AddKeyword = () =>{

    const [word, setWord] = useState("");
    const {keywords, setKeywords} = useContext(KeywordsContext);
  
   
    useEffect(() => {
        if(keywords === null)
        {   
            //fetch api
            setKeywords(previousKeywords => [...previousKeywords, {id: 3, keyword: word}]);
        }
    }, [])
       

    const updateWord = e =>{
      setWord(e.target.value);
    }
  
    const addKeyword = e =>{
      e.preventDefault();
      setKeywords(previousKeywords => [...previousKeywords, {id: 3, keyword: word}]);
      setWord("");
    }

    return (
        <div>
            <input type = "text" name = "word" value = {word} onChange = {updateWord}></input>   
            <button onClick = {addKeyword} >ADD KEYWORD</button>
        </div>
    );
}