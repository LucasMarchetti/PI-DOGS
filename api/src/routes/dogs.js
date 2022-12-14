const { Router } = require('express')
const { Op } = require('sequelize')
const axios = require('axios')
const { Dog, Temperament } = require('../db')
const router = Router()
require('dotenv').config(); //Permite usar las variables de entorno 
const {
    API_KEY
  } = process.env;


router.get('/' , (req, res, next) => { // /api/dogs?q=name || /api/dogs/
    
    const name = req.query.q
    let dogPromiseApi
    let dogPromiseDb

    try {
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
            dogPromiseApi = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
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
        .catch(() => {
            {"No se encuentran "}
        })
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/id/:id', async (req, res, next) => {
    try {
        let { id } = req.params
        let dog

        if(typeof id === 'string' && id.length > 5) { // es de la base de datos
            dog = await Dog.findByPk(id)
            res.send(dog)
        } else { // es de la API
            // `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
            // const response = await axios.get('https://api.thedogapi.com/v1/breeds/' + id)
            const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)

            const r = response.data
            dog = {
                id: r.id,
                name: r.name,
                weight: r.weight.metric,
                height: r.height.metric,
                life_span: r.life_span,
                image: `https://cdn2.thedogapi.com/images/${r.reference_image_id}.jpg`,
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

router.post('/create' , async (req, res, next) => { // /api/dogs/*
    let temperamentos

    let { name, height, weight, life_span, temperament, temperaments } = req.body

    if(temperaments.length > 1) {
       temperamentos = temperaments.join(", ")
    } else {
        temperamentos = temperaments.join()
    }

    if(!temperament) {
        res.send("ERROR /CREATE BACK")
    }
    try {
    const newDog = await Dog.create({
        name,
        height,
        weight,
        life_span,
        temperament: temperamentos,
    })
    await newDog.addTemperament(temperament)
    res.status(200).send(newDog)
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

module.exports = router
