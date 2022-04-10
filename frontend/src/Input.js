import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

const Question = ({ loginstatus, question }) => {
  const [answer, setAnswer] = useState('')

  const changetext = e => {
    setAnswer(e.target.value)
  }
  const submitquestion = async () => {
    try {
      await axios.post('/api/questions/answer', { _id: question._id, answer })
    } catch (e) {
      alert(`an error occurred`)
    }
  }

  return (
    <div>
      {loginstatus && (
        <div>
          <input placeholder="Type your answer here" onChange={changetext} />
          <Button onClick={submitquestion}>Submit Your Answer</Button>
        </div>
      )}
    </div>
  )
}

export default Question
