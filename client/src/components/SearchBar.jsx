import { useState } from "react"
import { useDispatch } from "react-redux"
import { getDetails } from "../redux/actions"
import "./styles/styles.css"

export default function SearchBar () {
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()

    function handleChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getDetails(search))
        
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    autoComplete="off"
                    onChange={handleChange} 
                    placeholder='Search breed'
                    value={search} 
                    className="searchBar"
                />
            </form>
        </>
    )
}