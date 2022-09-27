import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDogs } from "../redux/actions";

export default function CreateDog() {
    const [selectedTemp, setSelectedTemp] = useState('');
    const [dog, setDog] = useState({
        temperaments: [],
        name: '',
        weight: '',
        height: '',
        life_span: '',
    })

    //HOOKS
    const dogs = useSelector((state) => state.dogs)
    const history = useHistory()
    const dispatch = useDispatch()
    console.log(dog, "dogs useselector")

    useEffect(() => {
        dispatch(getDogs())
      }, [dispatch]) 
      
    function onSubmit(e) {
        e.preventDefault()
        axios.post('http://localhost:3001/api/dogs/create', dog)
        .then(() => {
            history.push('/home/dogs')
        })
    }

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

    function onInputChange(e) { // hacer validacion ***
        e.preventDefault()
        setDog({
            ...dog,
            [e.target.name]: e.target.value
        })
    }


    const handleChangeTemp = (ev) => {

        setSelectedTemp(
            ev.target.value
        )

        if (ev.target.value) {
            if (!dog.temperaments.includes(ev.target.value)) {
                setDog({
                    ...dog,
                    temperaments: [...dog.temperaments, ev.target.value]
                })
            }
        }

    }
    
    function getNames(arr) {
       let names = []
       temperamentos.forEach((t) => {
         arr.forEach((name) => {
           if (name === t) {
               names.push({ name: t })
           }
         })
       })
    //    console.log(names, "NAMESS")
       return names
    }
    const deleteTemp = (name) => {
      setDog({
        ...dog,
        temperaments: dog.temperaments.filter(temp => temp !== name)
        })
    }
    
    return (
        <form onSubmit={onSubmit} className="formulario" >
            <h2 className="h2-create">NEW BREED</h2>
            <label htmlFor="" >Name: </label>
            <input 
                required
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
                required
                className="input-create"
                onChange={onInputChange} 
                name="height" 
                type='number' 
                value={dog.height}
                placeholder="Height"
                min="1"
                max="100"
            ></input>
            <br/>

            <label htmlFor="" >Weight: </label>
            <input 
                required
                className="input-create"
                onChange={onInputChange} 
                name="weight" 
                type='number' 
                value={dog.weight}
                placeholder="Weight"
                min="1"
                max="100"
            ></input>
            <br/>

            <label htmlFor="" >Years span: </label>
            <input 
                required
                className="input-create"
                onChange={onInputChange} 
                name="years" 
                type='number' 
                value={dog.years}
                placeholder="Years span"
                min="1"
                max="50"
            ></input>
            <br/>

            <select 
                onChange={handleChangeTemp} 
                name="temperaments" 
                value={selectedTemp} 
                className="select-create">
                <option value=''>Select temperaments</option>
                {
                 temperamentos.map((t) => (
                     <option value={t} key={t}>{t}</option>
                 ))
                }
            </select>
            <br/>  

            <div className='temp-container'>
                {
                    getNames(dog.temperaments).map((temp) => {
                        return (
                        <p 
                        value={temp.name}
                        key={temp.name}
                        >
                          {temp.name}<button onClick={() => deleteTemp(temp.name)}>X</button>
                        </p>)
                    }
                )
                }
            </div>

            <button className="btn-create">
                <input 
                    className="input-create"
                    type='submit'></input>
            </button>

        </form>
    )
}