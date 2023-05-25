import React from 'react'
import { useSelector } from 'react-redux';
import '../style/quesBlockInfo.css';
export default function QuesBlockInfo() {
    const answered=useSelector((state)=>state.dataReducer.answered)
    const notAnswered=useSelector((state)=>state.dataReducer.notAnswered)
    const notVisited=useSelector((state)=>state.dataReducer.notVisited)
    const markedReview=useSelector((state)=>state.dataReducer.markedReview)
    const ansReview=useSelector((state)=>state.dataReducer.ansReview)
    return (
    <div className='quesBlockInfo'>
        <div id="color-info">
            <div className="color" >
                <span className='col-img Answered'><p>{answered}</p></span>
                <span className='col-dep'><p>Answered</p></span>
            </div>
            <div className="color">
                <span className='col-img notAnswered'><p>{notAnswered}</p></span>
                <span className='col-dep'><p>Not Answered</p></span>
            </div>
            <div className="color">
                <span className='col-img notVisited'><p>{notVisited}</p></span>
                <span className='col-dep'><p>Not Visited</p></span>
            </div>
            <div className="color">
                <span className='col-img mark'><p>{markedReview}</p></span>
                <span className='col-dep'><p>Marked for Review</p></span>
            </div>
            <div className="color" id='longcolor'>
                <span className='col-img ansmark'><p>{ansReview}</p></span>
                <span className='col-dep' ><p>Answered & Marked for Review (will be considered for evaluation)</p></span>
            </div>
        </div>
    </div>
  )
}
