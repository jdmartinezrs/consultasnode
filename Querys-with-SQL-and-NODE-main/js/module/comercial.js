import {connection} from "../../db/connection.js";

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

