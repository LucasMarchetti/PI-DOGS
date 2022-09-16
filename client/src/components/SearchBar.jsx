import { useState } from "react"
import { useDispatch } from "react-redux"
import { getDetails } from "../redux/actions"
import "./styles/styles.css"

export default function SearchBar () {
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()

    function handleChange(event) {
        setSearch(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(getDetails(search))
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                    type="text" 
                    id="search"
                    autoComplete="off"
                    onChange={(e) => handleChange(e)} 
                    placeholder='Search breed'
                    value={search} 
                    className="searchBar"
                />
            </form>
        </>
    )
}