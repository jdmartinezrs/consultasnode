import {connection} from "../db/connection.js";

//5. Devuelve un listado con el nombre y los apellidos de los comerciales que tienen una comisiÃ³n entre 0.05 y 0.11.

export const getAllnamesFromComercialWhitCommission = async()=>{
    let [result] = await connection.query(`select nombre, apellido1, apellido2 from comercial where comision > 0.05 and comision < 0.11`);
    return result;
}

//6. Devuelve el valor de la comisiÃ³n de mayor valor que existe en la tabla `comercial`.

export const getTheExpensivierCommission = async()=>{
    let [result] = await connection.query(`SELECT MAX(comision) FROM comercial`);
    return result;
}

//10. Devuelve un listado con los nombres de los comerciales que terminan por `el` o `o`. Tenga en cuenta que se deberÃ¡n eliminar los nombres repetidos.

export const getAllNamesThatFinishesInOOrEl = async()=>{
    let [result] = await connection.query(`    SELECT nombre FROM comercial WHERE nombre LIKE '%el' OR '%o'`);
    return result;
}

//16. Devuelve el nombre y los apellidos de todos los comerciales que ha participado en algÃºn pedido realizado por `MarÃ­a Santana Moreno`.

export const getAllComercialsInfoDoneByMariaSantanaMoreno = async()=>{
    let [result] = await connection.query(`SELECT co.apellido1, co.nombre, co.apellido2 FROM comercial co INNER JOIN pedido p ON p.id_comercial = co.id INNER JOIN cliente cl ON cl.id = p.id_cliente WHERE concat(cl.nombre, ' ',cl.apellido1, ' ',cl.apellido2) = 'Maria Santana Moreno'`);
    return result;
}

//19.Devuelve un listado con **todos los comerciales** junto con los datos de los pedidos que han realizado. Este listado tambiÃ©n debe incluir los comerciales que no han realizado ningÃºn pedido. El listado debe estar ordenado alfabÃ©ticamente por el primer apellido, segundo apellido y nombre de los comerciales.

export const getAllComercialsWithOrdersInfoAndComercialsHaveNotOrdered = async()=>{
    let [result] = await connection.query(` SELECT co.id, concat(co.apellido1, " " ,co.apellido2, " ", co.nombre) as namefull, pe.total, pe.fecha, pe.id_cliente FROM comercial co left JOIN pedido pe ON pe.id_comercial = co.id ORDER BY namefull LIKE 'A%' ASC , namefull`);
    return result;
}

//21.Devuelve un listado que solamente muestre los comerciales que no han realizado ningÃºn pedido

export const getAllComercialsHaveNotOrdered = async()=>{
    let [result] = await connection.query(` SELECT DISTINCT c.id,c.nombre, CONCAT(c.apellido1,' ',c.apellido2) AS apellido FROM comercial AS c LEFT JOIN pedido AS p ON c.id=p.id_comercial WHERE p.id_comercial IS NULL GROUP BY c.id `);
    return result;
}

//25.Calcula el nÃºmero total de comerciales distintos que aparecen en la tabla `pedido`.

export const getAllDistinctComercialesTotalNumber = async()=>{
    let [result] = await connection.query(` SELECT COUNT(DISTINCT id_comercial) AS 'total_comerciales' FROM pedido `);
    return result;
}

//39.Devuelve un listado de los comerciales que no han realizado ningÃºn pedido. (Utilizando `IN` o `NOT IN`)

export const getAllHaveNotOrdered = async()=>{
    let [result] = await connection.query(`SELECT nombre AS no_realizaron_pedido FROM comercial WHERE id NOT IN(SELECT id_comercial FROM pedido) `);
    return result;
}


