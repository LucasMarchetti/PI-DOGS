const { Router } = require('express')
const { Op } = require('sequelize')
const axios = require('axios')
const { Dog, Temperament } = require('../db')
const router = Router()
// const { API_KEY } = process.env;
// const img = require("./img_default/dog.jpg") 

router.get('/' , (req, res, next) => { // /api/dogs?q=name || /api/dogs/
    const name = req.query.q
    let dogPromiseApi
    let dogPromiseDb

    if (name) {
        // `https://api.thedogapi.com/v1/breeds/search?q=${name}?api_key=${API_KEY}`
        // https://api.thedogapi.com/v1/breeds/search?q=akita
        dogPromiseApi = axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`) // devuelve una promise
        dogPromiseDb = Dog.findAll({ // devuelve una promise
            include: Temperament,
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%"
                }
            },
            order: [
                ['name', 'ASC']
            ]
        })
    } else {
        // `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
        dogPromiseApi = axios.get(`https://api.thedogapi.com/v1/breeds`)
        dogPromiseDb = Dog.findAll({ // devuelve una promise
            include: Temperament
        })
    }
    Promise.all([ // devuelve una promesa cuando todas las promesas en el argumento han concluido
        dogPromiseApi,
        dogPromiseDb
    ])
    .then((response) => {
        const [dogApi, // respuesta de la API
               dogDb // respuesta de la base de datos
              ] = response 

        let dogsFiltered = dogApi.data.map((dog) => { // filtra los datos que traigo de la API
            return {
                id: dog.id,
                name: dog.name,
                weight: dog.weight.metric,
                height: dog.height.metric,
                life_span: dog.life_span,
                image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
                temperament: dog.temperament,
                origin: dog.origin,
                bred_for: dog.bred_for,
            }
        })
        let allDogs = [...dogsFiltered, ...dogDb] // concatena los datos de la API y de la base de datos
        res.send(allDogs)
    })
    .catch((error) => {
        {"No se encuentran "}
    })
})

router.get('/:id', async (req, res, next) => {
    try {
        let {id} = req.params
        let dog
        if(typeof id === 'string' && id.length > 5) { // es de la base de datos
            dog = await Dog.findByPk(id)
            res.send(dog)
        } else { // es de la API
            const response = await axios.get('https://api.thedogapi.com/v1/breeds/' + id)
            const r = response.data
            dog = {
                id: r.id,
                name: r.name,
                weight: r.weight.metric,
                height: r.height.metric,
                life_span: r.life_span,
                image: `https://cdn2.thedogapi.com/images/${r.reference_image_id}.jpg` ? 
                `https://cdn2.thedogapi.com/images/${r.reference_image_id}.jpg` : img,
                temperament: r.temperament,
                origin: r.origin,
                bred_for: r.bred_for,
            }
            res.send(dog)
        }
    } catch (error) {
        next(error)
    }
})

router.post('/' , async (req, res, next) => { // /api/dogs/*
    try {
      const { name, height, weight, years, temperament } = req.body
      const newDog = await Dog.create({
          name,
          height,
          weight,
          years,
          temperament
      })
      res.status(200).send(newDog)
    } catch (error) {
        next(error)
    }
})

router.put('/' , (req, res, next) => {
    res.send("soy put /dogs")
// [ ] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Altura (Diferenciar entre altura mínima y máxima)
// Peso (Diferenciar entre peso mínimo y máximo)
// Años de vida
// [ ] Posibilidad de seleccionar/agregar uno o más temperamentos
// [ ] Botón/Opción para crear una nueva raza de perro
// Es requisito que el formulario de creación esté validado con JavaScript
// Por ejemplo: Que el nombre de la raza no pueda contener números o símbolos,
//              que el peso/altura mínimo no pueda ser mayor al máximo y viceversa, etc.
})

router.delete('/' , (req, res, next) => {
    res.send("soy delete /dogs")
})

module.exports = router

// router.post('/:dogsId/temperament/:temperamentId', async (req, res, next) => {
//     try {
//         const { dogsId, temperamentId } = req.params
//         const dog = await Dog.findByPk(dogsId)
//         await dog.addTemperament(temperamentId) //mixin sql. add + (nombre de la tabla)
//         res.send(200)
//     } catch (error) {
//         next(error)
//     }
// })
