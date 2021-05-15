import {Restaurante} from './restaurante'
export interface Mesa {
    idMesa: number;
    nombre: string;
    idRestaurante: Restaurante;
    posicionX: number;
    posicionY: number;
    planta: number;
    capacidadComensales: number;
}