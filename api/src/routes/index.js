const { Router } = require('express')
const dogsRoute = require('./dogs')
const temperamentsRoute = require('./temperaments')


const router = Router()

router.use("/dogs", dogsRoute) //  /api/dogs/*
router.use("/temperaments", temperamentsRoute)//  /api/temperaments/*


module.exports = router
