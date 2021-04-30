let sessionMap = require('./sessionMap');
const uuid = require('uuid').v4;
let recipeList = require('./recipes');

const isValidSession = function(username) {
  if(!sessionMap[username]) {
      return -1;
  }
  return sessionMap[username];
};

const validateUsername = function(username) {
  const errors = [];
  const clean = username.replace(/[^A-Za-z0-9_]+/g, '');
  if( clean !== username ) {
    errors.push('username contained disallowed characters');
  }
  if(!username) {
    errors.push('username was empty');
  }

  if(errors.length >0){
    return errors;
  }
  else return null;
};

const addToSessionMap = function(username){
  const sid = uuid();
  sessionMap[username] = sid;
  return username;
}

const addToRecipes = function(name,title,ingredients,directions){
  title = replaceSymbols(title);
  ingredients = replaceSymbols(ingredients);
  directions = replaceSymbols(directions);
  let currRecipes = Object.values(recipeList);
  const recipeID = uuid();
  recipeList = Object.assign({ [recipeID]: {author: name, title:title, ingredients:ingredients, instructions:directions , id:recipeID}}, recipeList);
  return recipeList;
}

const replaceSymbols = function(text){
  text = text.replace("&", "&amp");
  text = text.replace(">", "&gt;");
  text = text.replace("<", "&lt;");
  return text;
}

const util = { isValidSession,
  validateUsername,
  addToSessionMap,
  addToRecipes
}

module.exports = util;
