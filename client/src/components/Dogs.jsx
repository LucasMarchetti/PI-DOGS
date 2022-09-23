import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getDogs } from "../redux/actions"
import Filters from "./Filters"
import Order from "./Order"
import "./styles/styles.css"

export default function Dogs() {

  const dogs = useSelector((state) => state.dogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDogs())
  }, [dispatch]) 

  return (
    <div>
        <Order />
        <Filters />
      {
        dogs ? dogs.map(({
            id,
            name,
            image,
            weight, 
            temperament
          }) => {
            return (
            <div className="dog_card" key={id}>

              <Link to={`/home/dogs/id/${id}`} style={{textDecoration: 'none'}}>
                <img src={image} alt="img not found" className="img_card"/>
                <h3>{name}</h3>
              </Link>
            
              <p>Temperament: {temperament}</p>
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
    </div>
  )
}
