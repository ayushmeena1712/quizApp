import React from 'react'

const StartScreen = ({ title, topic, startQuiz }) => {
  return (
    <div className="screen">
      <h1>{title}</h1>
      <h3>{topic}</h3>
      <button className="button" onClick={startQuiz}>Start Quiz</button>
    </div>
  )
}

export default StartScreen
