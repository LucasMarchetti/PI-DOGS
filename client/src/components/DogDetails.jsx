import { Link } from "react-router-dom"
import "./styles/styles.css"

export default function DogDetails({
  id,
  name,
  image, 
  bred_for, 
  life_span, 
  height, 
  weight, 
  temperament
}) {

  return (
    <>
      <div className="dog_card" key={id}>
        <div className="dog_container">
            <Link to={`/home/dogs/${id}`} style={{textDecoration: 'none'}}>
              <img src={image} alt="img not found" className="img_card"/>
              <h3>{name}</h3>
            </Link>
            <p>Temperament: {temperament}</p>
            <p>Weight: {weight} Kg </p>
        </div>

      </div>
    </>
  )
}
