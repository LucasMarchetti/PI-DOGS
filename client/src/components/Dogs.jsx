import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Dogs() {
  const dogs = useSelector((state) => state.dogs);

  return (
    <div>
      {dogs &&
        dogs.map((dog) => {
          return (
            <div key={dog.id}>
              <Link to={`/home/dogs/${dog.name}`}>
                <h3>{dog.name}</h3>
              </Link>
              <ul>
                <p>Bred for: {dog.bred_for}</p>
                <p>Origin: {dog.origin}</p>
                <p>Temperament: {dog.temperament}</p>
                <p>Weight: {dog.weight.metric}</p>
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default Dogs;
