import React from 'react'

export default function profiles({ Leaderboard }) {
  return (
        <div id="profile">
            {item(Leaderboard)}
        </div>
  )
}

const item = (data) => {
    return (
        <>
            {
                data.map((value, index) => (
                    <div className="flex" key={index}>
                        <div className="item">
                            <img src={value.imageUrl} alt="" />

                            <div className="info">
                                <h3 className='name text-dark'>{value.name}</h3>
                                <h4>{value.status}</h4>
                                <span>{value.class}</span>
                            </div>
                        </div>
                        <div className="item">
                            <span>{value.score}</span>
                        </div>
                    </div>
                    )
                )
            }
        </>


    )
}