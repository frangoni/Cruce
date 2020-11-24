const isAdmin = async (req, res, next) => {
    if (req.user && (req.user.role == "Admin")) {
        return next()
    }
    res.status(401).send({ error: "No posee permisos para realizar la accion" })
}

module.exports = isAdmin;