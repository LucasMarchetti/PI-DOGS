import axios from "axios"
export const GET_DOGS = "GET_DOGS"
export const GET_DETAILS = "GET_DETAILS"

const { API_KEY } = process.env

export function getDogs() {
  return  function (dispatch) {
    axios.get("http://localhost:3001/api/dogs/")
    .then((dog) => {
      dispatch({ 
         type: GET_DOGS,
         payload: dog
        })
    })
  }
}

export function getDetails(id) {
  return async function (dispatch) {
    let dogDetail = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`
    )
    console.log(dogDetail.data)
    return dispatch({ type: GET_DETAILS, payload: dogDetail.data })
  }
}
