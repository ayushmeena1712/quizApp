import React from 'react'

const ScoreBar = ({ currentScore, currentQuestionIndex, totalQuestions, maxScore }) => {
  const progress = (currentQuestionIndex / totalQuestions) * 100
  return (
    <div className="score-bar-container">
      <div className="score-bar" style={{ width: `${progress}%` }}></div>
      <div className="score-text">
        Score: {currentScore} / {maxScore}
      </div>
    </div>
  )
}

export default ScoreBar
