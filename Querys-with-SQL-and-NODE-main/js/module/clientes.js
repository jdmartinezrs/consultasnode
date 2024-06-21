import {connection} from "../../db/connection.js";

//3. Devuelve un listado con los identificadores de los clientes que han realizado algÃºn pedido. Tenga en cuenta que no debe mostrar identificadores que estÃ©n repetidos.

export const getAllCLientsThatDontOrder = async()=>{
    let [result] = await connection.query(`SELECT DISTINCT id_cliente FROM pedido`);
    return result;
}

//7. Devuelve el identificador, nombre y primer apellido de aquellos clientes cuyo segundo apellido **no** es `NULL`. El listado deberÃ¡ estar ordenado alfabÃ©ticamente por apellidos y nombre.

export const getAllClientsInfoWhereNotNull = async()=>{
    let [result] = await connection.query(` SELECT id, CONCAT(nombre,' ', apellido1) AS nombre_completo  FROM cliente WHERE apellido2 IS NOT NULL ORDER BY nombre ASC, apellido1 ASC, apellido2 ASC`);
    return result;
}

//8. Devuelve un listado de los nombres de los clientes que empiezan por `A` y terminan por `n` y tambiÃ©n los nombres que empiezan por `P`. El listado deberÃ¡ estar ordenado alfabÃ©ticamente.

export const getAllClientsNamesThatStartAndFinishes = async()=>{
    let [result] = await connection.query(` select nombre from cliente where nombre like '%n' and nombre like 'a%' or nombre like 'p%' order by nombre asc`);
    return result;
}

//9. Devuelve un listado de los nombres de los clientes que **no** empiezan por `A`. El listado deberÃ¡ estar ordenado alfabÃ©ticamente.

export const getAllClientsNamesThatDoesntStartsWhitA = async()=>{
    let [result] = await connection.query(` SELECT nombre
   FROM cliente WHERE nombre NOT LIKE 'A%'ORDER BY nombre`);
    return result;
}