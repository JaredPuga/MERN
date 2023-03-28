import mongoose from "mongoose";

const proyectosScheema = mongoose.Schema({
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
    fechaEntrega: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    cliente: {
        type: String,
        trim: true,
        required: true,
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    colaboradores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
        },
    ],
}, {
    timestamps: true, //CreatedAt, UpdatedAt
   }
);

const Proyecto = mongoose.model("Proyecto", proyectosScheema)

export default Proyecto