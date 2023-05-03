import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeArray } from "../redux/slices/dataSlice";
import "../style/QuesSec.css";

export default function QuesSec() {
  const index = useSelector((state) => state.dataReducer.index);
  const question = useSelector((state) => state.dataReducer.data[index]);
  const arrayEle =useSelector((state) => state.dataReducer.userClickedArray[index]);


  const dispatch=useDispatch();
  function record(clickedAns){
    dispatch(storeArray({index,clickedAns}))
  }

  return (
    <div className="QuesSec">
      <div className="top">
        <div className="quesNo">
          <h6>
            Question <span id="qno">{index + 1}</span>
          </h6>
        </div>

        <div className="marks">
          <p>4/-1</p>
        </div>
      </div>

      <div className="ques">
        <p>{question?.question}</p>
      </div>

      <div className="options">
        <input type="radio" name="size" id="a-option" onClick={()=>record(question?.a)} checked={arrayEle===question?.a} />
        <label htmlFor="a-option">{question?.a}</label>

        <input type="radio" name="size" id="b-option" onClick={()=>record(question?.b)} checked={arrayEle===question?.b}/>
        <label htmlFor="b-option">{question?.b}</label>

        <input type="radio" name="size" id="c-option" onClick={()=>record(question?.c)} checked={arrayEle===question?.c}/>
        <label htmlFor="c-option">{question?.c}</label>

        <input type="radio" name="size" id="d-option" onClick={()=>record(question?.d)} checked={arrayEle===question?.d}/>
        <label htmlFor="d-option">{question?.d}</label>
      </div>
    </div>
  );
}
