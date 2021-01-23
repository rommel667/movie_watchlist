const initialState = {
    favoriteMovies: []
}

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_FAVORITES":
            const prevArray1 = state.favoriteMovies
            return {
                ...state,
                favoriteMovies: [ ...prevArray1, action.payload ]
            }
        case "REMOVE_FROM_FAVORITES":
            const prevArray2 = state.favoriteMovies
            const newArray = prevArray2.filter(movie => movie !== action.payload)
            return {
                ...state,
                favoriteMovies: [ ...newArray ]
            }
        default:
            return state
    }
}

export default favoritesReducer