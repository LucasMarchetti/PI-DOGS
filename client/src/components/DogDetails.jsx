import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getDogs } from "../redux/actions"
import "./styles/styles.css"

export default function DogDetails() {
  const { id } = useParams()
  
  const dog = useSelector((state) => state.dogs)

  const detail = dog.find((d) => 
    d.id.toString() === id.toString()
  )
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDogs())
  }, [dispatch]) 

  return (
    <>
      {
        detail ?
        <div className="card">
          <div>
            <img src={detail.image} alt="img not found" className="img_card_details" />
          </div>

          <div >
              <h1 className="details_card">{detail.name}</h1> 
              <ul >
                <p>Origin: {detail.origin ? detail.origin : "Unknown origin"}</p>
                <p>Height: {detail.height ? detail.height : "Unknown height"} cm</p>
                <p>Weight: {detail.weight ? detail.weight : "Unknown weight"} kg</p>
                <p>Bred for: {detail.bred_for ? detail.bred_for : "Unknown bred for"}</p>
                <p>Life span: {detail.life_span ? detail.life_span : "Unknown life span"}</p>
                <p>Temperaments: {detail.temperament ? detail.temperament : "Unknown temperament"}</p>
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
