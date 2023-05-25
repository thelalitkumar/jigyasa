import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changePresent,
  solvedOptions,
  countUpdate,
  decIdx,
  incIdx,
  storeArray,
} from "../redux/slices/dataSlice";
import "../style/Bottom.css";
import Save from "./Save";

export default function Bottom() {
  const index = useSelector((state) => state.dataReducer.index);
  const data = useSelector((state) => state.dataReducer.data);
  const arrayEle = useSelector(
    (state) => state.dataReducer.userClickedArray[index]
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (data[index].present == "notVisited") {
      const present = "notAnswered";
      dispatch(changePresent({ index, present }));
    }
    dispatch(countUpdate());
  }, [index]);
  function sn() {
    if (arrayEle) {
      const present = "Answered";
      dispatch(changePresent({ index, present }));
    } else {
      const present = "notAnswered";
      dispatch(changePresent({ index, present }));
    }
    dispatch(incIdx());
  }
  function cn() {
    const val = null;
    dispatch(storeArray({ index, val }));
    const present = "notAnswered";
    dispatch(changePresent({ index, present }));
  }
  function prev() {
    const present = "notAnswered";
    if (data[index].present == "notVisited")
      dispatch(changePresent({ index, present }));
    dispatch(decIdx());
  }
  function mr() {
    if (arrayEle) {
      const present = "ansmark";
      dispatch(changePresent({ index, present }));
    } else {
      const present = "mark";
      dispatch(changePresent({ index, present }));
    }
    dispatch(incIdx());
  }
  const [showSave, setShowSave] = useState(false);

  const handleClose = () => {
    setShowSave(false);
  };

  const navigate = useNavigate();
  const saveTest = () => {
    dispatch(solvedOptions());
    navigate("/result");
  };

  return (
    <>
      <div className="Bottom">
        <div className="quesBtn">
          <button className="custom-btn" id="smbtn" onClick={() => prev()}>
            <p>Previous</p>
          </button>
          <button className="custom-btn" id="mrnbtn" onClick={() => mr()}>
            <p>Mark for Review & Next</p>
          </button>
          <button className="custom-btn" id="cbtn" onClick={() => cn()}>
            <p>Clear Response</p>
          </button>
          <button className="custom-btn" id="snbtn" onClick={() => sn()}>
            <p>Save & Next</p>
          </button>
        </div>
        <div className="subBtn">
          <button
            onClick={() => setShowSave(true)}
            className="custom-btn"
            id="subbtn"
          >
            <p>Submit</p>
          </button>
        </div>
      </div>
      {showSave && <Save onYes={saveTest} onNo={handleClose} />}
    </>
  );
}
