import axios from "axios"
export const GET_DOGS = "GET_DOGS"
export const GET_DETAILS = "GET_DETAILS"

// const { API_KEY } = process.env

export function getDogs() {
  return function (dispatch) {
    axios.get("http://localhost:3001/api/dogs/")
    .then((dog) => {
      dispatch({ 
         type: GET_DOGS,
         payload: dog
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
      // console.log(dogDetail.data)
      dispatch({ 
         type: GET_DETAILS,
         payload: dogDetail 
        })
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
