const { Router } = require('express')
const axios = require('axios')
const { Dog, Temperament } = require('../db')
const router = Router()

router.get('/' , (req, res, next) => { // /api/dogs/*
    let dogPromiseApi = axios.get("https://api.thedogapi.com/v1/breeds") // devuelve una promise
    let dogPromiseDb = Dog.findAll({ // devuelve una promise
        include: Temperament
    })
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
                image: dog.image.url,
                temperament: dog.temperament
            }
        })
        let allDogs = [...dogsFiltered, ...dogDb] // concatena los datos de la API y de la base de datos
        res.send(allDogs)
    })
})

router.post('/' , async (req, res, next) => { // /api/dogs/*
    try {
      const { name, height, weight, years } = req.body
      const newDog = await Dog.create({
          name,
          height,
          weight,
          years,
      })
      res.status(200).send(newDog)
    } catch (error) {
        next(error)
    }
})

router.post('/:dogsId/temperament/:temperamentId', async (req, res, next) => {
    try {
        const { dogsId, temperamentId } = req.params
        const dog = await Dog.findByPk(dogsId)
        await dog.addTemperament(temperamentId) //mixin sql. add + (nombre de la tabla)
        res.send(200)
    } catch (error) {
        next(error)
    }
})

router.put('/' , (req, res, next) => {
    res.send("soy put /dogs")
})

router.delete('/' , (req, res, next) => {
    res.send("soy delete /dogs")
})

module.exports = router;