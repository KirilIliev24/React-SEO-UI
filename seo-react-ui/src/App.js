
import { AddKeyword } from "./Components/AddKeyword";
import { LinkList } from "./Components/LinkList";
import { SelectKeyword } from "./Components/SelectKeyword";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Css/App.css";
import Header from "./Layout/Header";
import {LinkDetailsPage} from "./Components/Pages/LinkDetailsPage"

function App() {

  return (
    <Router>
       <Header/>
      <Route path = "/" exact >
      <div className = "container appContainer">
        <div className = "row firstRow">
          <div className = "col-md-6">
            <SelectKeyword/>
          </div>
          <div className = "col-md-6">
            <AddKeyword/>
          </div>
        </div>
        <div>
            <LinkList/>
        </div>  
      </div>
      </Route>
      <Route path = "/linkDetails" component = {LinkDetailsPage}></Route>
    </Router>
     
     
  );
}

export default App;
