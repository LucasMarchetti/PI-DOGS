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
                <h2>SORT</h2>
                <h3>Name</h3>
                <select name="select" onChange={onSelectChange}>
                    <option className="option" value={ASCENDENTE}>Ascendente</option>
                    <option className="option" value={DESCENDENTE}>Descendente</option>
                </select>
            </div>

            <div>
                <h3>Weight</h3>
                <select name="select" onChange={onSelectChangeWeight}>
                    <option className="option" value={ASCENDENTE}>Ascendente</option>
                    <option className="option" value={DESCENDENTE}>Descendente</option>
                </select>
            </div>

            <div>
                <h2>FILTER</h2>
                <h3>Temperaments</h3>
                <select name="select" onChange={onSelectChange}>
                    <option className="option" value={DESCENDENTE}>Temperamento 1</option>
                    <option className="option" value={DESCENDENTE}>Temperamento 2</option>
                    <option className="option" value={DESCENDENTE}>Temperamento 3</option>
                    <option className="option" value={DESCENDENTE}>Temperamento 4</option>

                </select>
            </div>

        </div>
    )
}
