import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MovieList = props => {
  const FavouriteComponent = props.favouriteComponent


  return (
    <>
      {props.moviedetails.map((movie, index) => (

        <div className="big-container">

          <div className="image-container">
            <img src={movie.Poster} alt="movie" />

            <div className="textblock">
              <div className="movietitle">{movie.Title}</div>
              <br />
              <div>{movie.Plot}</div>
              <br />
              <div>
                Year:
                {movie.Year}
              </div>
              <div>
                Cast:
                {movie.Actors}
              </div>
              <div>
                Genre:
                {movie.Genre}
              </div>
              <div>
                Language:
                {movie.Language}
              </div>
              <div>
                Movie Length:
                {movie.Runtime}
              </div>

            </div>

            <div
              onClick={() => props.handleFavouritesClick(movie, movie.imdbID)}
              className="overlay d-flex align-items-center justify-content-center"
            >
              <FavouriteComponent />
            </div>

          </div>

        </div>
      ))}
    </>
  )
}

export default MovieList
