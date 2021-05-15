# tp-reserva-mesas
Un sistema para reservar mesas en restaurantes, implementado con Node.js y Angular 


## Backend 

- Ruta **/api/cliente** 
> POST / -> agregar cliente
```json
{
    "cedula": integer,
    "nombre": string,
    "apellido": string
}
``` 
> GET / -> lista todos los clientes

- Ruta **/api/restaurante**
> POST / -> agregar restaurante
```json
{
    "nombre": string,
    "direccion": string,
    "max_x": integer,
    "max_y": integer
}
``` 
> GET /  -> lista todos los restaurantes

> PUT /id  -> actualizar restaurante
```json
{
    "nombre": string,
    "direccion": string,
    "max_x": integer,
    "max_y": integer
}
``` 

> DELETE /id  -> eliminar restaurante

- Ruta **/api/mesa**
> POST /  -> agregar mesa
```json
{
    "nombre_mesa": string, 
    "pos_x": integer,
    "pos_y": integer, 
    "nro_piso": integer,
    "id_restaurante": integer
}
``` 
> GET / -> lista todas las mesas

> PUT /id  -> actualizar mesa
```json
{
    "nombre_mesa": string, 
    "pos_x": integer,
    "pos_y": integer, 
    "nro_piso": integer
}
``` 

> DELETE /id  -> eliminar mesa


 
