import { ASCENDENTE } from "../components/Constantes/index.js"
import { GET_DOGS, GET_DETAILS, GET_DETAILS_BY_ID, SORT, CREATE_DOG } from "./actions.js"

const initialState = {
  dogs: [],
  dogDetail: [],
  newDog: [],
}

export default function rootReducer(state = initialState, action) {
 
  switch (action.type) {

    case GET_DOGS: {
      return {
        ...state,
        dogs: action.payload,
        dogDetail: action.payload
      }
    }

    case GET_DETAILS: {
      return {
        ...state,
        dogs: action.payload,
        dogDetail: action.payload
      }
    }

    case GET_DETAILS_BY_ID: {
      return {
        ...state,
        dogDetail: action.payload
      }
    }

    case SORT: {
      let orderDogs = [...state.dogs]
      orderDogs = orderDogs.sort((a, b) => {
        if(a.name < b.name) {
          return action.payload === ASCENDENTE ? -1 : 1
        }
        if(a.name > b.name) {
          return action.payload === ASCENDENTE ? 1 : -1
        }
        return 0
      })

      return {
        ...state,
        dogs: orderDogs
      }
    }

    case CREATE_DOG: {
      let newDog = [...state, action.payload]

      return {
        ...state, 
        dogs: [...newDog, ...state.dogs]
      }
    }

    default: {
      return state;
    }
  }
}
