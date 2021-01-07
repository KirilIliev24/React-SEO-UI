
import { useContext} from "react";
import { AddKeyword } from "./Components/AddKeyword";
import { SelectKeyword } from "./Components/SelectKeyword";

function App() {

  return (
      <div>
          <SelectKeyword/>
          <AddKeyword/>
      </div>
  );
}

export default App;
