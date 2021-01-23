const initialState = {
    movies: [],
    movieDetails: null,
    queryType: '',
    loading: false
}

const queryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "QUERY_RESULTS":
            return {
                ...state,
                movies: action.payload.movies,
                queryType: action.payload.queryType,
                loading: false
            }
        case "QUERY_STARTS":
            return {
                ...state,
                loading: true
            }
        case "MOVIE_DETAILS":
            return {
                ...state,
                movieDetails: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default queryReducer