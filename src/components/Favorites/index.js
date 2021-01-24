import React, { useEffect } from 'react'
import { Container, Button, Spinner, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import FaveMovie from './FaveMovie'
import InitialPage from './InitialPage'

const Favorites = () => {

    const favorites = useSelector(state => state.favorites.favoriteMovies)
    const { queryType, movies, loading } = useSelector(state => state.query)

    useEffect(() => {

    }, [])

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
                {favorites.length === 0 ? <InitialPage/> :
                    <Row style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                        {favorites.map(movie => {
                            return (
                                <Col lg={3} xs={6} md={4}>
                                    <FaveMovie movie={movie} />
                                </Col>
                            )
                        })}

                    </Row>}
                </>
            }
        </Container>

    )
}

export default Favorites