import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, //Correos únicos (Un usuario por correo)
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

usuarioSchema.pre('save', async function(next) {
    if(!this.isModified('password')) { //Al cambiar la
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt) //this Hace referencia al objeto del usuario
})

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password)
}

const usuario = mongoose.model("Usuario", usuarioSchema);

export default usuario