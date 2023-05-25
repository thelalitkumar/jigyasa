import {BrowserRouter,Routes,Route} from "react-router-dom";
import Instruction from "./Instruction";
import Quiz from "./Quiz";
import Reg from "./Reg";
import Result from "./Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Reg/>}/>
        <Route path="/home" element={<Instruction/>}/>
        <Route path="/test" element={<Quiz/>}/>
        <Route path="/result" element={<Result/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
