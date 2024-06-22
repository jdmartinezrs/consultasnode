import {connection} from "../db/connection.js";

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

//11. Devuelve un listado con el identificador, nombre y los apellidos de todos los clientes que han realizado algÃºn pedido. El listado debe estar ordenado alfabÃ©ticamente y se deben eliminar los elementos repetidos.

export const getAllClientsInfoThatOrdered = async()=>{
    let [result] = await connection.query(` SELECT DISTINCT c.nombre, p.id_cliente FROM cliente c INNER JOIN pedido p ON c.id=p.id_cliente ORDER BY c.nombre`);
    return result;
}

//14. Devuelve un listado que muestre todos los clientes, con todos los pedidos que han realizado y con los datos de los comerciales asociados a cada pedido.

export const getAllClientsOrdersAndAssociatesComercials = async()=>{
    let [result] = await connection.query(` SELECT c.id AS cliente_id, p.id AS pedido_id, co.id AS comercial_id, co.nombre, co.apellido1 FROM cliente AS c INNER JOIN pedido AS p ON c.id = p.id_cliente INNER JOIN comercial AS co ON p.id_comercial = co.id ORDER BY c.id`);
    return result;
}

//15.Devuelve un listado de todos los clientes que realizaron un pedido durante el aÃ±o `2017`, cuya cantidad estÃ© entre `300` â‚¬ y `1000` â

export const getAllClientsThatOrderedIn2017 = async()=>{
    let [result] = await connection.query(` SELECT DISTINCT cliente.nombre, cliente.apellido1, cliente.apellido2 FROM cliente JOIN pedido ON cliente.id = pedido.id_cliente WHERE YEAR(pedido.fecha) = 2017   AND pedido.total BETWEEN 300 AND 1000`);
    return result;
}

//17.Devuelve el nombre de todos los clientes que han realizado algÃºn pedido con el comercial `Daniel SÃ¡ez Vega`

export const getAllClientNamesHaveOrderedWithComercialDanielVega = async()=>{
    let [result] = await connection.query(`SELECT DISTINCT c.nombre, p.id_cliente FROM cliente c INNER JOIN pedido p ON c.id=p.id_cliente ORDER BY c.nombre`);
    return result;
}

//18.Devuelve un listado con **todos los clientes** junto con los datos de los pedidos que han realizado. Este listado tambiÃ©n debe incluir los clientes que no han realizado ningÃºn pedido. El listado debe estar ordenado alfabÃ©ticamente por el primer apellido, segundo apellido y nombre de los clientes

export const getAllClientInfoAboutOrdersAndClientsThatHaveNoOrdered = async()=>{
    let [result] = await connection.query(`select c.nombre,c.apellido1,c.apellido2, p.id_cliente from cliente c LEFT JOIN pedido p ON c.id=p.id_cliente ORDER BY c.nombre,c.apellido1,c.apellido2`);
    return result;
}

//20. Devuelve un listado que solamente muestre los clientes que no han realizado ningÃºn pedido.

export const getAllClientThatHaveNoOrdered = async()=>{
    let [result] = await connection.query(`SELECT c.nombre,c.apellido1,c.apellido2, p.id_cliente FROM cliente c LEFT JOIN pedido p ON c.id=p.id_cliente WHERE id_cliente IS NULL ORDER BY c.nombre,c.apellido1,c.apellido2`);
    return result;
}

//22.Devuelve un listado con los clientes que no han realizado ningÃºn pedido y de los comerciales que no han participado en ningÃºn pedido. Ordene el listado alfabÃ©ticamente por los apellidos y el nombre. En en listado deberÃ¡ diferenciar de algÃºn modo los clientes y los comerciales



//26.Calcula el nÃºmero total de clientes distintos que aparecen en la tabla `pedido`.

export const getAllDistinctClientsThatAppearInOrderTable = async()=>{
    let [result] = await connection.query(`SELECT COUNT(total) AS promediopedidos  FROM pedido`);
    return result;
}

//29.Calcula cuÃ¡l es el valor mÃ¡ximo de categorÃ­a para cada una de las ciudades que aparece en la tabla `cliente`

export const getTheMaxValueForEachCityInClientTable = async()=>{
    let [result] = await connection.query(`select distinct(ciudad), max(categoria) from cliente group by ciudad`);
    return result;
}

//33.Devuelve un listado con el identificador de cliente, nombre y apellidos y el nÃºmero total de pedidos que ha realizado cada uno de clientes. Tenga en cuenta que pueden existir clientes que no han realizado ningÃºn pedido. Estos clientes tambiÃ©n deben aparecer en el listado indicando que el nÃºmero de pedidos realizados es `0`

export const getTheMaxIdClientInfoAndOrderTotal = async()=>{
    let [result] = await connection.query(`SELECT cliente.id, cliente.apellido1, cliente.apellido2, COUNT(pedido.id)
    FROM cliente
    LEFT JOIN pedido ON cliente.id=pedido.id_cliente
    GROUP BY cliente.id`);
    return result;
}

//34.Devuelve un listado con el identificador de cliente, nombre y apellidos y el nÃºmero total de pedidos que ha realizado cada uno de clientes **durante el aÃ±o 2017

export const getAllInfoFRomClientThatOrderedIn2017 = async()=>{
    let [result] = await connection.query(`select cliente.id, cliente.nombre, cliente.apellido1, cliente.apellido2, count(pedido.id) as cantidad2017 from cliente inner join pedido on pedido.id_cliente = cliente.id where year(pedido.fecha) = 2017 group by cliente.id`);
    return result;
}

//35.Devuelve un listado que muestre el identificador de cliente, nombre, primer apellido y el valor de la mÃ¡xima cantidad del pedido realizado por cada uno de los clientes. El resultado debe mostrar aquellos clientes que no han realizado ningÃºn pedido indicando que la mÃ¡xima cantidad de sus pedidos realizados es `0`. Puede hacer uso de la funciÃ³n [`IFNULL`]

export const getClientInfoInOrdersUsinfIfNull = async()=>{
    let [result] = await connection.query(`SELECT C.id, C.nombre, C.apellido1, IFNULL(max(P.total), 0) AS 'Cantidad maxima'
    FROM cliente AS C
    LEFT JOIN pedido as P
    ON C.id = P.id_cliente
    GROUP BY C.id`);
    return result;
}

//38. Devuelve un listado de los clientes que no han realizado ningÃºn pedido. (Utilizando `IN` o `NOT IN`)

export const getAllClientsThatHaveNotPayed = async()=>{
    let [result] = await connection.query(`SELECT nombre AS no_realizaron_pedido  FROM cliente WHERE id NOT IN (SELECT id_cliente FROM pedido)`);
    return result;
}









