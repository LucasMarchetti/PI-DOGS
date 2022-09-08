import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../redux/actions";

function DogDetails() {
  const dispatch = useDispatch()
  const detail = useSelector((state) => state.dogDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [id, dispatch]);


  return (
    <>
      {detail ? (
        <>
          <h3>{detail.name}</h3>
        </>
      ) : (
        <h4>No hay detalles</h4>
      )}
    </>
  );
}

export default DogDetails;
