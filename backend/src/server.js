import express, { json } from 'express';

const initApp = express();

//Establecer Formato json
initApp.use(json());

//Rutas

export default initApp;

