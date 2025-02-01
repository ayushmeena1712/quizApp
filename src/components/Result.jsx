import React from 'react'

const Result = ({ score, totalQuestions }) => {
  return (
    <div className="screen">
      <h1>Quiz Completed!</h1>
      <p>Your Final Score: {score}</p>
      <p>Total Questions: {totalQuestions}</p>
    </div>
  )
}

export default Result
