import React from 'react';
import ReactDOM from 'react-dom';
import '../style/Modal.css';
const Save = (props) => {
  const save = (
    <div className="modal">
      <div className="modal-content">
        <div className="header">Confirmation</div>
        <div className="mainC">
            <div className="left"><img src="/img/ques.png" alt="" /></div>
            <div className="right">
              <div className="a">Quiz Submission</div>
              <div className="b">You are about to submit your quiz, after which you will not be able to return to quiz. <br/>Are you sure that you want to submit the quiz?</div>
            </div>
        </div>
        <div className="bot">
          <button onClick={props.onYes} className='custom-btn' id='mrnbtn'><p>Yes, submit quiz</p></button>
          <button onClick={props.onNo} className='custom-btn' id='cbtn'><p>No, don't submit quiz</p></button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(save, document.getElementById('modal-root'));
};

export default Save;