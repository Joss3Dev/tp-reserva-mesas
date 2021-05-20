
create database db_reserva_de_mesas;

\connect db_reserva_de_mesas

create table restaurante(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    nombre text not null,
    direccion text not null,
    max_X integer not null,
    max_Y integer not null
);

create table mesa(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    nombre_mesa text not null,
    id_restaurante integer not null,
    pos_x integer not null,
    pos_y integer not null,
    nro_piso integer not null,
    capacidad integer not null,
    CONSTRAINT posicion_unica UNIQUE (pos_x, pos_y, nro_piso)
);


alter table mesa add constraint id_restaurante_fk_me foreign key(id_restaurante) references restaurante(id);

create table cliente(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    cedula integer not null unique,
    nombre text not null,
    apellido text not null
);

create table reserva(
    id integer primary key not null GENERATED ALWAYS AS IDENTITY,
    id_restaurante integer not null,
    id_mesa integer not null,
    fecha date not null,
    rango_hora text not null,
    id_cliente integer not null,
    cantidad_solicitada integer not null
);

alter table reserva add constraint id_restaurante_fk_res foreign key(id_restaurante) references restaurante(id);
alter table reserva add constraint id_mesa_fk foreign key(id_mesa) references mesa(id);
alter table reserva add constraint id_cliente_fk foreign key(id_cliente) references cliente(id);

