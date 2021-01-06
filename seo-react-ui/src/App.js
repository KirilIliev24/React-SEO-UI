
import { useContext, useState } from "react";
import { KeywordsContext } from "./Contexts/KeywordsContext";

function App() {

  const [word, setWord] = useState("");
  const {keywords, setKeywords} = useContext(KeywordsContext);

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
          {keywords.map(keyword => (
              <h1>{keyword.keyword}</h1>
          ))}
          <input type = "text" name = "word" value = {word} onChange = {updateWord}></input>   
          <button onClick = {addKeyword} >ADD KEYWORD</button>
      </div>
  );
}

export default App;
