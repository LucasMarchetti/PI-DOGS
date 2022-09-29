import { ASCENDENTE } from "../components/Constantes/index.js"
import { GET_DOGS, 
         GET_DETAILS, 
         GET_DETAILS_BY_ID, 
         SORT_BY_NAME, 
         SORT_BY_WEIGHT , 
         CREATE_DOG, 
         FILTER_BY_TEMP,
         FILTER_BY_BREED
        } from "./actions.js"

const initialState = {
  dogs: [],
  dogDetail: [],
  newDog: [],
  filtered: [],
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

    case SORT_BY_WEIGHT: {
      let orderDogs = [...state.dogs]
      let promA
      let promB

      orderDogs = orderDogs.sort((a, b) => {
        let ra = []
        let rb = []

        if(a.weight){
          ra = a.weight.split(" - ") 
        }
        if(b.weight) {
          rb = b.weight.split(" - ") 
        }

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

        if( ra.length === 2 ){
          promA = (+ra[0] + +ra[1]) / 2
        } else {
          promA = +ra[0]
        }
        if( rb.length === 2 ){
          promB = (+rb[0] + +rb[1]) / 2
        } else {
          promB = +rb[0]
        }

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

    case FILTER_BY_TEMP: {  
      console.log(action.payload, "Action payload reducer")
      let dogsFilter = []

      const d = [...state.dogs]

      d.forEach((dog) => { // d = [{}, {}, {}...]
        if(dog.temperament) {
          
          let temps = (dog.temperament).split(', ') 
          //temps=["curious", "active"]
          temps.map((t) => {
            if(t === action.payload) {
              dogsFilter.push(dog)
            }
          })
        }
      })

      return {
        ...state,
        dogs: [...state.dogs, action.payload],
        filtered: dogsFilter
      }
    }
    
    case FILTER_BY_BREED: {
      
      let dogsApiDb = []

      let dogs = [...state.dogs]

      dogs.forEach((d) => {
        if(action.payload === "API"){
          if((d.id).length < 5){
            dogsApiDb.push(d)
          }
        }
        if(action.payload === "DB") {
          if((d.id).length > 5) {
            dogsApiDb.push(d)
          }
        }
      })

      return {
        ...state,
        dogs: dogsApiDb
      }
    }

    default: {
      return state;
    }
  }
}
