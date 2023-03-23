import Usuario from "../models/usuario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";

const registrar = async(req, res) => {
    
    //Evitar registros duplicados

    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ mns: error.message })
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId()
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)

    } catch (error) {
        console.log(error);
    }

}

const autenticar = async(req, res) => {

    const {email, password} = req.body;

    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})

    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({mns: error.message})
    }
    //Comprobar si el usuario está confirmado
    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({mns: error.message})
    }

    //Comprobar su password
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),
        })
    } else {
        const error = new Error('El password es incorrecto');
        return res.status(403).json({mns: error.message})
    }
}

const confirmar = async(req, res) => {
    const { token } = req.params

    const usuarioConfirmar = await Usuario.findOne({token})
    if(!usuarioConfirmar) {
        const error = new Error('Token no válido');
        return res.status(403).json({mns: error.message})
    }

    try {
        usuarioConfirmar.confirmado = true; //Se confirma al user
        usuarioConfirmar.token = ""; //Eliminar token bcs es de un solo uso
        await usuarioConfirmar.save(); //Se guarda en la bd con estos cambios
        res.status(200).json({mns: 'Usuario confirmado correctamente'})
    } catch (error) {
        console.log(error);
    }
}

const recuperar = async (req, res) => {
    const { email } = req.body; //Extraer de un formulario
    const usuario = await Usuario.findOne({email})

    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({mns: error.message})
    }

    try {
        usuario.token = generarId()
        await usuario.save()
        res.status(200).json({mns: 'Hemos enviado un email con las instrucciones'})
    } catch (error) {
        console.log(error);
    }
}

const confirmarPassword = async(req, res) => {
    const { token } = req.params //Extraer de url 
    const tokenValido = await Usuario.findOne({token})
    
    if(tokenValido) {
        res.status(200).json({mns: 'Token válido, el usuario existe'})
    } else {
        const error = new Error('Token no válido');
        return res.status(404).json({mns: error.message})
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({token})
    
    if(usuario) {
       usuario.password = password
       usuario.token = ""
       try {
        await usuario.save()
        res.status(200).json({mns: 'Password modificado correctamente'})
       } catch (error) {
            console.log(error);
       }
    } else {
        const error = new Error('Token no válido');
        return res.status(404).json({mns: error.message})
    }
}

const perfil = async(req, res) => {
    const { usuario } = req

    res.json(usuario)
}

export {
    registrar,
    autenticar,
    confirmar,
    recuperar,
    confirmarPassword,
    nuevoPassword,
    perfil,
}