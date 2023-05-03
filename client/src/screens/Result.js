import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Navbar from "../components/Navbar";
import "../style/Result.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { scoreUpdate, setCorrect } from "../redux/slices/dataSlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfGenerator from "../components/PdfGenerator";

export default function Result() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dataReducer.data);
  const correctOptions = useSelector(
    (state) => state.dataReducer.correctOptions
  );

  const attemptedOptions = useSelector(
    (state) => state.dataReducer.attemptedOptions
  );

  const identity = useSelector((state) => state.dataReducer.identity);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: data } = await axios.post(
          "/check-answers",
          attemptedOptions
        );
        dispatch(scoreUpdate(data.score));

        const { data: correctOptions } = await axios.post(
          "/correct-options",
          identity
        );
        dispatch(setCorrect(correctOptions));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [attemptedOptions]);

  const correct = useSelector((state) => state.dataReducer.correct);
  const incorrect = useSelector((state) => state.dataReducer.incorrect);
  const len = useSelector((state) => state.dataReducer.data.length);
  const got = correct * 4 + incorrect * -1;
  const totatmark = len * 4;
  let _result = (got / totatmark) * 100;
  _result = _result.toFixed(1);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const answered = useSelector((state) => state.dataReducer.answered);
  const notAnswered = useSelector((state) => state.dataReducer.notAnswered);
  const notVisited = useSelector((state) => state.dataReducer.notVisited);
  const ansReview = useSelector((state) => state.dataReducer.ansReview);
  const markedReview = useSelector((state) => state.dataReducer.markedReview);
  const optionsA = {
    colors: ["rgba(0, 100, 0,1)", "rgba(0,244, 0,1)"],
    chart: {
      type: "donut",
      height: "100%",
      width: "100%",
    },
    labels: ["Correct", "Incorrect"],
    plotOptions: {
      pie: {
        size: "100%",
        donut: {
          size: "65%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };
  const A = [correct, incorrect];

  // ****************************************************************************************************
  const optionsB = {
    colors: ["rgba(0, 0, 244,1)", "rgba(0, 0, 100,1)"],
    chart: {
      type: "donut",
      height: "100%",
      width: "100%",
    },
    labels: ["Attempted", "Unattempted"],
    plotOptions: {
      pie: {
        size: "100%",
        donut: {
          size: "65%",
        },
      },
    },
    // dataLabels: {
    //   formatter: function (val, opts) {
    //       return opts.w.config.series[opts.seriesIndex]
    //   },
    // },
    dataLabels: {
      enabled: false,
    },
  };
  const B = [answered + markedReview, notAnswered + notVisited + markedReview];

  // ****************************************************************************************************
  const chartOptions = {
    series: [answered, notAnswered, notVisited, markedReview, ansReview],
    labels: [
      "Answered",
      "Not Answered",
      "Not Visited",
      "Marked for Review",
      "Answered & Marked for Review",
    ],
    // dataLabels: {
    //   formatter: function (val, opts) {
    //       return opts.w.config.series[opts.seriesIndex]
    //   },
    // },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        size: "100%",
        donut: {
          size: "30%",
        },
      },
    },
  };

  // *************************************************************************************************
  const _progress = got;
  const _radius = 45;
  const _circumference = 2 * Math.PI * _radius;
  const _progressOffset =
    _circumference - (_circumference * _progress) / totatmark;

  const secondsLeft = 45 * 60 - useSelector((state) => state.dataReducer.timer);
  const minutesLeft = Math.floor((secondsLeft / 60) % 60);
  const secondsInMinute = secondsLeft % 60;

  const avgsecondsLeft = secondsLeft / (correct + incorrect);
  const avgminutesLeft = Math.floor((avgsecondsLeft / 60) % 60);
  const avgsecondsInMinute = avgsecondsLeft % 60;
  return (
    <div className="Result">
      <Navbar />
      <div className="ResultStat">
        <div className="leftContent">
          <div className="resdata">
            <div className="data">
              <div className="bioA">
                <p>Candidate's Name</p>
                <p>Class</p>
                <p>Roll No.</p>
                <p>School Name</p>
              </div>
              <div className="bioB">
                <p>
                  : <span>{user.user ? user.user : "[your name]"}</span>
                </p>
                <p>
                  : <span>{user.class ? user.class : "[your Class No.]"}</span>
                </p>
                <p>
                  : <span>{user.roll ? user.roll : "[your Roll No.]"}</span>
                </p>
                <p>
                  :{" "}
                  <span>
                    {user.school ? user.school : "[your School Name]"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="resContent">
            <div className="chart">
              <p className="sam">Response Summary</p>
              <Chart
                options={chartOptions}
                series={chartOptions.series}
                type="donut"
                width="90%"
                height="90%"
              />
            </div>
          </div>
        </div>
        <div className="rightContent">
          <div className="alfha">
            <div className="timeAlfha">
              <div className="time">
                <p className="apj">Attempted / Unattempted</p>
                <Chart options={optionsB} series={B} type="donut" />
              </div>
            </div>
            <div className="unaaAlfha">
              <div className="ans">
                <p className="apj">Correct / Incorrect</p>
                <Chart options={optionsA} series={A} type="donut" />
              </div>
            </div>
          </div>
          <div className="beta">
            <div className="goal">
              <div className="timeBar">
                <div className="bar">
                  <p className="hah">
                    <FontAwesomeIcon icon={faStopwatch} className="tow" />
                    {minutesLeft}min {secondsInMinute}sec
                  </p>
                  <p className="ha">Completion Time</p>
                </div>
              </div>
              <div className="avgBar">
                <div className="bar">
                  <p className="hah">
                    <FontAwesomeIcon icon={faStopwatch} className="tow" />
                    {avgminutesLeft}min {Math.ceil(avgsecondsInMinute / 100)}sec
                  </p>
                  <p className="ha">Avg. Time / Question</p>
                </div>
              </div>
            </div>
            <div className="scorePlate">
              <div className="score">
                <div className="left">
                  <svg className="_progress-circle" viewBox="0 0 100 100">
                    <circle
                      className="_progress-background"
                      cx="50"
                      cy="50"
                      r={_radius}
                    />
                    <circle
                      className="_progress"
                      cx="50"
                      cy="50"
                      r={_radius}
                      strokeDasharray={`${_circumference} ${_circumference}`}
                      strokeDashoffset={_progressOffset}
                    />
                    <text className="_progress-text" x="50" y="50">
                      <tspan className="_progress-percent" x="50" dy="0.3em">
                        {got}/{totatmark}
                      </tspan>
                      <tspan className="_progressscore-text" x="50" dy="1.2em">
                        Your score
                      </tspan>
                    </text>
                  </svg>
                </div>
                <div className="right">
                  <p className="haha">
                    <span className="wow">
                      {_result > 60 ? "Fantastic work!" : "Keep pushing!"}
                    </span>
                  </p>
                  {_result > 60 ? (
                    <>
                      <p className="haha">
                        You've scored a <span className="how">{_result}%</span>{" "}
                        score,
                      </p>
                      <p className="haha"> keep striving for excellence.</p>
                    </>
                  ) : (
                    <>
                      <p className="haha">Every attempt is a step closer</p>
                      <p className="haha">to improvement .</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="Retry">
              <button className="retry">
                <PDFDownloadLink
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "1.19vw",
                  }}
                  document={
                    <PdfGenerator
                      data={data}
                      correctOptions={correctOptions}
                      correct={correct}
                      incorrect={incorrect}
                      got={got}
                      totatmark={totatmark}
                      Answered={answered + markedReview}
                      NotAnswered={notAnswered + notVisited + markedReview}
                      minutesLeft={minutesLeft}
                      secondsInMinute={secondsInMinute}
                    />
                  }
                  fileName="scoreCard.pdf"
                >
                  {({ blob, url, loading, error }) =>
                    loading
                      ? "Generating Score Analysis Report"
                      : "Click to Download Score Analysis Report"
                  }
                </PDFDownloadLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
