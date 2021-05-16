import {Mesa, Reserva} from '../sequelize/index.js';

const crearReserva = async (req, res) => {
    try {
        let reserva = req.body;
        let mesa = await Mesa.findOne({ attributes: ["id","nombre_mesa", "pos_x", "pos_y", "nro_piso", "id_restaurante","capacidad"],
        where: { id: reserva.id_mesa } });
        if(mesa.capacidad<reserva.cantidad_solicitada){
            return res.status(500).json({
                mensaje: "La cantidad solicitada sobrepasa la capacidad de la mesa"
            });
        }
        let nuevoReserva = await Reserva.create(reserva,{
            fields: ["id_restaurante", "id_mesa", "fecha", "rango_hora", "id_cliente","cantidad_solicitada"],
            returning: ["id","id_restaurante", "id_mesa", "fecha", "rango_hora", "id_cliente","cantidad_solicitada"]
        });
        if (nuevoReserva){
            return res.status(200).json({
                mensaje: "Reserva creado con exito",
                dato: nuevoReserva
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error para crear una nueva reserva"
        });
    }
}

const listarReserva = async(req, res) => {
    try {
        const { idRestaurante, fecha, idCliente } = req.params;
        let reservas;
        if(!idCliente){
            reservas = await Reserva.findAll({
                attributes: ["id","id_restaurante", "id_mesa", "fecha", "rango_hora", "id_cliente","cantidad_solicitada"],
                where: {
                    id_restaurante: idRestaurante,
                    fecha: fecha
                }
            });
        }
        else{
            reservas = await Reserva.findAll({
                attributes: ["id","id_restaurante", "id_mesa", "fecha", "rango_hora", "id_cliente","cantidad_solicitada"],
                where: {
                    id_restaurante: idRestaurante,
                    fecha: fecha,
                    id_cliente: idCliente
                }
            });
        }
        return res.json({
            data: reservas
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer la lista de reserva"
        });
    }
}

export { crearReserva, listarReserva };