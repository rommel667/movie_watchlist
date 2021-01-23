import { createStore } from 'redux'
import { persistStore } from 'redux-persist'

import rootReducer from '../reducers/rootReducer'

const store = createStore(rootReducer)

export const persistor = persistStore(store)

export default store