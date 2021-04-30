"use strict";

import {
loadTimer
}from './main'

export const timer = (function iife() {
  const updateTimer = () => {
    return loadTimer()
    //.then( response => response.json() )
    .then( setTimeout( updateTimer, 5000) );
  };

  updateTimer();

})();
