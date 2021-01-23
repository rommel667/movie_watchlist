import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Movie = ({ movie }) => {

    const history = useHistory()

    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites.favoriteMovies)

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

    const addToFavoritesHandler = (movie) => {
        dispatch({ type: "ADD_TO_FAVORITES", payload: movie  })
    }

    const removeToFavoritesHandler = (movie) => {
        dispatch({ type: "REMOVE_FROM_FAVORITES", payload: movie  })
    }

    return (
        <Card style={{ flex: 1, marginBottom: "16px" }}>
        <Card.Img variant="top" height={330} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                {favorites.some(mov => mov.id === movie.id) ? <Button onClick={() => removeToFavoritesHandler(movie)} variant="primary">Remove from Favorites</Button> :
                <Button onClick={() => addToFavoritesHandler(movie)} variant="primary">Add to Favorites</Button>}
                
                
                <Button onClick={() => showDetails(movie.id)} variant="primary">Show Details</Button>
            </Card.Body>
        </Card>
    )
}

export default Movie