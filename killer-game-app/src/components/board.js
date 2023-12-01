import React, { useState, useEffect } from 'react'
import Profiles from './profiles';

export default function Board() {

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentStatus, setCurrentStatus] = useState('any');

  function addStatusAndScore(data) {
    return data.map(item => ({
        ...item,
        status: Math.random() < 0.5 ? 'dead' : 'alive',
        score: Math.floor(Math.random() * 11) // Random score between 0 and 10
    }));
}

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('https://randomuser.me/api/?results=10&inc=gender,name,nat,picture'); // Replace with your API endpoint
              const data = await response.json();
              const updatedData = addStatusAndScore(data.results);
              setLeaderboardData(updatedData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []); // Empty dependency array to run once on mount

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
          <Profiles Leaderboard={filterStatus(leaderboardData, currentStatus)}></Profiles>
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

