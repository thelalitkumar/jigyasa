import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/Main.css";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { AllOptions } from "../redux/slices/dataSlice";
export default function Instruction() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(AllOptions());
  return (
    <div className="Main">
      <Navbar />
      <div className="ir">instructions</div>
      <div className="b">
        <div className="top">
          <div className="a">
            <div className="al">Read the following instructions carefully</div>
          </div>
        </div>
        <u className="head">General Instructions:</u>
        <ol className="botol">
        <li className="botList">
          Total duration of the quiz is 45 minutes.
          </li>
          <li className="botList">
            The clock will be set at the server. The countdown timer in the top
            right corner of screen will display the remaining time available for
            you to complete the quiz. When the timer reaches zero, the
            quiz will end by itself. You will not be required to end or
            submit your quiz.
          </li>
          <li className="botList">
          The quiz has 40 Multiple Choice Questions (MCQ) totaling 120 marks.
          <ol className="subol" type="a">
          <li className="botList">All questions that are not attempted will result in ZERO marks.</li>
          <li className="botList">4 marks are given for every Correct answer and −1 marks, for every Incorrect answer.</li>
          </ol>
          </li>
          
          
          <li className="botList">
            The Question Palette displayed on the right hand side of screen will
            show the status of each question using one of the following symbols:
            <table style={{marginTop:'2vh',marginBottom:"1vh"}}>
              <tr>
                <td>
                  <span className="col-img Answered">
                    <p>1</p>
                  </span>
                </td>
                <td>
                  <p>You have answered the question.</p>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="col-img notAnswered">
                    <p>2</p>
                  </span>
                </td>
                <td>
                  <p>You have not answered the question.</p>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="col-img notVisited">
                    <p>3</p>
                  </span>
                </td>
                <td>
                  <p>You have not visited the question yet.</p>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="col-img mark">
                    <p>4</p>
                  </span>
                </td>
                <td>
                  <p>
                    You have NOT answered the question, but have marked the
                    question for review.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="col-img ansmark" style={{ width: "2rem" }}>
                    <p>5</p>
                  </span>
                </td>
                <td>
                  <p>
                    The question(s) "Answered and Marked for Review" will be
                    considered for evaluation.
                  </p>
                </td>
              </tr>
            </table>
            The Marked for Review status for a question simply indicates that you would like to look at that question again.
          </li>
        </ol>

        <u className="head">Navigating to a Question:</u>
        <ol className="botol" start={5}>
          <li className="botList">
            To answer a question, do the following:
            <ol className="subol" type="a">
              <li className="botList">
                Click on the question number in the Question Palette at the
                right of your screen to go to that numbered question directly.
                Note that using this option does NOT save your answer to the
                current question.
              </li>
              <li className="botList">
                Click on <strong>Save & Next</strong> to save your answer for
                the current question and then go to the next question.
              </li>
              <li className="botList">
                Click on <strong>Mark for Review & Next</strong> to save your
                answer for the current question, mark it for review, and then go
                to the next question.
              </li>
            </ol>
          </li>
        </ol>
        <u className="head">Answering a Question :</u>
        <ol className="botol" start={6}>
          <li className="botList">
            Procedure for answering a question:
            <ol className="subol" type="a">
              <li className="botList">
                To select your answer, click on the button of one of the options
              </li>
              <li className="botList">
                To deselect your chosen answer, click on the button of the
                chosen option again or click on the{" "}
                <strong>Clear Response</strong> button
              </li>
              <li className="botList">
                To change your chosen answer, click on the button of another
                option
              </li>
              <li className="botList">
                To save your answer, you MUST click on the{" "}
                <strong>Save & Next</strong> button
              </li>
              <li className="botList">
                To mark the question for review, click on the{" "}
                <strong>Mark for Review & Next</strong> button.
              </li>
              <li className="botList">
                To move to a previous question, click on the{" "}
                <strong>Previous</strong> button.
              </li>
            </ol>
          </li>

          <li className="botList">
            To change your answer to a question that has already been answered,
            first select that question for answering and then follow the
            procedure for answering that type of question.
          </li>
        </ol>
      </div>
      <div className="c">
        <button onClick={() => navigate("/")} className="custom-btn" id="cbtn">
          <p>Cancel</p>
        </button>
        <button
          onClick={() => navigate("/test")}
          className="custom-btn"
          id="mrnbtn"
        >
          <p>Proceed</p>
        </button>
      </div>
    </div>
  );
}