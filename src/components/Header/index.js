import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {

    const [ title, setTitle ] = useState('')

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">My Watchlist</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Favorites</Nav.Link>
                <NavDropdown title="Movies" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/latest">Latest</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/popular">Popular</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/upcoming">Upcoming</NavDropdown.Item>
                </NavDropdown>
            </Nav>

            <Form inline>
                <FormControl value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Search movie" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>

        </Navbar>
    )
}

export default Header