const initialState = {
    movies: null,
    movieDetails: null,
    recommendations: [],
    queryType: '',
    loading: false,
    page: 0,
    totalPages: 0,
    searchTitle: ""
}

const queryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "QUERY_RESULTS":
            return {
                ...state,
                movies: action.payload.movies,
                loading: false,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                searchTitle: action.payload.searchTitle
            }
        case "QUERY_STARTS":
            return {
                ...state,
                loading: true
            }
        case "QUERY_TYPE":
            return {
                ...state,
                queryType: action.payload
            }
        case "MOVIE_DETAILS":
            return {
                ...state,
                movieDetails: action.payload.movieDetails,
                recommendations: action.payload.recommendations,
                loading: false
            }
        case "PREVIOUS_PAGE":
            return {
                ...state,
                page: state.page - 1,
                movies: action.payload.movies,
                loading: false
            }
        case "NEXT_PAGE":
            return {
                ...state,
                page: state.page + 1,
                movies: action.payload.movies,
                loading: false
            }
        default:
            return state
    }
}

export default queryReducer