import Router from 'express';
import {crearMesa, listarMesas, eliminarMesa, actualizarMesa } from '../controllers/MesaController.js';
const router = Router();

// /api/mesa
router.post('/', crearMesa);
router.put('/:id', actualizarMesa);
router.delete('/:id', eliminarMesa);
router.get('/', listarMesas);


export default router;