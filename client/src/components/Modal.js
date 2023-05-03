import React from 'react';
import ReactDOM from 'react-dom';
import '../style/Modal.css';
const Modal = (props) => {
  const modal = (
    <div className="modal">
      <div className="modal-content">
        <div className="header">Time Limit Exceeded</div>
        <div className="mainC">
            <div className="left"><img className='over' src="/img/over.avif" alt="" /></div>
            <div className="right">
              <div className="a">Quiz submission deadline has passed</div>
              <div className="b">Your attempt has been auto-saved.<br/>Click on the View Result button to see the result.</div>
            </div>
        </div>
        <div className="bot" style={{justifyContent:"flex-end"}}>
          <button onClick={props.onOver} className='custom-btn' id='mrnbtn'><p>Veiw Result</p></button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById('modal-root'));
};

export default Modal;
