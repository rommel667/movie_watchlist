import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const FaveMovie = ({ movie }) => {

    const history = useHistory()

    const dispatch = useDispatch()

    const showDetails = async (id) => {
        try {
            history.push('/details')
            dispatch({ type: "QUERY_STARTS" })
            const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            const details = await movie.json()
            const recommendationsDB = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
            const recommendations = await recommendationsDB.json()
            console.log("RECS",recommendations);
            dispatch({ type: "MOVIE_DETAILS", payload: details  })
        } catch (error) {
            console.log(error);
        }
    }

    const removeToFavoritesHandler = (movie) => {
        dispatch({ type: "REMOVE_FROM_FAVORITES", payload: movie  })
    }

    return (
        <Card style={{ flex: 1, marginBottom: "16px" }}>
        <Card.Img variant="top" height={330} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <div style={{display: "flex", gap: 10}}>
                <Button size="sm" onClick={() => removeToFavoritesHandler(movie)} variant="primary">Remove from Favorites</Button> 
                <Button size="sm" onClick={() => showDetails(movie.id)} variant="primary">Show Details</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default FaveMovie