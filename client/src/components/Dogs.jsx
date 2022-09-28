import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getDogs } from "../redux/actions"
import Order from "./Order"
import dogImage from "./styles/dog.png"
import Pagination from "./Pagination"
import "./styles/styles.css"

export default function Dogs() {

  const dogs = useSelector((state) => state.dogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDogs())
  }, [dispatch]) 
  console.log(dogs, "CONSOLE.LOG DOGS ")

  return (
    <div>
        <Order />
      {
        dogs ? dogs?.map(({
            id,
            name,
            image,
            weight, 
            temperament,
            temperamento
          }) => {
            return (
            <div className="dog_card" key={id}>

              <Link to={`/home/dogs/id/${id}`} style={{textDecoration: 'none'}}>
                <img src={image ? image : dogImage } alt="img not found" className="img_card"/>
                <h3>{name}</h3>
              </Link>
            
              <p>Temperament: {temperament ? temperament : temperamento}</p>
              <p>Weight: {weight} Kg </p>
            </div>)
        }) : 
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
      <Pagination />
    </div>
  )
}
