import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import s from 'styled-components'
import Modal from 'react-bootstrap/Modal'
import Questioninput from './Input'
import 'bootstrap/dist/css/bootstrap.min.css'

export const Home = () => {
  const [questionText, setQuestionText] = useState('')
  const [msg, setMsg] = useState('')
  const [curruser, setCurrUser] = useState([])
  const [loginStatus, setLoginStatus] = useState([])
  const [questions, setQuestions] = useState([])
  const [show, setShow] = useState([])

  const getStatus = async setLoginStatus2 => {
    try {
      const result = await axios.get('/account/getLoggedIn', {})
      setLoginStatus(result.data)
    } catch (e) {
      console.log('user is not logged in')
    }
  }

  const getcurruser = async () => {
    const { data } = await axios.get('/account/getcurruser')
    setCurrUser(data)
  }

  const userlogout = async () => {
    try {
      await axios.post('/account/logout', {})
    } catch (e) {
      alert(`Logout error`)
    }
  }

  const obtainquestions = async () => {
    const { data } = await axios.get('/api/questions')
    setQuestions(data)
  }
  const sendquestion = async () => {
    const { data } = await axios.post('/api/questions/add', { questionText })
  }

  const closemodal = () => setShow(false)
  const showmodal = () => setShow(true)

  useEffect(() => {
    const intervalID = setInterval(() => {
      getcurruser()
      getStatus(setLoginStatus)
      obtainquestions()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <>
      <Navbar>
        <Navbar.Brand>Forum:</Navbar.Brand>
        {loginStatus && (
        <div>
          <Link to="/home">Back to the Homepage </Link>
          {' '}
          {' '}
          {' '}
          {' '}
          <Navbar.Text>
            Hello
            {' '}
            {' '}
            {' '}
            {' '}
            {curruser}
          </Navbar.Text>
          <Button onClick={userlogout}>Logout</Button>
        </div>
        )}
        {!loginStatus && (
        <div>
          <Navbar.Text>
            Hello Unknown User
          </Navbar.Text>
          {' '}
          {' '}
          {' '}
          {' '}
          <Link to="/login"> Login Here!</Link>
          {' '}
          {' '}
          {' '}
          {' '}
          <Link to="/signup">Sign Up Here!</Link>
        </div>
        )}
      </Navbar>
      {loginStatus && (
      <>
        <Button onClick={showmodal}>
          Question Input +
        </Button>
      </>
      )}
      <>
        {loginStatus && (
        <Modal
          show={show}
          onHide={closemodal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Input your Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <input placeholder="Question Content" onChange={e => setQuestionText(e.target.value)} />
              <Button value="Submit Question" onClick={() => sendquestion()}>Submit</Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closemodal}>
              cancel
            </Button>
          </Modal.Footer>
        </Modal>
        )}

      </>
      <p>
        {' '}
        {msg}
        {' '}
      </p>
      <br />
      <h1>  </h1>
      {questions.map(question => (
        <Borderbox>
          <p>
            Content: &nbsp;
            {question.questionText}
          </p>
          <p>
            Answer: &nbsp;
            {question.answer}
          </p>
          <p>
            Author: &nbsp;
            {question.author}
          </p>
          <>
            {loginStatus && (
            <Questioninput loginstatus={loginStatus} question={question} />
            )}
          </>
        </Borderbox>
      ))}
    </>
  )
}

export default Home

const Borderbox = s.div`
border: 2px solid palevioletred;
border-radius: 3px;
`
