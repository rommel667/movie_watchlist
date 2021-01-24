import React, { useEffect, useState } from 'react'
import { Container, Button, Spinner, Col, Row, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Divider from '../UI/Divider'
import FaveMovie from './FaveMovie'
import InitialPage from './InitialPage'
import { useHistory } from 'react-router-dom'

const Favorites = () => {

    const favorites = useSelector(state => state.favorites.favoriteMovies)
    const { queryType, movies, loading } = useSelector(state => state.query)
    const dispatch = useDispatch()

    const history = useHistory()

    const [ faveRecommendations, setFaveRecommendations ] = useState([])

    useEffect(() => {
        if(favorites.length > 0) {
            fetchRecommendations()
        }
    }, [])

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

    const fetchRecommendations = async () => {
        console.log(favorites);
        const randomId = favorites[Math.floor(Math.random() * (favorites.length - 1))].id
        console.log(randomId);
        try {
            const movies = await fetch(`https://api.themoviedb.org/3/movie/${randomId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
            const data = await movies.json()
            setFaveRecommendations(data.results)
        } catch (error) {
            console.log(error);
        }
    } 

    return (
        <Container style={{ padding: "16px" }}>
            {favorites.length > 0 && <h3>Favorites</h3>}
            {loading ?
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="lg"
                        role="status"
                        aria-hidden="true"
                    />
                Loading...
            </Button> :
                <>
                    {favorites.length === 0 ? <InitialPage /> :
                        <>
                            <Row style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                {favorites.map(movie => {
                                    return (
                                        <Col lg={3} xs={6} md={4}>
                                            <FaveMovie movie={movie} />
                                        </Col>
                                    )
                                })}

                            </Row>
                            <Divider />
                            <div>
                                <h4>Movies you might like:</h4>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Row style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                        {faveRecommendations.map((movie, index) => {
                                            if (favorites.some(mov => mov.id === movie.id || !movie.poster_path)) {
                                                return
                                            } else {
                                                return (
                                                    <Col style={{ display: "flex", alignItems: "center", justifyContent: "center" }} key={movie.id} lg={2} xs={6} md={3}>
                                                        <Image onClick={() => showDetails(movie.id)} style={{ cursor: 'pointer', marginBottom: "10px" }} width={160} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} rounded />
                                                    </Col>

                                                )
                                            }

                                        })}
                                    </Row>
                                </div>
                            </div>
                        </>
                    }
                </>
            }
        </Container>

    )
}

export default Favorites