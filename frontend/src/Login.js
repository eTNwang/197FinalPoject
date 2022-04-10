import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Link,
  useHistory,
  useNavigate,
} from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

const Login = () => {
  const [username, changeusername] = useState('')
  const [password, changepassword] = useState('')
  const [loggedIn, setLoggedin] = useState(false)
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  const login = async () => {
    const { data } = await axios.post('/account/login', { username, password })
    if (data === 'wrong username or password') {
      alert(`incorrect credentials`)
    } else {
      setMsg('successful login')
      setLoggedin(true)
      navigate('/')
    }
  }

  return (
    <div>
      <>
        <h1>Log In</h1>
        <form>
          <input placeholder="Username" onChange={e => changeusername(e.target.value)} />
          <input placeholder="Password" onChange={e => changepassword(e.target.value)} />
          <Button
            onClick={() => {
              login(username, password); if (loggedIn) {
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
        <p><Link to="/signup"> Create your account here</Link></p>
        <p><Link to="/"> Back to Main</Link></p>
      </>
    </div>
  )
}

export default Login
