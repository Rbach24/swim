import { Text, Alert } from 'react-native';
import React, { Component } from 'react';
import { swimmers, categories, sessions } from './dataArrays';

export function getCategoryById(categoryId) {
  let category;
  categories.map(data => {
    if (data.id == categoryId) {
      category = data;
    }
  });
  return category;
}

export function getStyleName(styleId) {
  let name;
  sessions.map(data => {
    if (data.styleId == styleId) {
      name = data.name;
    }
  });
  return name;
}

export function getStyleUrl(styleId) {
  let url;
  sessions.map(data => {
    if (data.styleId == styleId) {
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


export function getSwimmersByCategoryId(categoryId) {
  const swimmersArray = [];
  swimmers.map(data => {
    if (data.categoryId == categoryId) {
      swimmersArray.push(data);
    }
  });
  return swimmersArray;
}
 
// modifica
export function getSwimmersByStyle(styleId) {
  const swimmersArray = [];
  swimmers.map(data => {
    data.sessions.map(index => {
      if (index[0] == styleId) {
        swimmersArray.push(data);
      }
    });
  });
  return swimmersArray;
}

export function getNumberOfSwimmers(categoryId) {
  let count = 0;
  swimmers.map(data => {
    if (data.categoryId == categoryId) {
      count++;
    }
  });
  return count;
}

export function getAllSessions(idArray) {
  const sessionsArray = [];
  // return ingredientsArray;

  idArray.map(index => {
    sessions.map(data => {
      // if (data.ingredientId == index[0]) {
      //   ingredientsArray.push([data, index[1]]);
      // }
    });
  });
  return sessionsArray;
}

// functions for search
// export function getSwimmersBySession(ingredientName) {
//   const nameUpper = ingredientName.toUpperCase();
//   const recipesArray = [];
//   sessions.map(data => {
//     if (data.name.toUpperCase().includes(nameUpper)) {
//       // data.name.yoUpperCase() == nameUpper
//       const recipes = getRecipesByIngredient(data.ingredientId);
//       const unique = [...new Set(recipes)];
//       unique.map(item => {
//         recipesArray.push(item);
//       });
//     }
//   });
//   const uniqueArray = [...new Set(recipesArray)];
//   return uniqueArray;
// }

export function getSwimmersByCategoryName(categoryName) {
  const nameUpper = categoryName.toUpperCase();
  const swimmersArray = [];
  categories.map(data => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      const swimmers = getSwimmersByCategoryId(data.id); // return a vector of recipes
      swimmers.map(item => {
        swimmersArray.push(item);
      });
    }
  });
  return swimmersArray;
}

export function getSwimmersBySwimmerName(swimmerName) {
  const nameUpper = swimmerName.toUpperCase();
  const swimmersArray = [];
  swimmers.map(data => {
    if (data.title.toUpperCase().includes(nameUpper)) {
      swimmersArray.push(data);
    }
  });
  return swimmersArray;
}

// ====== Real Swim app APIs ======
// vvvvvvvvvvvv

export function getSwimmers() {
  const swimmersArray = [];
  swimmers.map(data => {
      swimmersArray.push(data);
  });
  return swimmersArray;
}

export function getSwimmerById(swimmerId) {
  var swimmer = null;

  swimmers.map(item => {
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
  swimmers.map(data => {
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

  swimmers.map(data => {
    if (data.swimmerId == swimmerId) {
      data.sessions.push(newSession);
    }
  });

}

export function initializeSwimmersFromDatabase() {

}

export function saveSwimmersToDatabase () {

}