import React, { useState } from 'react'
import { Card, Button, Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import { AiTwotoneStar } from "react-icons/ai";
import noImage from '../../../assets/images/no-image.jpg'

const Movie = ({ movie }) => {

    const [ hoverMovieId, setHoverMovieId ] = useState("")

    const history = useHistory()

    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites.favoriteMovies)

    const showDetails = async (id) => {
        try {
            history.push('/details')
            dispatch({ type: "QUERY_STARTS" })
            const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            const details = await movie.json()
            console.log("DETAILS", details);
            const recommendationsDB = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
            const recommendations = await recommendationsDB.json()
            console.log("RECS",recommendations);
            dispatch({ type: "MOVIE_DETAILS", payload: { movieDetails: details, recommendations: recommendations }  })
        } catch (error) {
            console.log(error);
        }
    }

    const addToFavoritesHandler = (movie) => {
        dispatch({ type: "ADD_TO_FAVORITES", payload: movie  })
    }

    const removeToFavoritesHandler = (movie) => {
        console.log(movie);
        dispatch({ type: "REMOVE_FROM_FAVORITES", payload: movie  })
    }

    return (
        <Card onMouseLeave={() => setHoverMovieId('')} onMouseOver={() => setHoverMovieId(movie.id)} className="card-image" style={{ flex: 1, marginBottom: "16px", height: "40%" }}>
        
        {favorites.some(mov => mov.id === movie.id) && 
        <AiTwotoneStar size={30} color="yellow" style={{ position: "absolute", top: "5px", left: "5px" }} />}

        {favorites.some(mov => mov.id === movie.id) ? 
        <Button className="button-outline" style={{ position: "absolute", width: "80%", top: "30%", marginLeft: "10%", display: hoverMovieId === movie.id ? "" : "none" }} onClick={() => removeToFavoritesHandler(movie.id)} variant="danger">Remove from Favorites</Button> :
        <Button className="button-outline" style={{ position: "absolute", width: "80%", top: "30%", marginLeft: "10%", display: hoverMovieId === movie.id ? "" : "none" }} onClick={() => addToFavoritesHandler(movie)} variant="primary">Add to Favorites</Button>}

        <Button style={{ position: "absolute", width: "80%", top: "45%", marginLeft: "10%", display: hoverMovieId === movie.id ? "" : "none" }} onClick={() => showDetails(movie.id)} variant="info">Show Details</Button>
        {movie.poster_path ? <Card.Img  variant="top" height={330} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} /> : 
        <Card.Img  variant="top" height={330} src={noImage} />}
            <Card.Body>
                <h5 style={{ textDecoration: "underline" }}>{movie.title}</h5>
               
            </Card.Body>
        </Card>
    )
}

export default Movie