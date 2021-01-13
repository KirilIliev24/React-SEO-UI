
import { AddKeyword } from "./Components/AddKeyword";
import { LinkList } from "./Components/LinkList";
import { SelectKeyword } from "./Components/SelectKeyword";
import "./Css/App.css";
import Header from "./Layout/Header";

function App() {

  return (
      <div className = "contaier">
        <div className = "row">
          <Header/>
        </div>
        <div className = "row">
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
  );
}

export default App;
