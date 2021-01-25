import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useMedia } from 'react-use-media'
import { FaSearch } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";

const Header = () => {

    const [title, setTitle] = useState('')

    const dispatch = useDispatch()
    const queryType = useSelector(state => state.query.queryType)

    const history = useHistory()

    const matches = useMedia('(min-width: 768px)');


    const searchHandler = async (e) => {
        e.preventDefault()
        if(title === "") return
        try {
            if (queryType === "Search Results") {
                history.push('/movies')
                dispatch({ type: "QUERY_STARTS" })
                const movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${title}`)
                const data = await movies.json()
                dispatch({ type: "SEARCH_REQUERY_RESULTS", payload: { movies: data.results, page: data.page, totalPages: data.total_pages, queryType: "Search Results", searchTitle: title } })
                setTitle("")
            } else {
                history.push('/movies')
                dispatch({ type: "QUERY_STARTS" })
                dispatch({ type: "QUERY_TYPE_AND_SEARCH_TITLE", payload: { queryType: "Search Results", searchTitle: title } })
                setTitle("")
            }

        } catch (error) {
            console.log(error);
        }
    }

    const fetchMovies = async (query) => {
        try {
            dispatch({ type: "QUERY_STARTS" })
            if (query === "latest") {
                if (queryType === "Latest Movies") {
                    const movies = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
                    const data = await movies.json()
                    dispatch({ type: "QUERY_RESULTS", payload: { movies: data.results, page: data.page, totalPages: data.total_pages } })
                } else {
                    dispatch({ type: "QUERY_TYPE", payload: "Latest Movies" })
                }
            }
            if (query === "popular") {
                if (queryType === "Popular Movies") {
                    const movies = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
                    const data = await movies.json()
                    dispatch({ type: "QUERY_RESULTS", payload: { movies: data.results, page: data.page, totalPages: data.total_pages } })
                } else {
                    dispatch({ type: "QUERY_TYPE", payload: "Popular Movies" })
                }
            }
            if (query === "upcoming") {
                if (queryType === "Upcoming Movies") {
                    const movies = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
                    const data = await movies.json()
                    dispatch({ type: "QUERY_RESULTS", payload: { movies: data.results, page: data.page, totalPages: data.total_pages } })
                } else {
                    dispatch({ type: "QUERY_TYPE", payload: "Upcoming Movies" })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand style={{ display: "flex", alignItems: "center" }} as={Link} to="/"><FaFilm size={30} style={{ marginRight: "5px" }} />{matches && "MyWatchlist"}</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Favorites</Nav.Link>
                <NavDropdown title="Movies" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => fetchMovies("latest")} as={Link} to="/movies">Latest</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => fetchMovies("popular")} as={Link} to="/movies">Popular</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => fetchMovies("upcoming")} as={Link} to="/movies">Upcoming</NavDropdown.Item>
                </NavDropdown>
            </Nav>

            <Form onSubmit={searchHandler} inline>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <FormControl value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Search movie" className="mr-sm-2" />
                    {matches ? <Button onClick={searchHandler} variant="outline-info">Search</Button> :
                        <Button style={{ marginLeft: "5px" }} onClick={searchHandler} variant="outline-info"><FaSearch /></Button>}
                </div>
            </Form>

        </Navbar>
    )
}

export default Header