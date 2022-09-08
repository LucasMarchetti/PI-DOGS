import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_DETAILS = "GET_DETAILS";

const { API_KEY } = process.env;

export function getDogs() {
  return async function (dispatch) {
    let breeds = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    return dispatch({ type: GET_DOGS, payload: breeds.data });
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    let dogDetail = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${id}?api_key=${API_KEY}`
    );
    console.log(dogDetail.data)
    return dispatch({ type: GET_DETAILS, payload: dogDetail.data });
  };
}
