import mongoose from 'mongoose';
import Proyecto from '../models/proyecto.js'
import Tarea from '../models/tareas.js'

const agregarTarea = async(req, res) => {
    const {proyecto} = req.body

    const valid = mongoose.Types.ObjectId.isValid(proyecto)

    if (!valid) {
        const error = new Error('Proyecto no encontrado');
        return res.status(403).json({mns: error.message})
    }

    const existeProyecto = await Proyecto.findById(proyecto)

    if(!existeProyecto) {
        const error = new Error('Proyecto no encontrado');
        return res.status(403).json({mns: error.message})
    }

    if(existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No tienes los permisos para hacer esta acción');
        return res.status(403).json({mns: error.message})
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body)
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error);
    }
}

const obtenerTarea = async(req, res) => {
    const { id } = req.params

    const valid = mongoose.Types.ObjectId.isValid(id)

    if (!valid) {
        const error = new Error('La tarea no existe');
        return res.status(403).json({mns: error.message})
    }

    const tarea = await Tarea.findById(id).populate("proyecto")
     

    if(!tarea) {
        const error = new Error('No existe la tarea');
        return res.status(404).json({mns: error.message})
    }

    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no válida');
        return res.status(403).json({mns: error.message})
    }

    res.json(tarea)
}

const actualizarTarea = async(req, res) => {

}

const eliminarTarea = async(req, res) => {

}

const cambiarEstado = async(req, res) => {

}

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado,
}