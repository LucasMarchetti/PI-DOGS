import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getDogs } from "../redux/actions"
import "./styles/styles.css"

export default function Dogs() {
  const dogs = useSelector((state) => state.dogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDogs())
  }, [dispatch]) 

  return (
    <div>

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

              <Link to={`/home/dogs/${id}`} style={{textDecoration: 'none'}}>
                <img src={image} alt="img not found" className="img_card"/>
                <h3>{name}</h3>
              </Link>
            
              <p>Temperament: {temperament}</p>
              <p>Weight: {weight} Kg </p>
            </div>)
        }) : 
        <h3>
        Not details...
        </h3>
      }
    </div>
  )
}
