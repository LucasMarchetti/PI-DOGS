import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { filterByBreeds, filterByTemp, getDogs, sortByName, sortByWeight } from "../redux/actions"
import { ASCENDENTE, DESCENDENTE } from "./Constantes"

export default function Order() {

    const dispatch = useDispatch()

    const [selectedTemp, setSelectedTemp] = useState('')

    const dogs = useSelector((state) => state.dogs)

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch]) 

    const temperamentos = [] 

    if(dogs) {
        dogs.map(({
            temperament,
        })=> {
            if(temperament) {
                let temp = temperament.split(", ")
                temp.map((t) => { //t= ['Stubborn', 'Curious', 'Playful',...]
                    if(temperamentos.indexOf(t) === -1){
                        temperamentos.push(t)
                    }
                })
            }
        }) 
    }

    function onSelectChange(e) {
        dispatch(sortByName(e.target.value))
    }

    function onSelectChangeWeight(e) {
        dispatch(sortByWeight(e.target.value))
    }

    function onSelectChangeTemp(e) {
        setSelectedTemp(e.target.value)
        dispatch(filterByTemp(e.target.value))
    }

    function onSelectChangeBreeds(e) {
        dispatch(filterByBreeds(e.target.value))
    }
    
    

    return (
        <div className="order">

            <div>
                <h2>SORTS</h2>
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
                <h2>FILTERS</h2>
                <h3>Temperaments</h3>
                <select 
                    onChange={onSelectChangeTemp} 
                    name="temperaments" 
                    value={selectedTemp}>
                    <option className="option" value=''>Select temperaments</option>
                    {
                        temperamentos.map((t) => (
                            <option value={t} key={t}>{t}</option>
                        ))
                    }
                </select>
            </div>

            <div>
                <h3>Breeds Exist</h3>
                <select 
                    onChange={onSelectChangeBreeds}
                    name="exist" 
                    id="">
                    <option value="">API & DB</option>
                    <option value="API">API</option>
                    <option value="DB">Data Base</option>
                </select>
            </div>

        </div>
    )
}
