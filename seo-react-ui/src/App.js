
import { useContext, useState } from "react";
import { AddKeyword } from "./Components/AddKeyword";
import { KeywordsContext } from "./Contexts/KeywordsContext";

function App() {

  const {keywords, setKeywords} = useContext(KeywordsContext);

  return (
      <div>
          <AddKeyword/>
          {keywords.map(keyword => (
              <h1>{keyword.keyword}</h1>
          ))}
      </div>
  );
}

export default App;
