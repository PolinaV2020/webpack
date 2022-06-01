/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./analytics.js ***!
  \**********************/
function createAnalytics() {
  var counter = 0;
  var isDestroyed = false;

  var documentListener = function documentListener() {
    return counter++;
  };

  document.addEventListener("click", documentListener);
  return {
    destroy: function destroy() {
      document.removeEventListener("click", documentListener);
      isDestroyed = true;
    },
    getClicks: function getClicks() {
      if (isDestroyed) {
        return "Analytics is destroyed.";
      }

      return counter;
    }
  };
}

window.analytics = createAnalytics();
/******/ })()
;