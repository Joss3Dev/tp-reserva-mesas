import {Cliente} from './cliente'
import {Mesa} from './mesa'
import {Restaurante} from './restaurante'

export interface Reserva {
    idReserva: number;
    idRestaurante: Restaurante;
    idMesa: Mesa;
    fecha: string;
    hora: string;
    idCliente: Cliente;
    cantidad_sillas: number;
}