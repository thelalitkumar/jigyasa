import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePresent, jump2idx } from "../redux/slices/dataSlice";
import "../style/quesBlock.css";

export default function QuesBlock() {
  const index = useSelector((state) => state.dataReducer.index);
  const data = useSelector((state) => state.dataReducer.data);
  const dispatch=useDispatch();

  function jump(idx){
    const present="notAnswered";
    if(data[index].present=="notVisited")dispatch(changePresent({index,present}));
    dispatch(jump2idx(idx))
  }
  return (
    <div className="quesBlock">
      <ul id="palette-list">
        {data?.map((q, i) => (
          <li
            style={index==i?{background: "black",color:"white",border: '.1vw solid black'}:{}}
            className={`col-img ${q.present} item`}
            key={i}
            id={`${i}-tab`}
            onClick={() => jump(i)}
          >
            <p>{i+1}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
