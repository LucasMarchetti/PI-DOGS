import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDogs } from "../redux/actions";

export default function CreateDog() {
    const [selectedTemp, setSelectedTemp] = useState('')
    const [errors, setErrors] = useState({})

    const [dog, setDog] = useState({
        temperaments: [],
        name: '',
        weight: '',
        height: '',
        life_span: '',
    })

    const dogs = useSelector((state) => state.dogs)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDogs())
      }, [dispatch]) 
      
    function onSubmit(e) {
        e.preventDefault()
        console.log(errors, "errors1")
        let er = errors
        if(Object.entries(er).length !== 0) {
            console.log(Object.entries(er).length, "er")
            return (
                alert("Check the data provided")
            )
        } else if (Object.entries(er).length === 0) {
            axios.post('http://localhost:3001/api/dogs/create', dog)
            .then(() => {
                history.push('/home/dogs')
            })  
        }
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

    function validate (input) {
        let errors = {}
        const expReg = /^[a-zA-Z ]+$/

        if(!input.name) {
            errors.name = "Name is required"
        } else if (!expReg.test(input.name)) {
            errors.name = "Name is invalid "
        } else if (input.name.length > 25) {
            errors.name = "Maximum number of characters, 20"
        }

        if(!input.height) {
            errors.height = "Height is required"
        } else if (!/(?=.*[0-9])/.test(input.height)) {
            errors.height = "Height must contain a number"
        } else if (input.height.length > 100) {
            errors.height = "Maximum height, 100cm"
        }

        if(!input.weight) {
            errors.weight = "Weight is required"
        } else if (!/(?=.*[0-9])/.test(input.weight)) {
            errors.weight = "Weight must contain a number"
        } else if (input.weight.length > 100) {
            errors.weight = "Maximum weight, 100kg"
        }

        if(!input.life_span) {
            errors.life_span = "Life span is required"
        } else if (!/(?=.*[0-9])/.test(input.life_span)) {
            errors.life_span = "Life span must contain a number"
        } else if (input.life_span.length > 50) {
            errors.life_span = "Maximum life span, 50 years"
        }

        return errors
    }

    function onInputChange(e) { 
        e.preventDefault()
        console.log(e.target.value, "target")
        const {name, value} = e.target

        const newDog = {
            ...dog,
            [name]: value
        }
        console.log(newDog, "newdog")

        setDog(newDog)
        setErrors(validate(newDog))
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
                className={ errors.name ? "error" : "input-create"}
                onChange={onInputChange}
                name="name" 
                type='text' 
                value={dog.name}
                placeholder="Name ..."
            ></input>
            {errors.name ? <span className="error-span">{errors.name}</span> : <></>}

            <br/>

            <label htmlFor="" >Height: </label>
            <input 
                required
                className={ errors.height ? "error" : "input-create"}
                onChange={onInputChange} 
                name="height" 
                type='number' 
                value={dog.height}
                placeholder="Height cm ..."
                min="1"
                max="100"
            ></input>
            {errors.height ? <span className="error-span">{errors.height}</span> : <></>}

            <br/>

            <label htmlFor="">Weight: </label>
            <input 
                required
                className={ errors.weight ? "error" : "input-create"}
                onChange={onInputChange} 
                name="weight" 
                type='number' 
                value={dog.weight}
                placeholder="Weight kg ..."
                min="1"
                max="100"
            ></input>
            {errors.weight ? <span className="error-span">{errors.weight}</span> : <></>}
            <br/>

            <label htmlFor="">Years span: </label>
            <input 
                required
                className={ errors.life_span ? "error" : "input-create"}
                onChange={onInputChange} 
                name="life_span" 
                type='number' 
                value={dog.life_span}
                placeholder="Years span ..."
                min="1"
                max="50"
            ></input>
            {errors.life_span ? <span className="error-span">{errors.life_span}</span> : <></>}
            <br/>

            <select 
                onChange={handleChangeTemp} 
                name="temperaments" 
                value={selectedTemp} 
                required
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