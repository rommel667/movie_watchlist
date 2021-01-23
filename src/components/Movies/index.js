import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Spinner, Container, Row, Col, CardDeck, Card } from 'react-bootstrap'
import Movie from './Movie'

const Movies = () => {

    const { queryType, movies, loading } = useSelector(state => state.query)


    return (
        <Container style={{ padding: "16px" }}>
            <h1>{queryType}</h1>
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