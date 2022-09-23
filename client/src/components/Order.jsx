import { useDispatch } from "react-redux"
import { sortByName, sortByWeight } from "../redux/actions"
import { ASCENDENTE, DESCENDENTE } from "./Constantes"

export default function Order() {

    const dispatch = useDispatch()

    function onSelectChange(e) {
        dispatch(sortByName(e.target.value))
    }

    function onSelectChangeWeight(e) {
        dispatch(sortByWeight(e.target.value))
    }

    return (
        <div className="order">

            <div>
                <h2>SORT BY NAME</h2>
                <select name="select" onChange={onSelectChange}>
                    <option value={ASCENDENTE}>Ascendente</option>
                    <option value={DESCENDENTE}>Descendente</option>
                </select>
            </div>

            <div>
                <h2>SORT BY WEIGHT</h2>
                <select name="select" onChange={onSelectChangeWeight}>
                    <option value={ASCENDENTE}>Ascendente</option>
                    <option value={DESCENDENTE}>Descendente</option>
                </select>
            </div>

        </div>
    )
}
