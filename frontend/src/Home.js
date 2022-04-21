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

export const Home = () => {
  const [questionText, setQuestionText] = useState('')
  const [msg, setMsg] = useState('')
  const [curruser, setCurrUser] = useState([])
  const [loginStatus, setLoginStatus] = useState([])
  const [questions, setQuestions] = useState([])
  const [show, setShow] = useState([])

  const [movies, setMovies] = useState([])
  const [movieData, setMovieData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [lockout, setLockout] = useState(false)
  const [filterValue, setfilterValue] = useState('Language')
  const [favourites, setFavourites] = useState([])
  const [currfav, setCurrfav] = useState('')

  let movieids = []
  const favoriteids = []

  const addfavorite = async movieid => {
    const data = await axios.post('/favorites/add', { movieid })
    console.log(data)
  }

  const addFavouriteMovie = (movie, input) => {
    setCurrfav(movie.imdbID)
    console.log(currfav)
    if (favourites.includes(movie)) {
      setFavourites(favourites)
      console.log(movie)
    } else {
      const newFavouriteList = [...favourites, movie]
      setFavourites(newFavouriteList)
    }
    addfavorite(input)
  }

  const getMovieRequest = async searchValue => {
    for (let i = 0; i < 5; i++) {
      const url = `https://www.omdbapi.com/?s=${searchValue}&page=${i}&apikey=ce7a07b3`
      const response = await fetch(url)
      const responseJson = await response.json()

      if (responseJson.Search) {
        (responseJson.Search).forEach(element => {
          setMovies(movies => [...movies, element])
        })
      }
    }
  }

  const filterMovies = value => {
    movieData.forEach(element => {
      console.log(element)
      console.log(filterValue)
      console.log(element[filterValue])
    })
    setMovieData(movieData.filter((item => item[filterValue] === value)))
  }

  const generateMovieIds = async () => {
    await getMovieRequest
    movies.forEach(element => {
      const currentid = element.imdbID
      movieids.push(currentid)
    })
  }

  const getMovieDetails = async idValue => {
    const url = `https://www.omdbapi.com/?i=${idValue}&apikey=aacf212a`
    const response = await fetch(url)
    const responseJson = await response.json()
    setMovieData(oldArray => [...oldArray, responseJson])
  }

  const generateMovieDetails = async () => {
    for (const element of movieids) {
      await getMovieDetails(element)
    }
  }

  const handleenter = async searchinput => {
    movieids = []
    setMovies([])
    setMovieData([])

    await getMovieRequest(searchinput)
    await generateMovieIds()
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

  useEffect(() => {
    const intervalID = setInterval(() => {
      getcurruser()
      getStatus(setLoginStatus)
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
        <div className="container-fluid movie-app">
          <div className="row d-flex align-items-center mt-4 mb-4">
            <Heading heading="Movies" />
            <Searchbar
              searchValue={searchValue}
              filterValue={filterValue}
              setfilterValue={setfilterValue}
              handleenter={handleenter}
              filterMovies={filterMovies}
              lockout={lockout}
              setLockout={setLockout}
            />
          </div>
          <div className="row">
            <Movies moviedetails={movieData} favouriteComponent={FavoriteBar} handleFavouritesClick={addFavouriteMovie} />
          </div>
        </div>
        {/* <div className="row d-flex align-items-center mt-4 mb-4">
          <Heading heading="Favourites" />
        </div>

        <div className="row">
          <Movies
            moviedetails={favourites}
            favouriteComponent={AddFavourites}
            setfilterValue={setfilterValue}
            filterMovies={filterMovies}
          />
        </div> */}

      </div>
      )}
    </>
  )
}

export default Home

