import mongoose from "mongoose";

const tareaScheema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    descripcion: {
        type: String,
        trim: true,
        required: true,
    },
    estado: {
        type: Boolean,
        default: false,
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now()
    },
    prioridad: {
        type: String,
        required: true,
        enum: ['Baja', 'Media', 'Alta']
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    },
}, {
    timestamps: true
});

const tarea = mongoose.model('Tarea', tareaScheema)

export default tarea