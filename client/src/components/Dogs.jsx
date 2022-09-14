import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDogs } from "../redux/actions"
import DogDetails from "./DogDetails"
import SearchBar from "./SearchBar"

export default function Dogs() {
  const dogs = useSelector((state) => state.dogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDogs())
  }, [dispatch]) 

  return (
    <div>
      <SearchBar />
      {
        dogs ? dogs.map(({
            id,
            name,
            image, 
            bred_for, 
            life_span, 
            height, 
            weight, 
            temperament
          }) => {
            return <DogDetails 
              key={id}
              id={id}
              name={name}
              image={image}
              bred_for={bred_for}
              life_span={life_span}
              height={height}
              weight={weight}
              temperament={temperament}
            />
        }) : 
        <h3>
        Not details...
        </h3>
      }
    </div>
  )
}
