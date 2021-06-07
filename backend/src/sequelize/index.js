import Cliente from "./models/Cliente.js";
import Mesa from "./models/Mesa.js";
import Reserva from "./models/Reserva.js";
import Restaurante from "./models/Restaurante.js";
import Categoria from "./models/Categoria.js";
import Producto from "./models/Producto.js";


//Establecemos relacion 1 a N
Restaurante.hasMany(Mesa, { foreingKey: 'id_restaurante', sourceKey: 'id'})

//Varias mesas coresponde a un solo restaurante N a 1
Mesa.belongsTo(Restaurante, { foreingKey: 'id_restaurante', sourceKey: 'id'});

//Un restaurante tiene muchas reservas 1 a N
Restaurante.hasMany(Reserva, { foreingKey: 'id_restaurante', sourceKey: 'id'});

//Muchas reservas corresponden a un solo restaurante N a 1
Reserva.belongsTo(Restaurante, { foreingKey: 'id_restaurante', sourceKey: 'id'});

//Una misma mesa puede ser reservada varias veces es decir 1 a N
Mesa.hasMany(Reserva, { foreingKey: 'id_mesa', sourceKey: 'id'});

//Varias reservas en diferentes horarios pueden pertenecer a una misma mesa, es decir N a 1
Reserva.belongsTo(Mesa, { foreingKey: 'id_mesa', sourceKey: 'id'});

//Un cliente puede hacer varias reservas 1 a N
Cliente.hasMany(Reserva, { foreingKey: 'id_cliente', sourceKey: 'id'});

// Y varias reservas corresponden a un cliente N a 1
Reserva.belongsTo(Cliente, { foreingKey: 'id_cliente', sourceKey: 'id'})

//Establecemos relacion 1 a N
Categoria.hasMany(Producto, { foreingKey: 'id_categoria', sourceKey: 'id'})

//Varios productos coresponde a una sola categoria N a 1
Producto.belongsTo(Categoria, { foreingKey: 'id_categoria', sourceKey: 'id'});

export { Restaurante};
export {Mesa};
export { Cliente };
export {Reserva };
export {Categoria};
export {Producto};
