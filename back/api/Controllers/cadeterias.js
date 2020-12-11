const Cadeteria = require("../Models/Cadeteria");
const Order = require("../Models/Order");
const User = require("../Models/User");


const getAcceptedCadeterias = async (req, res, next) => {
    try {
        const cadeterias = await Cadeteria.findAll({
            where: {
            accepted: true
        }})
        res.send(cadeterias)
    }
    catch (e) {
        res.sendStatus(503)
    }
}

const getAllCadeterias = async (req, res, next) => {
    try {
        const cadeterias = await Cadeteria.findAll()
        res.send(cadeterias)
    }
    catch (e) {
        res.sendStatus(503)
    }
}

const createCadeteria = async (req, res, next) => {
    try {
        const cadeteria = await Cadeteria.create(req.body)
        res.status(201).send(cadeteria)
    }
    catch (e) {
        res.sendStatus(503)
    }
}
const getSingleCadeteria = async (req, res, next) => { }
const assignCadeterias = async (req, res, next) => { }


module.exports = { getAcceptedCadeterias, createCadeteria, getSingleCadeteria, assignCadeterias, getAllCadeterias }