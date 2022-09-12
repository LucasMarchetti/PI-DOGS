import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getDogs } from "../redux/actions"

function Dogs() {
  const dogs = useSelector((state) => state.dogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDogs())
  }, [dispatch]) 
  console.log(dogs)

  return (
    <div>
      {dogs &&
        dogs.map((dog) => {
          return (
            <div key={dog.id}>
              <Link to={`/home/dogs/${dog.id}`}>
                <h3>{dog.name}</h3>
              </Link>
              <ul>
                <p>Bred for: {dog.bred_for}</p>
                <p>Origin: {dog.origin}</p>
                <p>Temperament: {dog.temperament}</p>
                <p>Weight: {dog.weight.metric}</p>
              </ul>
            </div>
          )
        })}
    </div>
  )
}

export default Dogs
