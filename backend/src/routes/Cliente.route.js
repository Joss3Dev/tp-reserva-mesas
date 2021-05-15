import Router from 'express';
import { crearCliente, obtenerClientes } from '../controllers/ClienteController.js';
const router = Router();

// /api/cliente
router.post('/', crearCliente);
router.get('/', obtenerClientes);


export default router;