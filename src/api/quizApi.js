export const fetchQuizData = async () => {
    const response = await fetch('/api/proxy')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  }
  