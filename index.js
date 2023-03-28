import express from "express";
import dotenv from "dotenv";
import conectarDB from './config/db.js'
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectosRoutes from './routes/proyectoRoutes.js'

const app = express();
app.use(express.json()) //Para utilizar la respuesta json

dotenv.config(); //Para usar el archivo .env

conectarDB();

//Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectosRoutes)


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto: ${PORT}`);
})