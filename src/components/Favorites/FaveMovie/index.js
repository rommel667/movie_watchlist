import React, { useState } from 'react'
import "./style.css"
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimesCircle } from "react-icons/fa";
import DeleteModal from '../DeleteModal'
import Zoom from 'react-reveal/Zoom';


const FaveMovie = ({ movie }) => {

    const [hoverMovieId, setHoverMovieId] = useState("")
    const [show, setShow] = useState(false)

    const history = useHistory()

    const dispatch = useDispatch()

    const showDetails = async (id) => {
        try {
            history.push('/details')
            dispatch({ type: "QUERY_STARTS" })
            const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            const details = await movie.json()
            const recommendationsDB = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
            const recommendations = await recommendationsDB.json()
            console.log("RECS", recommendations);
            dispatch({ type: "MOVIE_DETAILS", payload: { movieDetails: details, recommendations: recommendations } })
        } catch (error) {
            console.log(error);
        }
    }

    const removeToFavoritesHandler = (movie) => {
        dispatch({ type: "REMOVE_FROM_FAVORITES", payload: movie })
        setShow(false)
    }

    return (
        <Zoom>
        <Card className="card-image" onMouseLeave={() => setHoverMovieId('')} onMouseOver={() => setHoverMovieId(movie.id)} style={{ flex: 1, marginBottom: "16px", position: "relative" }}>

            <OverlayTrigger
                placement="bottom-end"
                overlay={
                    <Tooltip>
                        Remove from Favorites
                    </Tooltip>
                }
            >
                {/* <FaTimesCircle onClick={() => removeToFavoritesHandler(movie.id)} size={22} color="white" style={{ position: "absolute", cursor: "pointer", top: "1%", left: "90%", display: hoverMovieId === movie.id ? "" : "none" }} /> */}
                <FaTimesCircle onClick={() => setShow(true)} size={22} color="white" style={{ position: "absolute", cursor: "pointer", top: "1%", left: "90%", display: hoverMovieId === movie.id ? "" : "none" }} />
            </OverlayTrigger>

            <Button style={{ position: "absolute", top: "35%", width: "80%", marginLeft: "10%", borderRadius: "20px", display: hoverMovieId === movie.id ? "" : "none" }} size="lg" onClick={() => showDetails(movie.id)} variant="primary">Show Details</Button>

            <Card.Img variant="top" height={330} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
            </Card.Body>

            <DeleteModal title={movie.title} show={show} cancelHandler={() => setShow(false)} deleteHandler={() => removeToFavoritesHandler(movie.id)} />
        </Card>
        </Zoom>
    )
}

export default FaveMovie