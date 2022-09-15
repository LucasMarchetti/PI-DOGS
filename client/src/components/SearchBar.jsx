import { useState } from "react"
import { useDispatch } from "react-redux"
import { getDetails } from "../redux/actions"
import "./styles/styles.css"

export default function SearchBar () {
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault()
        dispatch(getDetails(search))
    }
    
    function onInputChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    autoComplete="off"
                    onChange={onInputChange} 
                    value={search} 
                    placeholder='Search breed'
                    className="searchBar"
                />
            </form>
        </>
    )
}