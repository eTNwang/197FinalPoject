import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import HomePage from './Home'
import Signup from './Signup'
import Login from './Login'

export const App = () => {
  const [msg, setMsg] = useState('')

  return (
    <div>
      <h1>Main Menu</h1>
      <nav>
        <p><Link to="/home">Home </Link></p>
        <p><Link to="/signup">Sign Up</Link></p>
        <p><Link to="/login"> Log In</Link></p>
      </nav>
    </div>
  )
}

export default App
