import mongoose from 'mongoose'
import Proyecto from '../models/proyecto.js'

const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario) //

    res.json(proyectos)
}

const obtenerProyecto = async (req, res) => {
    const { id } = req.params

    const valid = mongoose.isValidObjectId(id)

    if (!valid) {
        const error = new Error('No encontrado');
        return res.status(403).json({mns: error.message})
    }

    const proyecto = await Proyecto.findById(id)


    if(!proyecto) {
        const error = new Error('No encontrado');
        return res.status(403).json({mns: error.message})
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no válida');
        return res.status(403).json({mns: error.message})
    }

    res.json(proyecto)

}

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error);
    }
}

const editarProyecto = async (req, res) => {
    const { id } = req.params

    const valid = mongoose.isValidObjectId(id)

    if (!valid) {
        const error = new Error('No encontrado');
        return res.status(403).json({mns: error.message})
    }

    const proyecto = await Proyecto.findById(id)


    if(!proyecto) {
        const error = new Error('No encontrado');
        return res.status(403).json({mns: error.message})
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no válida');
        return res.status(403).json({mns: error.message})
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion
    proyecto.fecha = req.body.fecha || proyecto.fecha 
    proyecto.cliente = req.body.cliente || proyecto.cliente

    try {
        const proyectoAlmacenado = await proyecto.save()
        return res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error);
    }
}

const eliminarProyecto = async (req, res) => {
    const { id } = req.params

    const valid = mongoose.isValidObjectId(id)

    if (!valid) {
        const error = new Error('No encontrado');
        return res.status(403).json({mns: error.message})
    }

    const proyecto = await Proyecto.findById(id)


    if(!proyecto) {
        const error = new Error('No encontrado');
        return res.status(403).json({mns: error.message})
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no válida');
        return res.status(403).json({mns: error.message})
    }

    try {
        await proyecto.deleteOne();
        res.json({mng: "Proyecto eliminado"})
    } catch (error) {
        console.log(error);
    }
}

const agregarColaborador = async (req, res) => {

}

const eliminarColaborador = async (req, res) => {

}

const obtenerTareas = (req, res) => {

}

export {
    obtenerProyectos,
    obtenerProyecto,
    obtenerTareas,
    nuevoProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
}