import express from 'express'
import { registrar, autenticar, confirmar, recuperar, confirmarPassword, nuevoPassword, perfil } from '../controllers/userController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

//Autenticación, Registro y Confirmación de usuarios
router.post('/', registrar) //Crea un nuevo usuario
router.post('/login', autenticar) //Autenticacion
router.get('/confirmar/:token', confirmar) //Confirmar su cuenta
router.post('/olvide-password', recuperar) //Recuperar contraseña, comprobando email exista y confirmado
router.route('/olvide-password/:token').get(confirmarPassword).post(nuevoPassword) //Confirmar Recuperacion de cuenta  //Para el nuevo password

router.get('/perfil', checkAuth, perfil);

export default router;