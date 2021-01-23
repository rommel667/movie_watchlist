import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

const Header = () => {

    const [title, setTitle] = useState('')

    const dispatch = useDispatch()

    const history = useHistory()

    const searchHandler = async (e) => {
        e.preventDefault()
        try {
            history.push('/search')
            dispatch({ type: "QUERY_STARTS" })
            const movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${title}`)
            const data = await movies.json()
            dispatch({ type: "QUERY_RESULTS", payload: { queryType: "Search Results", movies: data.results }  })
            setTitle("")
        } catch (error) {
            console.log(error);
        }
    }

    const fetchMovies = async (queryType) => {
        try {
            dispatch({ type: "QUERY_STARTS" })
            if (queryType === "latest") {
                const movies = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
                const data = await movies.json()
                console.log(queryType, data);
                dispatch({ type: "QUERY_RESULTS", payload: { queryType: "Latest Movies", movies: data.results } })
            }
            if (queryType === "popular") {
                const movies = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
                const data = await movies.json()
                console.log(queryType, data);
                dispatch({ type: "QUERY_RESULTS", payload: { queryType: "Popular Movies", movies: data.results } })
            }
            if (queryType === "upcoming") {
                const movies = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
                const data = await movies.json()
                console.log(queryType, data);
                dispatch({ type: "QUERY_RESULTS", payload: { queryType: "Upcoming Movies", movies: data.results } })
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">My Watchlist</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Favorites</Nav.Link>
                <NavDropdown title="Movies" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => fetchMovies("latest")} as={Link} to="/latest">Latest</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => fetchMovies("popular")} as={Link} to="/popular">Popular</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => fetchMovies("upcoming")} as={Link} to="/upcoming">Upcoming</NavDropdown.Item>
                </NavDropdown>
            </Nav>

            <Form onSubmit={searchHandler} inline>
                <FormControl value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Search movie" className="mr-sm-2" />
                <Button onClick={searchHandler} variant="outline-info">Search</Button>
            </Form>

        </Navbar>
    )
}

export default Header