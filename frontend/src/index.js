import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from 'react-router-dom'
import { App } from './App'
import Login from './Login'
import Signup from './Signup'
import { Home } from './Home'

const app = document.getElementById('app')
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>,
  app,
)
