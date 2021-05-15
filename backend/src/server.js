import express from 'express';
import clienteRoute from './routes/Cliente.route.js';
import restauranteRoute from './routes/Restaurante.route.js';
import mesaRoute from './routes/Mesa.route.js';

const initApp = express();

//Establecer Formato json
initApp.use(express.json());

//Rutas
initApp.use('/api/cliente', clienteRoute);
initApp.use('/api/restaurante', restauranteRoute);
initApp.use('/api/mesa', mesaRoute);

export default initApp;

