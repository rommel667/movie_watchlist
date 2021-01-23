import React from 'react'
import { useSelector } from 'react-redux'
import { Image, Button, Spinner, Container } from 'react-bootstrap'

const MovieDetails = () => {

    const { movieDetails, loading } = useSelector(state => state.query)

    return (
        <Container style={{paddingTop: "16px"}}>
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
            <div>
            <div style={{ display: 'flex', flexDirection: "row" }}>
            <Image width={300} src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`} rounded />
            <div style={{ marginLeft: "16px" }}>
                <h2>{movieDetails.title}</h2>
                <p>Release Date: {movieDetails.release_date}</p>
                <p>Summary: {movieDetails.overview}</p>
                <p>Rating: {movieDetails.vote_average}/10</p>
            </div> 
            </div>
            <div>
                <h4>Recommended For You:</h4>
            </div>
            </div>
            }
            
        </Container>
    )
}

export default MovieDetails