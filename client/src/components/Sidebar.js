import React, { useState } from "react";
import "../style/Sidebar.css";
import QuesBlock from "./QuesBlock";
import QuesBlockInfo from "./QuesBlockInfo";
export default function Sidebar() {
  const [show, setShow] = useState(true);
  return (
    <div className="Sidebar">
      <div className="closer">
        <button className="close" onClick={() => setShow(!show)}> <p>&#171;</p> </button>
      </div>

      <div className="info">
        {show ? <QuesBlockInfo /> : null}
        {show ? <QuesBlock/> : null}
      </div>
    </div>
  );
}
