import React, { useState } from 'react'
import { Card, Button, Image, Fade, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimesCircle } from "react-icons/fa";
import "./style.css"

const FaveMovie = ({ movie }) => {

    const [ hoverMovieId, setHoverMovieId ] = useState("")

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
            console.log("RECS",recommendations);
            dispatch({ type: "MOVIE_DETAILS", payload: { movieDetails: details, recommendations: recommendations }  })
        } catch (error) {
            console.log(error);
        }
    }

    const removeToFavoritesHandler = (movie) => {
        dispatch({ type: "REMOVE_FROM_FAVORITES", payload: movie  })
    }

    return (
        <Card className="card-image" onMouseLeave={() => setHoverMovieId('')} onMouseOver={() => setHoverMovieId(movie.id)} style={{ flex: 1, marginBottom: "16px", position: "relative" }}>

<OverlayTrigger
      placement="bottom-end"
      overlay={
        <Tooltip>
          Remove from Favorites
        </Tooltip>
      }
    >
      <FaTimesCircle onClick={() => removeToFavoritesHandler(movie.id)} size={22} color="white" style={{ position: "absolute", cursor: "pointer", top: "1%", left: "90%", display: hoverMovieId === movie.id ? "" : "none" }} />
    </OverlayTrigger>


        

        <Button style={{ position: "absolute", top: "35%", width: "80%", marginLeft: "10%", display: hoverMovieId === movie.id ? "" : "none" }} size="lg"  onClick={() => showDetails(movie.id)} variant="info">Show Details</Button>

        <Card.Img variant="top" height={330} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default FaveMovie