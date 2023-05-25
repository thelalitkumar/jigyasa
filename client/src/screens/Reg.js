import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../redux/slices/dataSlice";
import "../style/Reg.css";
import Navbar from "../components/Navbar";
export default function Reg() {
  const dispatch = useDispatch();
  dispatch(fetchData());
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const saveUser = () => {
    if (inputs.user && inputs.class && inputs.roll && inputs.school) {
      sessionStorage.setItem('user', JSON.stringify(inputs));
      setInputs({});
      navigate("/home");
    }
  };
  return (
    <div className="Reg">
      <Navbar />
      <hr className="separate" />
      <div className="con">
        <div className="left">
          <img src="/img/exam.png" alt="" />
        </div>
        <div className="right">
          <div className="b">
            <div className="a">
              <div className="al">Take The Quiz</div>
            </div>
            <div>
              <div className="input-field s">
                <input
                  className="t"
                  type="text"
                  required
                  name="user"
                  value={inputs.user || ""}
                  onChange={handleChange}
                />
                <label>Candidate's Name</label>
              </div>
            </div>
            <div className="ame">
              <div className="input-field r">
                <input
                  className="n"
                  type="text"
                  required
                  name="class"
                  value={inputs.class || ""}
                  onChange={handleChange}
                />
                <label>Class</label>
              </div>
              <div className="input-field r">
                <input
                  className="n"
                  type="text"
                  required
                  name="roll"
                  value={inputs.roll || ""}
                  onChange={handleChange}
                />
                <label>Roll No.</label>
              </div>
            </div>
            <div>
              <div className="input-field s">
                <input
                  className="t"
                  type="text"
                  required
                  name="school"
                  value={inputs.school || ""}
                  onChange={handleChange}
                />
                <label>School Name</label>
              </div>
            </div>
            <button onClick={saveUser} className="custom-btn" id="mrnbtn">
              <p>Next</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
