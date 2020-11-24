const User = require('../Models/User')

const getAllCadetes = async (req, res, next) => {
    try {
        const users = await User.findAll({ where: { role: "Cadete" } });
        return res.send(users)
    } catch (e) { console.log(e); return res.status(503).end() }
}

const getAllEmpresas = async (req, res, next) => {
    try {
        const users = await User.findAll({ where: { role: "Empresa" } });
        return res.send(users)
    } catch (e) { console.log(e); return res.status(503).end() }
}

const acceptById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const [changes, modified] = await User.update({ accepted: true }, {
            where: {
                id
            },
            returning: true,
            plain: true
        });
        console.log(changes, modified)
        return res.send(modified)
    }
    catch (e) { console.log(e); return res.status(503).end() }

}
module.exports = { getAllCadetes, getAllEmpresas, acceptById }