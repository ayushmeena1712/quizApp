export const fetchQuizData = async () => {
    const response = await fetch('/api/Uw5CrX')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  }
  