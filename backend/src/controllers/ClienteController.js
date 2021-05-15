import Cliente from '../models/Cliente.js';

const crearCliente = async (req, res) => {
    try {
        let cliente = req.body;
        let nuevoCliente = await Cliente.create(cliente,{
            fields: ["cedula", "nombre", "apellido"]
        });
        if (nuevoCliente){
            return res.status(200).json({
                mensaje: "Cliente creado con exito",
                dato: nuevoCliente
            });
        }
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Ha ocurrido un error para crear un cliente"
        });
    }
}

const obtenerClientes = async(req, res) => {
    try {
        let clientes = await Cliente.findAll();
        return res.json({
            data: clientes
        });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            mensaje: "Error al traer la lista de clientes"
        });
    }
}

export { crearCliente, obtenerClientes }