import express from 'express'
import {
    obtenerProyectos,
    obtenerProyecto,
    obtenerTareas,
    nuevoProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
} from '../controllers/proyectoController.js'
import checkAuth from '../middleware/checkAuth.js' //Esto es porque el usuario tiene que estar

const router = express.Router();


/*
router.get('/', checkAuth, obtenerProyectos)   ///api/proyectos
router.post('/', checkAuth, nuevoProyecto) Esto es lo mismo que lo de abajo */

router
    .route('/')
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyecto)
    
router
    .route('/:id')
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth, editarProyecto)
    .delete(checkAuth, eliminarProyecto)

router.get('/tareas/:id', checkAuth, obtenerTareas)
router.post('/agregar-colaborador/:id',checkAuth, agregarColaborador)
router.post('/eliminar-colaborador/:id',checkAuth, eliminarColaborador)

export default router