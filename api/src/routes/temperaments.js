const { Router } = require('express')
const { Temperament } = require('../db')
const router = Router();

router.get('/' , async (req, res, next) => {

    try {
        let temp = await Temperament.findAll({
            order: [['name', 'asc']]
        })

        if (temp) {
            res.json(temp)
        } else {
            res.json('Not found')
        }

    } catch (error) {
        next(error)
    }
})

router.post('/' , async (req, res, next) => {
    try {
        const { name } = req.body
        const newTemperament = await Temperament.create({
            name
        })
        res.status(200).send(newTemperament)
    } catch (error) {
        next(error)
    }
})

router.put('/' , (req, res, next) => {
    res.send("soy put /temperaments")
})

router.delete('/' , (req, res, next) => {
    res.send("soy delete /temperaments")
})

module.exports = router;
