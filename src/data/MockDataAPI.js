import { Text, Alert } from 'react-native';
import React, { Component } from 'react';
import { recipes, categories, sessions } from './dataArrays';

export function getCategoryById(categoryId) {
  let category;
  categories.map(data => {
    if (data.id == categoryId) {
      category = data;
    }
  });
  return category;
}

export function getIngredientName(ingredientID) {
  let name;
  sessions.map(data => {
    if (data.ingredientId == ingredientID) {
      name = data.name;
    }
  });
  return name;
}

export function getIngredientUrl(ingredientID) {
  let url;
  sessions.map(data => {
    if (data.ingredientId == ingredientID) {
      url = data.photo_url;
    }
  });
  return url;
}

export function getCategoryName(categoryId) {
  let name;
  categories.map(data => {
    if (data.id == categoryId) {
      name = data.name;
    }
  });
  return name;
}


export function getRecipes(categoryId) {
  const recipesArray = [];
  recipes.map(data => {
    if (data.categoryId == categoryId) {
      recipesArray.push(data);
    }
  });
  return recipesArray;
}

// modifica
export function getRecipesByIngredient(ingredientId) {
  const recipesArray = [];
  recipes.map(data => {
    data.sessions.map(index => {
      if (index[0] == ingredientId) {
        recipesArray.push(data);
      }
    });
  });
  return recipesArray;
}

export function getNumberOfRecipes(categoryId) {
  let count = 0;
  recipes.map(data => {
    if (data.categoryId == categoryId) {
      count++;
    }
  });
  return count;
}

export function getAllSessions(idArray) {
  const ingredientsArray = [];
  // return ingredientsArray;

  idArray.map(index => {
    sessions.map(data => {
      // if (data.ingredientId == index[0]) {
      //   ingredientsArray.push([data, index[1]]);
      // }
    });
  });
  return ingredientsArray;
}

// functions for search
export function getRecipesByIngredientName(ingredientName) {
  const nameUpper = ingredientName.toUpperCase();
  const recipesArray = [];
  sessions.map(data => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      // data.name.yoUpperCase() == nameUpper
      const recipes = getRecipesByIngredient(data.ingredientId);
      const unique = [...new Set(recipes)];
      unique.map(item => {
        recipesArray.push(item);
      });
    }
  });
  const uniqueArray = [...new Set(recipesArray)];
  return uniqueArray;
}

export function getRecipesByCategoryName(categoryName) {
  const nameUpper = categoryName.toUpperCase();
  const recipesArray = [];
  categories.map(data => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      const recipes = getRecipes(data.id); // return a vector of recipes
      recipes.map(item => {
        recipesArray.push(item);
      });
    }
  });
  return recipesArray;
}

export function getRecipesByRecipeName(recipeName) {
  const nameUpper = recipeName.toUpperCase();
  const recipesArray = [];
  recipes.map(data => {
    if (data.title.toUpperCase().includes(nameUpper)) {
      recipesArray.push(data);
    }
  });
  return recipesArray;
}

// ====== Real Swim app APIs ======
// vvvvvvvvvvvv

export function getSwimmers() {
  const swimmersArray = [];
  recipes.map(data => {
      swimmersArray.push(data);
  });
  return swimmersArray;
}

export function getSwimmerById(swimmerId) {
  var swimmer = null;
  
  recipes.map(item => {
    if (item.swimmerId == swimmerId) {
        swimmer = item;
    }
  });

  if (swimmer == null) {
    console.log ("getSwimmerById could not found swimmers for id:" + swimmerId);
  }

  return swimmer;
}

export function getSessionsbySwimmerId(swimmerId, type = "Meet") {
  let sessionsArray = [];
  recipes.map(data => {
    if (data.swimmerId == swimmerId) {
      data.sessions.map(
        sessionItem => {
          if (sessionItem.type == type) {
            sessionsArray.push(sessionItem);
          }
        }
      )
    }
  });

  return sessionsArray;
}

export function addSessionToSwimmer(swimmerId, newSession) {

  recipes.map(data => {
    if (data.swimmerId == swimmerId) {
      data.sessions.push(newSession);
    }
  });

}