import  jwt  from "jsonwebtoken";
import Usuario from "../models/usuario.js";

const checkAuth = async(req, res, next) => {

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            console.log(token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v")

            return next()
        } catch (error) {
            return res.status(404).json({mns: 'Hubo un error'})
        }
    }

    if(!token) {
        const error = new Error('Token no válido')
        res.status(401).json({mns: error.message})
    }

    next()
}

export default checkAuth