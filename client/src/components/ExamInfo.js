import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTime } from "../redux/slices/dataSlice";
import "../style/ExamInfo.css";
import Modal from "./Modal";
import axios from "axios";

export default function ExamInfo() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [secondsLeft, setSecondsLeft] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      if (!sessionStorage.getItem("time")) {
        try {
          const { data: data } = await axios.get("/api/data");
          sessionStorage.setItem("time", data);
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    getData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remainingTime =
        parseInt(sessionStorage.getItem("time")) -
        Math.floor(Date.now() / 1000);
      setSecondsLeft(remainingTime >= 0 ? remainingTime : 0);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [secondsLeft]);
  useEffect(() => {
    if (secondsLeft === 0) {
      setShowModal(true);
    }
  }, [secondsLeft]);
  dispatch(setTime(secondsLeft));
  const hoursLeft = Math.floor(secondsLeft / 60 / 60);
  const minutesLeft = Math.floor((secondsLeft / 60) % 60);
  const secondsInMinute = secondsLeft % 60;

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const saveTest = () => {
    navigate("/result");
  };
  return (
    <>
      <div className="ExamInfo">
        <div className="q">
          <p>Candidate's Name</p>
          <p>School</p>
          <p>Remaining Time</p>
        </div>
        <div className="a">
          <p>
            : <span>{user.user ? user.user : "[your name]"}</span>
          </p>
          <p>
            : <span>{user.school ? user.school : "[your School]"}</span>
          </p>
          <p>
            :{" "}
            <span id="time">
              {hoursLeft > 9 ? hoursLeft : `0${hoursLeft}`}:
              {minutesLeft > 9 ? minutesLeft : `0${minutesLeft}`}:
              {secondsInMinute > 9 ? secondsInMinute : `0${secondsInMinute}`}
            </span>
          </p>
        </div>
      </div>
      {showModal && <Modal onOver={saveTest} />}
    </>
  );
}
