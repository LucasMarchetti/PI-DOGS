import { useDispatch } from "react-redux"
import { sort } from "../redux/actions"
import { ASCENDENTE, DESCENDENTE } from "./Constantes"

export default function Order() {

    const dispatch = useDispatch()

    function onSelectChange(e) {
        dispatch(sort(e.target.value))
    }

    return (
        <>
            <select name="select" onChange={onSelectChange}>
                <option value={ASCENDENTE}>Ascendente</option>
                <option value={DESCENDENTE}>Descendente</option>
            </select>
        </>
    )
}
