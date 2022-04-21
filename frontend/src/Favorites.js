import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
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
import Signup from './Signup'
import Login from './Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import Movies from './components/Movies'
import Heading from './components/Heading'
import Searchbar from './components/Searchbar'
import FavoriteBar from './components/FavoriteBar'

export const Favorites = () => {
  const [questionText, setQuestionText] = useState('')
  const [msg, setMsg] = useState('')
  const [curruser, setCurrUser] = useState([])
  const [loginStatus, setLoginStatus] = useState([])
  const [questions, setQuestions] = useState([])
  const [show, setShow] = useState([])
  const [user, setUser] = useState('')
  const [movies, setMovies] = useState([])
  const [movieData, setMovieData] = useState([])
  const [usermovies, setUserMovies] = useState([])
  const [usermovieData, setUserMovieData] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const [lockout, setLockout] = useState(false)
  const [filterValue, setfilterValue] = useState('Language')

  let movieids = []
  const favoriteids = []

  const obtainfavorites = async () => {
    const { data } = await axios.get(`/favorites/getfavorite/${user}`)
    setMovies(data)
  }

  const obtainuserfavorites = async () => {
    const { data } = await axios.get(`/favorites/getfavorite/${curruser}`)
    setUserMovies(data)
  }

  const getMovieDetails = async idValue => {
    console.log(idValue)
    const url = `https://www.omdbapi.com/?i=${idValue}&apikey=ce7a07b3`
    const response = await fetch(url)
    const responseJson = await response.json()
    setMovieData(oldArray => [...oldArray, responseJson])
  }

  const getUserMovieDetails = async idValue => {
    const url = `https://www.omdbapi.com/?i=${idValue}&apikey=ce7a07b3`
    const response = await fetch(url)
    const responseJson = await response.json()
    setUserMovieData(oldArray => [...oldArray, responseJson])
  }

  const generateMovieDetails = async () => {
    for (const element of movies) {
      await getMovieDetails(element.movieid)
    }
  }

  const generateUserMovieDetails = async () => {
    for (const element of usermovies) {
      await getUserMovieDetails(element.movieid)
    }
  }

  const handleenter = async searchinput => {
    movieids = []
    setMovies([])
    setMovieData([])
    await generateMovieDetails()
  }

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

  const filterMovies = value => {
    movieData.forEach(element => {
      console.log(element)
      console.log(filterValue)
      console.log(element[filterValue])
    })
    setMovieData(movieData.filter((item => item[filterValue] === value)))
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      getcurruser()
      getStatus(setLoginStatus)
      console.log(usermovieData)
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  const userlogout = async () => {
    try {
      await axios.post('/account/logout', {})
    } catch (e) {
      alert(`Logout error`)
    }
  }

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
          <Button onClick={() => {
            setUserMovieData([])
            obtainuserfavorites()
            generateUserMovieDetails()
          }}
          >
            {' '}
            Refresh your favorites
          </Button>
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
      {!loginStatus && (
      <>
        <h1>Sign In Here!</h1>
      </>
      )}
      {loginStatus && (

      <div>
        <input placeholder="Enter a User" onChange={e => setUser(e.target.value)} />
        <Button
          onClick={() => {
            obtainfavorites()
            generateMovieDetails()
          }}
        >
          Submit
        </Button>

        <div className="container-fluid movie-app">
          
        <div className="row d-flex align-items-center mt-4 mb-4">
          <Heading heading="These are Your Favourite Movies!" />
        </div>

        <div className="row">
          <Movies
            moviedetails={usermovieData}
            favouriteComponent={<></>}
            setfilterValue={setfilterValue}
          />
        </div>

        <div className="row d-flex align-items-center mt-4 mb-4">
          <Heading heading="Favourites" />
        </div>

        <div className="row">
          <Movies
            moviedetails={movieData}
            favouriteComponent={<></>}
            setfilterValue={setfilterValue}
          />
        </div>
        </div>

      </div>
      )}
    </>
  )
}

export default Favorites
