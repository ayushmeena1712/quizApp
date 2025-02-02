import React, { useState, useEffect } from 'react'
import ScoreBar from './ScoreBar'

const shuffleArray = (array) => {
  let newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

const Quiz = ({ quizData, finishQuiz }) => {
  const { questions, shuffle, correct_answer_marks } = quizData
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [currentOptions, setCurrentOptions] = useState([])

  useEffect(() => {
    if (questions && questions.length > 0) {
      const opts = questions[currentIndex].options
      setCurrentOptions(shuffle ? shuffleArray(opts) : opts)
    }
  }, [currentIndex, questions, shuffle])

  if (!questions || questions.length === 0) {
    return <div className="screen">No questions available</div>
  }

  const currentQuestion = questions[currentIndex]

  const handleOptionSelect = (option) => {
    if (selectedOption !== null) return
    setSelectedOption(option)
    const isCorrect = option.is_correct
    const correctMarks = parseFloat(correct_answer_marks)

    if (isCorrect) {
      setScore(prev => prev + correctMarks)
    }
    setShowFeedback(true)
  }

  const handleNext = () => {
    setSelectedOption(null)
    setShowFeedback(false)
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      finishQuiz(score)
    }
  }

  const correctOption = currentQuestion.options.find(opt => opt.is_correct)

  return (
    <div className="screen">
      <ScoreBar
        currentScore={score}
        currentQuestionIndex={currentIndex}
        totalQuestions={questions.length}
        maxScore={parseFloat(correct_answer_marks) * questions.length}
      />
      <h2 style={{ textAlign: "justify", fontSize: "18px", fontWeight: "semibold" }}>{currentQuestion.description}</h2>
      <div>
        {currentOptions.map(option => (
          <button
            key={option.id}
            className={`option-button ${selectedOption
              ? option.id === selectedOption.id
                ? option.is_correct ? 'correct' : 'incorrect'
                : ''
              : ''
              }`}
            onClick={() => handleOptionSelect(option)}
            disabled={selectedOption !== null}
          >
            {option.description}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div>
          {selectedOption.is_correct ? (
            <p>Correct! +{correct_answer_marks} points</p>
          ) : (
            <p>Incorrect. The correct answer is: {correctOption && correctOption.description}</p>
          )}
          <button className="button" onClick={handleNext}>
            {currentIndex + 1 < questions.length ? 'Next' : 'Finish'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Quiz
