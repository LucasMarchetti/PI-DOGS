import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDetails } from "../redux/actions"
import "./styles/styles.css"

export default function DogDetails() {
  
  const dog = useSelector((state) => state.dogs)
  console.log(dog) // dog = [{}, {}, {}, todas las razas]

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDetails())
  }, [dispatch]) 

  return (
    <>
    {
      dog ? dog.map(({
        id,
        name,
        image, 
        bred_for, 
        life_span, 
        height, 
        weight, 
        temperament
      }) => {
        return (
          <>
          <h1>{name}</h1>
          </>
        )
      }) : 
      <h3>
        Not details...
      </h3>
    }
    </>
  )
}
