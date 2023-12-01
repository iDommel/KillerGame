import React, { useState } from 'react'
import Profiles from './profiles';
import { Leaderboard } from './database';

export default function Board() {

    const [period, setPeriod] = useState(0);

  const handleClick = (e) => {

    setPeriod(e.target.dataset.id)
  }

  return (
    <div className="board">
        <h1 className='leaderboard'>Leaderboard</h1>

        <div className="status">
            <button onClick={handleClick} data-id='any'>Any</button>
            <button onClick={handleClick} data-id='alive'>Alive</button>
            <button onClick={handleClick} data-id='dead'>Dead</button>
        </div>

        <Profiles Leaderboard={filterStatus(Leaderboard, period)}></Profiles>

    </div>
  )
}

// function to filter the data based on status
const filterStatus = (data, period) => {
    if (period === "any") {
        return data;
    }
    else {
        return data.filter((value) => value.status === period)
    }
}

