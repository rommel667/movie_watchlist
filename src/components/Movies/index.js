import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Spinner, Container, Row, Col, CardDeck, Card } from 'react-bootstrap'
import Movie from './Movie'
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const Movies = () => {

    const { queryType, movies, loading, page, totalPages } = useSelector(state => state.query)
    const dispatch = useDispatch()

    const previousPageHandler = async () => {
        if(page === 1) return
        try {
            dispatch({ type: "QUERY_STARTS" })
            if (queryType === "Latest Movies") {
                const movies = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page - 1}`)
                const data = await movies.json()
                dispatch({ type: "PREVIOUS_PAGE", payload: { movies: data.results } })
            }
            if (queryType === "Popular Movies") {
                const movies = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page - 1}`)
                const data = await movies.json()
                dispatch({ type: "PREVIOUS_PAGE", payload: { movies: data.results } })
            }
            if (queryType === "Upcoming Movies") {
                const movies = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page - 1}`)
                const data = await movies.json()
                dispatch({ type: "PREVIOUS_PAGE", payload: { movies: data.results } })
            }  
        } catch (error) {
            console.log(error);
        }
    }

    const nextPageHandler = async () => {
        if(page === totalPages) return
        try {
            dispatch({ type: "QUERY_STARTS" })
            if (queryType === "Latest Movies") {
                const movies = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page + 1}`)
                const data = await movies.json()
                console.log("DATA", data);
                dispatch({ type: "NEXT_PAGE", payload: { movies: data.results } })
            }
            if (queryType === "Popular Movies") {
                const movies = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page + 1}`)
                const data = await movies.json()
                console.log("DATA", data);
                dispatch({ type: "NEXT_PAGE", payload: { movies: data.results } })
            }
            if (queryType === "Upcoming Movies") {
                const movies = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page + 1}`)
                const data = await movies.json()
                console.log("DATA", data);
                dispatch({ type: "NEXT_PAGE", payload: { movies: data.results } })
            }  
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Container style={{ padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>{queryType}</h3>
                <div style={{ display: "flex", gap: "5px" }}>
                    <FaChevronCircleLeft style={{ cursor: "pointer" }} onClick={previousPageHandler} size={30} />
                    <p>Page {page}/{totalPages}</p>
                    <FaChevronCircleRight style={{ cursor: "pointer" }} onClick={nextPageHandler} size={30} />
                </div>
            </div>
            {loading ?
                <div style={{ display: "flex", height: "70vh", alignItems: "center", justifyContent: "center" }}>
                    <Spinner animation="border" variant="primary" />
                </div> :

                <Row style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                    {movies.map(movie => {
                        return (
                            <Col lg={3} xs={6} md={4}>
                                <Movie movie={movie} />
                            </Col>
                        )
                    })}

                </Row>
            }
        </Container>
    )
}

export default Movies