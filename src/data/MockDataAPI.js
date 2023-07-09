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
    // console.log("Swimmer item = " + JSON.stringify(data) );
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
export function addSwimmerToSwimmerList(swimmerName, categoryName, time) {

  var data = {
    swimmerId : '',
    categoryId : '',
    title : '',
    time : '',
    photo_url: 'data:image/png;base64,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',
    sessions : [],
    photosArray: [ 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC1H5YHhTHUXMu3XqUKcA2XRumuY-b8KL_vw&usqp=CAU'  ],


  }; //  new swimmer object.
    data.swimmerId = swimmers.length;
    data.title = swimmerName;
    if (categoryName == "2023"){
      data.categoryId = 3;
    }
    if (categoryName == "2024"){
      data.categoryId = 1;
    }
    if (categoryName == "2025"){
      data.categoryId = 2;
    }
    if (categoryName == "2026"){
      data.categoryId = 4;
    }
    data.time = time;
    swimmers[swimmers.length] = data;

}

export function convertSecondstoTime (time_recorded){
  let time = time_recorded;
  console.log("This is the time:" + JSON.stringify(time));
  let secs = time % 60;
  console.log("This is no. of seconds : " + JSON.stringify(secs));
  time = time - secs;
  let mins = time % 60;
  if (secs <10) {
    return (mins + ": 0" + secs);
  }
  return (mins + ":" + secs)

}

