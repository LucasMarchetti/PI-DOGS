import { GET_DOGS, GET_DETAILS } from "./actions.js"

const initialState = {
  dogs: [],
  dogDetail: [],
}

export default function rootReducer(state = initialState, action) {
 
  switch (action.type) {

    case GET_DOGS: {
      return {
        ...state,
        dogs: action.payload.data,
      }
    }

    case GET_DETAILS: {
      return {
        ...state,
        dogDetail: action.payload.data
      }
    }

    default: {
      return state;
    }
  }
}
