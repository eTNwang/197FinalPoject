import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Link,
  useHistory,
  useNavigate,
} from 'react-router-dom'

const Signup = () => {
  const [username, changeusername] = useState('')
  const [password, changepassword] = useState('')
  const [signedup, setsignedup] = useState(false)
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const signup = async () => {
    setsignedup(true)
    try {
      await axios.post('/account/signup', { username, password })
      setMsg(`${username} was signed up successfully`)
      navigate('/')
    } catch (e) {
      alert(`an error occurred`)
      setsignedup(false)
    }
  }

  return (
    <div>
      <>
        <h2>Account Creation</h2>
        <form>
          <input placeholder="Username" onChange={e => changeusername(e.target.value)} />
          <input placeholder="Password" onChange={e => changepassword(e.target.value)} />
          <Button
            onClick={() => {
              signup(username, password); if (signedup) {
                navigate('/')
              }
            }}
          >
            Submit
          </Button>
        </form>
        <p>
          {' '}
          {msg}
          {' '}
        </p>
        <p><Link to="/login"> Click here to log into your account</Link></p>
        <p><Link to="/"> Back to Main Menu</Link></p>
      </>
    </div>
  )
}

export default Signup
