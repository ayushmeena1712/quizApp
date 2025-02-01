import React, { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import Quiz from './components/Quiz'
import Result from './components/Result'
import { fetchQuizData } from './api/quizApi'

const SCREENS = {
  START: 'start',
  QUIZ: 'quiz',
  RESULT: 'result'
}

const App = () => {
  const [screen, setScreen] = useState(SCREENS.START)
  const [quizData, setQuizData] = useState(null)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchQuizData()
        setQuizData(data)
      } catch (error) {
        console.error('Error fetching quiz data:', error)
      }
    }
    loadData()
  }, [])

  const startQuiz = () => {
    setScreen(SCREENS.QUIZ)
  }

  const finishQuiz = (finalScore) => {
    setScore(finalScore)
    setScreen(SCREENS.RESULT)
  }

  return (
    <div className="app-container">
      {screen === SCREENS.START && quizData && (
        <StartScreen 
          title={quizData.title}
          topic={quizData.topic}
          startQuiz={startQuiz}
        />
      )}
      {screen === SCREENS.QUIZ && quizData && (
        <Quiz 
          quizData={quizData}
          finishQuiz={finishQuiz}
        />
      )}
      {screen === SCREENS.RESULT && (
        <Result 
          score={score}
          totalQuestions={quizData?.questions?.length || 0}
        />
      )}
    </div>
  )
}

export default App
