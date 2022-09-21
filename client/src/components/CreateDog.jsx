import { useState } from "react"
import { useDispatch } from "react-redux"
import { create } from "../redux/actions"

export default function CreateDog() {
    const [dog, setDog] = useState({})

    const dispatch = useDispatch()

    function onInputChange(e) {
        e.preventDefault()
        setDog({
            ...dog,
            [e.target.value]: e.target.value
        })
    }

    function onSubmit(e) {
        console.log(dog, "console.logg createdog on submit")
        e.preventDefault()
        dispatch(create(), dog)
    }

    return (
        <form onSubmit={onSubmit} className="formulario" >
            <h2 className="h2-create">NEW BREED</h2>
            <label htmlFor="" >Name: </label>
            <input 
                className="input-create"
                onChange={onInputChange}
                name="name" 
                type='text' 
                value={dog.name}
                placeholder="Name"
            ></input>
            <br/>

            <label htmlFor="" >Height: </label>
            <input 
                className="input-create"
                onChange={onInputChange} 
                name="height" 
                type='number' 
                value={dog.height}
                placeholder="Height"
                min="1"
            ></input>
            <br/>

            <label htmlFor="" >Weight: </label>
            <input 
                className="input-create"
                onChange={onInputChange} 
                name="weight" 
                type='number' 
                value={dog.weight}
                placeholder="Weight"
                min="1"
            ></input>
            <br/>

            <label htmlFor="" >Years span: </label>
            <input 
                className="input-create"
                onChange={onInputChange} 
                name="years_span" 
                type='number' 
                value={dog.years_span}
                placeholder="Years span"
                min="1"
            ></input>
            <br/>

            <select name="temperaments" className="select-create">
                <option value="">temperamento 1</option>
                <option value="">temperamento 2</option>
                <option value="">temperamento 3</option>
                <option value="">temperamento 4</option>
            </select>
            <br/>

            <button className="btn-create">
                <input 
                    className="input-create"
                    type='submit'></input>
            </button>

        </form>
    )
}