import React, { useState } from 'react'
import './style.css'
import { Card, Button, Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiTwotoneStar } from "react-icons/ai";
import { FaPlusCircle, FaTrashAlt, FaListAlt } from "react-icons/fa";
import noImage from '../../../assets/images/no-image.jpg'
import Zoom from 'react-reveal/Zoom';
import { useMedia } from 'react-use-media'

const Movie = ({ movie }) => {

    const [hoverMovieId, setHoverMovieId] = useState("")

    const history = useHistory()

    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites.favoriteMovies)

    const matches = useMedia('(min-width: 768px)');

    const showDetails = async (id) => {
        try {
            history.push('/details')
            dispatch({ type: "QUERY_STARTS" })
            const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            const details = await movie.json()
            const recommendationsDB = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
            const recommendations = await recommendationsDB.json()
            dispatch({ type: "MOVIE_DETAILS", payload: { movieDetails: details, recommendations: recommendations } })
        } catch (error) {
            console.log(error);
        }
    }

    const addToFavoritesHandler = (movie) => {
        dispatch({ type: "ADD_TO_FAVORITES", payload: movie })
    }

    const removeToFavoritesHandler = (movie) => {
        dispatch({ type: "REMOVE_FROM_FAVORITES", payload: movie })
    }

    return (
        <Zoom duration={1500}>
            <Card onMouseLeave={() => setHoverMovieId('')} onMouseOver={() => setHoverMovieId(movie.id)} className="card-image" style={{ flex: 1, marginBottom: "16px", height: "40%" }}>

                {favorites.some(mov => mov.id === movie.id) &&
                    <AiTwotoneStar size={30} color="yellow" style={{ position: "absolute", top: "5px", left: "5px" }} />}

                {favorites.some(mov => mov.id === movie.id) ?
                    <Button
                        className="button-outline"
                        style={{ position: "absolute", width: matches ? "80%" : "94%", top: "30%", marginLeft: matches ? "10%" : "3%", display: hoverMovieId === movie.id ? "" : "none" }}
                        onClick={() => removeToFavoritesHandler(movie.id)} variant="danger">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <FaTrashAlt />Remove from List</div></Button> :
                    <Button
                        className="button-outline"
                        style={{ position: "absolute", width: matches ? "80%" : "94%", top: "30%", marginLeft: matches ? "10%" : "3%", display: hoverMovieId === movie.id ? "" : "none" }}
                        onClick={() => addToFavoritesHandler(movie)} variant="success">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <FaPlusCircle />Add to List</div></Button>}

                <Button
                    className="button-outline" style={{ position: "absolute", width: matches ? "80%" : "94%", top: "45%", marginLeft: matches ? "10%" : "3%", display: hoverMovieId === movie.id ? "" : "none" }}
                    onClick={() => showDetails(movie.id)} variant="primary">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                        <FaListAlt />{matches ? "Show Details" : "Details"}</div></Button>

                {movie.poster_path ? <Card.Img variant="top" height={330} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} /> :
                    <Card.Img variant="top" height={330} src={noImage} />}
                <Card.Body>
                    <h5 onClick={() => showDetails(movie.id)} style={{ textDecoration: "underline", cursor: "pointer" }}>{movie.title}</h5>

                </Card.Body>
            </Card>
        </Zoom>
    )
}

export default Movie