let sessionMap = require('./session');

//salad list -> get from user id

const addToSaladList = function(username,saladID,saladItems){
  //console.log("sessionMap " + JSON.stringify(sessionMap.details.info));
  let currSaladList = sessionMap.users[username];
  const price = getTotalPrice(saladItems);
  currSaladList = Object.assign({ [saladID]: {saladItems:saladItems, id:saladID, price:price}}, currSaladList);
  sessionMap.users[username] = currSaladList;
  return currSaladList;
}

const getTotalPrice = function(salad){
    return 1.25 * salad.length;
}

const util = {
  addToSaladList
}

module.exports = util;
