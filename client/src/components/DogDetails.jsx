import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getDetailsById } from "../redux/actions"
import "./styles/styles.css"
import dogImage from "./styles/dog.png"

export default function DogDetails() {
  const { id } = useParams()

  const dog = useSelector((state) => state.dogDetail)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDetailsById(id))
  }, [dispatch, id]) 

  return (
    <>
      {
        dog ?
        <div className="card">
          <div>
            <img src={dog.image ? dog.image : dogImage} alt="img not found" className="img_card_details" />
          </div>

          <div >
              <h1 className="details_card">{dog.name}</h1> 
              <ul >
                <p>Origin: {dog.origin ? dog.origin : "Unknown"}</p>
                <p>Height: {dog.height ? dog.height : "Unknown"} cm</p>
                <p>Weight: {dog.weight ? dog.weight : "Unknown"} kg</p>
                <p>Bred for: {dog.bred_for ? dog.bred_for : "Unknown"}</p>
                <p>Life span: {dog.life_span ? dog.life_span : "Unknown"}</p>
                <p>Temperaments: {dog.temperament ? dog.temperament : "Unknown"}</p>
              </ul>
          </div>
        </div>
        : 
        <div className="error">
          <h1>
            Lo sentimos, ha ocurrido un error.
          </h1>
          <Link to="/home/dogs">
            <button className="btn-to-home">
              HOME
            </button>
          </Link>
        </div>
      }
    </>
  );
}
