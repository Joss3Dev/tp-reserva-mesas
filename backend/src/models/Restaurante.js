import Sequelize from 'sequelize';
import sequelize from '../config/conexion';
import Mesa from './Mesa';
import Reserva from './Reserva';

const Restaurante = sequelize.define('restaurante',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.TEXT
    }, 
    direccion: {
        type: Sequelize.TEXT
    }, 
    max_X: {
        type: Sequelize.INTEGER
    }, 
    max_Y:{
        type: Sequelize.INTEGER
    } 
});

//Establecemos relacion 1 a N
Restaurante.hasMany(Mesa, { foreingKey: 'id_restaurante', sourceKey: 'id'})

//Varias mesas coresponde a un solo restaurante N a 1
Mesa.belongsTo(Restaurante, { foreingKey: 'id_restaurante', sourceKey: 'id'});

//Un restaurante tiene muchas reservas 1 a N
Restaurante.hasMany(Reserva, { foreingKey: 'id_restaurante', sourceKey: 'id'});

//Muchas reservas corresponden a un solo restaurante N a 1
Reserva.belongsTo(Restaurante, { foreingKey: 'id_restaurante', sourceKey: 'id'});

export default Restaurante;