import {connection} from "../../db/connection.js";

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
