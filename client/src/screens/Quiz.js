import "../style/Quiz.css";
import Bottom from "../components/Bottom";
import ExamInfo from "../components/ExamInfo";
import QuesSec from "../components/QuesSec";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
export default function Quiz() {
  return (
    <div className="Quiz">
      <Navbar/>
      <ExamInfo />
      <div className="content">
        <QuesSec/>
        <Sidebar/>
      </div>
      <Bottom />
    </div>
  );
}
