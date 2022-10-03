import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getDogs } from "../redux/actions"
import Order from "./Order"
import dogImage from "./styles/dog.png"
import "./styles/styles.css"

export default function Dogs() {

  const dispatch = useDispatch()
  
  const dogs = useSelector((state) => state.dogs) 
  const filteredDogs = useSelector((state) => state.filtered)
  const searchDog = useSelector((state) => state.searchDogs)
  const [currentPage, setCurrentPage] = useState(1)

  // console.log(dogs, "dogs Dogs")
  // console.log(searchDog, "searchDog Dogs")
  // console.log(filteredDogs, "filteredDogs Dogs")


  let currentCards
  
  useEffect(() => {
    dispatch(getDogs()) //request
  }, [dispatch]) 

  const breedsPerPage = 8

  let totalCards
  
  if(searchDog.length > 0) {
    totalCards = searchDog.length
    } else if (filteredDogs.length > 0) {
      totalCards = filteredDogs.length
    } else { totalCards = dogs.length
  }
  
  let lastPostIndex = currentPage * breedsPerPage
  let firstPostIndex = lastPostIndex - breedsPerPage
  if(searchDog.length !== 0) {
    currentCards = searchDog.slice(firstPostIndex, lastPostIndex)
  } else if(filteredDogs.length !== 0) {
    currentCards = filteredDogs.slice(firstPostIndex, lastPostIndex)
    } else if (dogs) {currentCards = dogs.slice(firstPostIndex, lastPostIndex)
  }
  
  const pageNumbers = []
  const limitPages = (Math.ceil(totalCards/breedsPerPage) + 1 )

  for (let i = 1; i <= Math.ceil(totalCards / breedsPerPage); i++) {
    pageNumbers.push(i)
  }

  const nextHandler = () => {
    const nextPage = currentPage + 1

    if(nextPage === limitPages) return

    setCurrentPage(nextPage)
  }

  const prevHandler = () => {
    const prevPage = currentPage - 1

    if (prevPage < 1) return

    setCurrentPage(prevPage)
  }
  
  return (
    <div>
        <Order />

        <div className="pagination">
            <button className="Button" onClick={prevHandler}>Prev</button>
            <ul className="ul-links" >
              {
              pageNumbers.map(number => (
                  <li key={number}>
                      <a onClick={() => setCurrentPage(number)} value={number} >{number}</a>
                  </li>
              ))
              }
            </ul>
            <button className="Button" onClick={nextHandler}>Next</button>
        </div>

      {
        currentCards ? currentCards.map(({
            id,
            name,
            image,
            weight, 
            temperament,
            temperamento,
          }) => {
            return (
            <div className="cards">
              <div className="dog_card" key={id}>

                <Link to={`/home/dogs/id/${id}`} style={{textDecoration: 'none'}}>
                  <img src={image ? image : dogImage } alt="img not found" className="img_card"/>
                  <h3>{name}</h3>
                </Link>
              
                <p>Temperament: {temperament ? temperament : temperamento}</p>
                <p>Weight: {weight} Kg </p>

              </div>
            </div>
            )
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
      <div className="pagination">
            <button className="Button" onClick={prevHandler}>Prev</button>
            <ul className="ul-links" >
              {
              pageNumbers.map(number => (
                  <li key={number}>
                      <a onClick={() => setCurrentPage(number)} value={number} >{number}</a>
                  </li>
              ))
              }
            </ul>
            <button className="Button" onClick={nextHandler}>Next</button>
        </div>
    </div>
  )
}
