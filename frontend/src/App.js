// import React, { useState, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Movies from './components/Movies'
// import Heading from './components/Heading'
// import Searchbar from './components/Searchbar'
// import AddFavourites from './components/AddToFavorites'

// const App = () => {
//   const [movies, setMovies] = useState([])
//   const [movieData, setMovieData] = useState([])
//   const [searchValue, setSearchValue] = useState('')
//   const [lockout, setLockout] = useState(false)
//   const [filterValue, setfilterValue] = useState('Language')
//   const [favourites, setFavourites] = useState([])
//   let movieids = []

//   const addFavouriteMovie = movie => {
//     if (favourites.includes(movie)) {
//       setFavourites(favourites)
//     } else {
//       const newFavouriteList = [...favourites, movie]
//       setFavourites(newFavouriteList)
//     }
//   }

//   const getMovieRequest = async => {
//     for (let i = 0; i < 5; i++) {
//       const url = `https://www.omdbapi.com/?s=${searchValue}&page=${i}&apikey=aacf212a`
//       const response = fetch(url)
//       const responseJson = response.json()
//       if (responseJson.Search) {
//         (responseJson.Search).forEach(element => {
//           setMovies([...movies, element])
//         })
//       }
//     }
//   }

//   const filterMovies = value => {
//     setMovieData(movieData.filter((item => item[filterValue] === value)))
//   }

//   const generateMovieIds = async () => {
//     await getMovieRequest
//     movies.forEach(element => {
//       const currentid = element.imdbID
//       movieids.push(currentid)
//     })
//   }

//   const getMovieDetails = async idValue => {
//     const url = `https://www.omdbapi.com/?i=${idValue}&apikey=aacf212a`
//     const response = await fetch(url)
//     const responseJson = await response.json()
//     setMovieData(oldArray => [...oldArray, responseJson])
//   }

//   const generateMovieDetails = () => {
//     for (let j = 0; j < movieids.length; j++) {
//       getMovieDetails(movieids[j])
//     }
//   }

//   const handleenter = async searchinput => {
//     movieids = []
//     setMovies([])
//     setMovieData([])

//     await getMovieRequest(searchinput)
//     await generateMovieIds()
//     await generateMovieDetails()
//   }

//   return (
//     <div className="container-fluid movie-app">
//       <div className="row d-flex align-items-center mt-4 mb-4">
//         <Heading heading="Movies" />
//         <Searchbar
//           searchValue={searchValue}
//           filterValue={filterValue}
//           setfilterValue={setfilterValue}
//           handleenter={handleenter}
//           filterMovies={filterMovies}
//           lockout={lockout}
//           setLockout={setLockout}
//         />
//       </div>

//       <div className="row">
//         <Movies moviedetails={movieData} favouriteComponent={AddFavourites} handleFavouritesClick={addFavouriteMovie} />
//       </div>

//       <div className="row d-flex align-items-center mt-4 mb-4">
//         <Heading heading="Favourites" />
//       </div>
//       <div className="row">
//         <Movies
//           moviedetails={favourites}
//           favouriteComponent={AddFavourites}
//           setfilterValue={setfilterValue}
//           filterMovies={filterMovies}
//         />
//       </div>
//     </div>
//   )
// }

// export default App

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
import 'bootstrap/dist/css/bootstrap.min.css'
import Movies from './components/Movies'
import Heading from './components/Heading'
import Searchbar from './components/Searchbar'
import AddFavourites from './components/AddToFavorites'

export const App = () => {
  const [msg, setMsg] = useState('')
  const [movies, setMovies] = useState([])
  const [movieData, setMovieData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [lockout, setLockout] = useState(false)
  const [filterValue, setfilterValue] = useState('Language')
  const [favourites, setFavourites] = useState([])
  let movieids = []

  const addFavouriteMovie = movie => {
    if (favourites.includes(movie)) {
      setFavourites(favourites)
    } else {
      const newFavouriteList = [...favourites, movie]
      setFavourites(newFavouriteList)
    }
  }

  const getMovieRequest = async searchValue => {
    for (let i = 0; i < 5; i++) {
      const url = `https://www.omdbapi.com/?s=${searchValue}&page=${i}&apikey=aacf212a`
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

  return (
    <div>
      <h1>Main Menu</h1>
      <nav>
        <p><Link to="/home">Home </Link></p>
        <p><Link to="/signup">Sign Up</Link></p>
        <p><Link to="/login"> Log In</Link></p>
        <p><Link to="/favorites"> Browse Favorites</Link></p>
      </nav>
    </div>

  //     <div className="container-fluid movie-app">
  //       <div className="row d-flex align-items-center mt-4 mb-4">
  //         <Heading heading="Movies" />
  //         <Searchbar
  //           searchValue={searchValue}
  //           filterValue={filterValue}
  //           setfilterValue={setfilterValue}
  //           handleenter={handleenter}
  //           filterMovies={filterMovies}
  //           lockout={lockout}
  //           setLockout={setLockout}
  //         />
  //       </div>

  //       <div className="row">
  //         <Movies moviedetails={movieData} favouriteComponent={AddFavourites} handleFavouritesClick={addFavouriteMovie} />
  //       </div>

  //       <div className="row d-flex align-items-center mt-4 mb-4">
  //         <Heading heading="Favourites" />
  //       </div>
  //       <div className="row">
  //         <Movies
  //           moviedetails={favourites}
  //           favouriteComponent={AddFavourites}
  //           setfilterValue={setfilterValue}
  //           filterMovies={filterMovies}
  //         />
  //       </div>
  //     </div>
  )
}

export default App
