import React, { useState } from 'react'
import Profiles from './profiles';
import { Leaderboard } from './database';

export default function Board() {

  const [currentStatus, setCurrentStatus] = useState("any");

  const handleClick = (e) => {

    setCurrentStatus(e.target.dataset.id)
  }

  return (
    <div className="board">
        <h1 className='leaderboard'>Leaderboard</h1>

        <div className="status">
            <button onClick={handleClick} data-id='any'>Any</button>
            <button onClick={handleClick} data-id='alive'>Alive</button>
            <button onClick={handleClick} data-id='dead'>Dead</button>
        </div>

        <div className="scroll-container">
          <Profiles Leaderboard={filterStatus(Leaderboard, currentStatus)}></Profiles>
        </div>
    </div>
  )
}

// function to filter the data based on status
const filterStatus = (data, currentStatus) => {
    const sortedData = data.sort((a, b) => {
        return b.score - a.score;
    })
    if (currentStatus === "any") {
        return sortedData;
    }
    else {
        return sortedData.filter((value) => value.status === currentStatus)
    }
}

