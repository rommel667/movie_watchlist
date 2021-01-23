import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Image, Button, Spinner, Container, Badge } from 'react-bootstrap'
import './style.css'

const MovieDetails = () => {

    const { movieDetails, loading, recommendations } = useSelector(state => state.query)
    const favorites = useSelector(state => state.favorites.favoriteMovies)
    const dispatch = useDispatch()

    const showDetails = async (id) => {
        try {
            
            dispatch({ type: "QUERY_STARTS" })
            const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            const details = await movie.json()
            const recommendationsDB = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
            const recommendations = await recommendationsDB.json()
            console.log("RECS2",recommendations);
            dispatch({ type: "MOVIE_DETAILS", payload: { movieDetails: details, recommendations: recommendations }  })
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
        <Container style={{paddingTop: "16px"}}>
         {loading ?
            <div style={{ display: "flex", height: "70vh",  alignItems: "center", justifyContent: "center" }}>
                <Spinner animation="border" variant="primary" />
                </div> :
            <div>
            <div style={{ display: 'flex', flexDirection: "row" }}>
            <Image width={300} src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`} rounded />
            <div style={{ marginLeft: "16px" }}>
                <h2>{movieDetails.title}</h2>
                
                {movieDetails.genres.map((genre, index) => {
                    if(index > 4) {
                        return
                    } else {
                        if(index === 0) {
                            return <Badge pill style={{ marginRight: "5px" }} key={genre.id} variant="success">{genre.name}</Badge>
                        }
                        if(index === 1) {
                            return <Badge pill style={{ marginRight: "5px" }} key={genre.id} variant="primary">{genre.name}</Badge>
                        }
                        if(index === 2) {
                            return <Badge pill style={{ marginRight: "5px" }} key={genre.id} variant="warning">{genre.name}</Badge>
                        }
                        if(index === 3) {
                            return <Badge pill style={{ marginRight: "5px" }} key={genre.id} variant="danger">{genre.name}</Badge>
                        }
                    }
                })}
                <br />
                <Badge variant="secondary">Release Date: {movieDetails.release_date}</Badge>

               
                
                <p style={{ marginTop: "24px" }}>Summary: {movieDetails.overview}</p>
                
                <p>Rating: {movieDetails.vote_average}/10</p>
                {favorites.some(mov => mov.id === movieDetails.id) ? <Button className="button-outline" onClick={() => removeToFavoritesHandler(movieDetails.id)} variant="outline-danger">Remove from Favorites</Button> :
                <Button className="button-outline" onClick={() => addToFavoritesHandler(movieDetails)} variant="outline-primary">Add to Favorites</Button>}
            </div> 
            </div>
            <div style={{ marginTop: "24px" }}>
                <h4>Similar Movies:</h4>
            </div>
            <div style={{ display:"flex", justifyContent: "space-between" }}>
                {recommendations.results.length > 0 ? recommendations?.results.map((movie, index) => {
                    if(index >= 10) {
                        return
                    } else {
                        return <Image onClick={() => showDetails(movie.id)} style={{cursor: 'pointer'}} key={movie.id} width={100} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} rounded />
                    }
                   
                }): <h5>No similar movies found</h5>}
            </div>
            </div>
            }
            
        </Container>
    )
}

export default MovieDetails