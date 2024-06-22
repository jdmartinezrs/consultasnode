
//pedidos 
import{getAllOrdersOrderByTheMostRecent,
    getTheTwoMostExpensivesOrders,
    getOrdersTotal,
    getMaxValueInOrdersInADayThatAreHighierThan2000,
    getMaxValueInADayForEachClient,
    getMaxValueInOrdersForEachComercialInDate,
    getMaxValueOrderForYear,
    getAllOrdersForEachYear
}from"../module/pedidos.js";




//clientes

import{
    getAllClientsInfoWhereNotNull,
    getAllClientsNamesThatDoesntStartsWhitA,
    getAllClientsInfoThatOrdered,
    getAllClientsOrdersAndAssociatesComercials,
    getAllClientsThatOrderedIn2017,
    getAllClientNamesHaveOrderedWithComercialDanielVega,
    getAllClientInfoAboutOrdersAndClientsThatHaveNoOrdered,
    getAllClientThatHaveNoOrdered,
    getAllDistinctClientsThatAppearInOrderTable,
    getTheMaxValueForEachCityInClientTable,
    getTheMaxIdClientInfoAndOrderTotal,
    getAllInfoFRomClientThatOrderedIn2017,
    getClientInfoInOrdersUsinfIfNull,
    getAllClientsThatHaveNotPayed
}from"../module/clientes.js";


//comercials

import{getAllnamesFromComercialWhitCommission,
    getTheExpensivierCommission,
    getAllNamesThatFinishesInOOrEl,
    getAllComercialsInfoDoneByMariaSantanaMoreno,
    getAllComercialsWithOrdersInfoAndComercialsHaveNotOrdered,
    getAllComercialsHaveNotOrdered,
    getAllHaveNotOrdered
}from"../module/comercial.js";

console.log(await  getTheMaxValueForEachCityInClientTable() );












