import { ASCENDENTE } from "../components/Constantes/index.js"
import { GET_DOGS, 
         GET_DETAILS, 
         GET_DETAILS_BY_ID, 
         SORT_BY_NAME, 
         SORT_BY_WEIGHT , 
         CREATE_DOG 
        } from "./actions.js"

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

    case SORT_BY_NAME: {
      let orderDogs = [...state.dogs]
      orderDogs = orderDogs.sort((a, b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase()) {
          return action.payload === ASCENDENTE ? -1 : 1
        }
        if(a.name.toLowerCase() > b.name.toLowerCase()) {
          return action.payload === ASCENDENTE ? 1 : -1
        }
        return 0
      })

      return {
        ...state,
        dogs: orderDogs
      }
    }

    case SORT_BY_WEIGHT: {
      let orderDogs = [...state.dogs]
      let promA
      let promB

      orderDogs = orderDogs.sort((a, b) => {

      let ra = a.weight.split(" - ") 
      let rb = b.weight.split(" - ") 

      if( ra[0] === "NaN" ) {
        ra[0] = 0
      } else if( ra[1] === "NaN" ) {
        ra[1] = 0
      }
      
      if( rb[0] === "NaN" ) {
        rb[0] = 0
      } else if( rb[1] === "NaN" ) {
        rb[1] = 0
      }

      if( ra.lenght === 2 ){
        promA = (+ra[0] + +ra[1]) / 2
      } else {
        promA = +ra[0]
      }
      if( rb.lenght === 2 ){
        promB = (+rb[0] + +rb[1]) / 2
      } else {
        promB = +rb[0]
      }

      // promA = (+ra[0] + (+ra[1]) ? +ra[1] : 0) / 2; // 5
      // promB = (+rb[0] + (+rb[1]) ? +rb[1] : 0) / 2;

      if(promA < promB) { 
        return action.payload === ASCENDENTE ? -1 : 1
      }
      if(promA > promB) {
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
