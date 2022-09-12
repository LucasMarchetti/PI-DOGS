import { createStore, compose, applyMiddleware } from "redux"
import rootReducer from "./reducer"
import thunk from "redux-thunk"

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk), // necesario para aplicar acciones asincronicas
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
)

export default store
