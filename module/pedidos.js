import {connection} from "../db/connection.js";

//1. Devuelve un listado con todos los pedidos que se han realizado. Los pedidos deben estar ordenados por la fecha de realizaciÃ³n, mostrando en primer lugar los pedidos mÃ¡s recientes.

export const getAllOrdersOrderByTheMostRecent = async()=>{
    let [result] = await connection.query(`SELECT fecha FROM pedido ORDER BY fecha DESC`);
    return result;
}

//2. Devuelve todos los datos de los dos pedidos de mayor valor.

export const getTheTwoMostExpensivesOrders = async()=>{
    let [result] = await connection.query(`SELECT * FROM pedido ORDER BY total DESC LIMIT 2`);
    return result;
}

//4. Devuelve un listado de todos los pedidos que se realizaron durante el aÃ±o 2017, cuya cantidad total sea superior a 500â‚¬

export const getAllOrdersFrom2017 = async()=>{
    let [result] = await connection.query(`SELECT YEAR(fecha), total  FROM pedido WHERE YEAR( fecha)  =
   2017  AND total > 500`);
    return result;
}

//12. Devuelve un listado que muestre todos los pedidos que ha realizado cada cliente. El resultado debe mostrar todos los datos de los pedidos y del cliente. El listado debe mostrar los datos de los clientes ordenados alfabÃ©ticamente.

export const getAllOrdersByEachClient = async()=>{
    let [result] = await connection.query(`  select  c.id, c.nombre, c.apellido1, c.apellido2, c.ciudad, c.categoria, p.id, p.total, p.fecha, p.id_cliente, p.id_comercial from cliente c inner join pedido p on c.id = p.id_cliente order by c.nombre asc, c.apellido1 asc`);
    return result;
}

//13.Devuelve un listado que muestre todos los pedidos en los que ha participado un comercial. El resultado debe mostrar todos los datos de los pedidos y de los comerciales. El listado debe mostrar los datos de los comerciales ordenados alfabÃ©ticamente.

export const getAllOrdersByEachComercial = async()=>{
    let [result] = await connection.query(`SELECT p.id, p.total, p.fecha, p.id_cliente, p.id_comercial, cl.nombre, cl.apellido1, cl.apellido2, cl.comision FROM pedido AS p INNER JOIN comercial AS cl ON cl.id = p.id_comercial ORDER BY nombre `);
    return result;
}

//23.Calcula la cantidad total que suman todos los pedidos que aparecen en la tabla `pedido`.

export const getOrdersTotal = async()=>{
    let [result] = await connection.query(`SELECT SUM(total) AS totalpedidos  FROM pedido`);
    return result;
}

//24.Calcula la cantidad media de todos los pedidos que aparecen en la tabla `pedido`

export const getOrdersAverageFromPedidos = async()=>{
    let [result] = await connection.query(`SELECT COUNT(DISTINCT id_comercial) AS 'total_comerciales' FROM pedido`);
    return result;
}

//27.Calcula cuÃ¡l es la mayor cantidad que aparece en la tabla `pedido

export const getMaxQuantityInOrderTable = async()=>{
    let [result] = await connection.query(` SELECT MAX(total) FROM pedido`);
    return result;
}

//28.Calcula cuÃ¡l es la menor cantidad que aparece en la tabla `pedido`

export const getMinQuantityInOrderTable = async()=>{
    let [result] = await connection.query(` SELECT MIN(total) FROM pedido`);
    return result;
}

//30.Calcula cuÃ¡l es el mÃ¡ximo valor de los pedidos realizados durante el mismo dÃ­a para cada uno de los clientes. Es decir, el mismo cliente puede haber realizado varios pedidos de diferentes cantidades el mismo dÃ­a. Se pide que se calcule cuÃ¡l es el pedido de mÃ¡ximo valor para cada uno de los dÃ­as en los que un cliente ha realizado un pedido. Muestra el identificador del cliente, nombre, apellidos, la fecha y el valor de la cantidad.

export const getMaxValueInADayForEachClient = async()=>{
    let [result] = await connection.query(` SELECT t1.id, t1.nombre, t1.apellido1, MAX(t2.total), t2.fecha FROM cliente t1, pedido t2 
   WHERE t2.id_cliente = t1.id GROUP BY t2.fecha, t1.id ORDER BY t2.fecha`);
    return result;
}

//31.Calcula cuÃ¡l es el mÃ¡ximo valor de los pedidos realizados durante el mismo dÃ­a para cada uno de los clientes, teniendo en cuenta que sÃ³lo queremos mostrar aquellos pedidos que superen la cantidad de 2000

export const getMaxValueInOrdersInADayThatAreHighierThan2000 = async()=>{
    let [result] = await connection.query(` SELECT p.*
      FROM pedido p
      INNER JOIN (
          SELECT id_cliente, fecha, MAX(total) AS max_total
          FROM pedido
          WHERE total > 2000
          GROUP BY id_cliente, fecha
      ) po ON p.id_cliente = po.id_cliente AND p.fecha = po.fecha AND p.total = po.max_total `);
    return result;
}

//32.Calcula el mÃ¡ximo valor de los pedidos realizados para cada uno de los comerciales durante la fecha `2016-08-17`. Muestra el identificador del comercial, nombre, apellidos y total

export const getMaxValueInOrdersForEachComercialInDate = async()=>{
    let [result] = await connection.query(`SELECT p.id 'id_pedido'
    , c.id 'id_comercial', concat(c.nombre ,'  ', c.apellido1) 'Comercial', max(p.total) 'Max Value' From comercial  c INNER JOIN pedido p ON c.id= p.id_comercial WHERE fecha='2016-08-17' GROUP BY p.id , c.nombre , c.apellido1 `);
    return result;
}

//36.Devuelve cuÃ¡l ha sido el pedido de mÃ¡ximo valor que se ha realizado cada aÃ±o.

export const getMaxValueOrderForYear = async()=>{
    let [result] = await connection.query(`SELECT 
        pedidos.id,
        YEAR(pedidos.fecha) AS Año,
        pedidos.total AS 'Maximo Valor',
        pedidos.fecha AS 'Fecha Completa',
        pedidos.id_cliente AS 'ID Cliente',
        pedidos.id_comercial AS 'ID Comercial'
        FROM 
        pedido pedidos JOIN (
          SELECT
          YEAR(fecha) AS Año,
          max(total) AS Valor_Maximo
          FROM 
          pedido
          GROUP BY 
          año 
          ORDER BY 
          año) 
       AS max_ped_por_año 
       ON Año = max_ped_por_año.Año 
       AND pedidos.total = max_ped_por_año.Valor_Maximo `);
    return result;
}

//37.Devuelve el nÃºmero total de pedidos que se han realizado cada aÃ±o.

export const getAllOrdersForEachYear = async()=>{
    let [result] = await connection.query(` SELECT YEAR(fecha) AS año, COUNT(*) AS numero_pedido FROM pedido GROUP BY YEAR(fecha) ORDER BY año;`);
    return result;
}





