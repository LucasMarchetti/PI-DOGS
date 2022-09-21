import axios from "axios"
export const GET_DOGS = "GET_DOGS"
export const GET_DETAILS = "GET_DETAILS"
export const GET_DETAILS_BY_ID = "GET_DETAILS_BY_ID"
export const SORT = "SORT"
export const CREATE_DOG = "CREATE_DOG"

export function getDogs() {
  return function (dispatch) {
    axios.get("http://localhost:3001/api/dogs/")
    .then((dog) => {
      dispatch({ 
         type: GET_DOGS,
         payload: dog.data
        })
    })
    .catch((error) =>{
      console.log(error)
    })
  }
}

export function getDetails(search) {
  return function (dispatch) {
    axios.get('http://localhost:3001/api/dogs?q=' + search)
    .then((dogDetail) => {
      dispatch({ 
         type: GET_DETAILS,
         payload: dogDetail.data
        })
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

export function getDetailsById(id) {
  return function (dispatch) {
    axios.get('http://localhost:3001/api/dogs/id/' + id)
    .then((detail) => {
      // console.log(detail.data, "console log de detail ")
      dispatch({ 
         type: GET_DETAILS_BY_ID,
         payload: detail.data
        })
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

export function sort(order) {
  return {
    type: SORT,
    payload: order
  }
}

export function create() {
  return function(dispatch) {
      axios.post('http://localhost:3001/api/dogs/create')
      .then((data) => 
        dispatch({
          type: CREATE_DOG,
          payload: data
        }
    ))
  }
}