import React, { useState, useEffect } from 'react'
import Profiles from './profiles';
import { firestore } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import PlayerForm from './playerform';
export default function Board() {

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentStatus, setCurrentStatus] = useState('any');

  const fetchData = async () => {
      try {
          const playersCol = collection(firestore, 'players');
          const playerSnapshot = await getDocs(playersCol);
          const playerList = playerSnapshot.docs.map(doc => doc.data());
          setLeaderboardData(playerList)
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  useEffect(() => {


      fetchData();
  }, []); // Empty dependency array to run once on mount
  console.log("leaderboardData", leaderboardData);
  const handleClick = (e) => {
    setCurrentStatus(e.target.dataset.id)
  }

  return (
    <div className="board">

        <h1 className='leaderboard'>Leaderboard</h1>
        <PlayerForm onNewPlayerAdded={fetchData}/>
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

