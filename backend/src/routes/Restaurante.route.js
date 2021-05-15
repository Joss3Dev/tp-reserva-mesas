import Router from 'express';
import { crearRestaurante, listarRestaurantes, eliminarRestaurante, actualizarRestaurante } from '../controllers/RestauranteController.js';
const router = Router();

// /api/restaurante
router.post('/', crearRestaurante);
router.put('/:id', actualizarRestaurante);
router.delete('/:id', eliminarRestaurante);
router.get('/', listarRestaurantes);

export default router;