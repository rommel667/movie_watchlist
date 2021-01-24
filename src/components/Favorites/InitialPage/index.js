import React, { useState, useEffect } from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useMedia } from 'react-use-media'


const InitialPage = () => {

    const [ initialRecommendations, setInitialRecommendations ] = useState([])

    const dispatch = useDispatch()

    const history = useHistory()

    const matches = useMedia('(min-width: 768px)');

    useEffect(() => {
        fetchRecommendations()
    }, [])
    
    const showDetails = async (id) => {
        try {
            history.push('/details')
            dispatch({ type: "QUERY_STARTS" })
            const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            const details = await movie.json()
            console.log("DETAILS", details);
            const recommendationsDB = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
            const recommendations = await recommendationsDB.json()
            console.log("RECS", recommendations);
            dispatch({ type: "MOVIE_DETAILS", payload: { movieDetails: details, recommendations: recommendations } })
        } catch (error) {
            console.log(error);
        }
    }

    const fetchRecommendations = async () => {
        try {
            const movies = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
            const data = await movies.json()
            console.log("RECS2",data);
            setInitialRecommendations(data.results)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ marginBottom: "20px", color: "red" }}>No movies on your List</h3>
            <h4>Search your favorite movie</h4>
            <p>or</p>
            <h4>Check out recommended movies</h4>
            <div style={{ display:"flex", justifyContent: "space-between" }}>
            <Row style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                {initialRecommendations.map((movie, index) => {
                    if(index >= 12) {
                        return
                    } else {
                        return (
                            <Col key={movie.id} lg={2} xs={6} md={3}>
                            <Image onClick={() => showDetails(movie.id)} style={{cursor: 'pointer', marginBottom: "10px"}} width={160} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} rounded />
                            </Col>
                            
                        )  
                    }
                   
                })}
                </Row>
            </div>
        </div>
    )
}

export default InitialPage