import express from 'express';
import clienteRoute from './routes/Cliente.route.js';
import restauranteRoute from './routes/Restaurante.route.js';
import mesaRoute from './routes/Mesa.route.js';
import reservaRoute from './routes/Reserva.route.js';
import cors from 'cors';
const initApp = express();

//habilitar cors angular
initApp.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }));

//Establecer Formato json
initApp.use(express.json());

//Rutas
initApp.use('/api/cliente', clienteRoute);
initApp.use('/api/restaurante', restauranteRoute);
initApp.use('/api/mesa', mesaRoute);
initApp.use('/api/reserva', reservaRoute);

export default initApp;

