function createAnalytics() {
  let counter = 0;
  let isDestroyed = false;

  const documentListener = () => counter++;

  document.addEventListener("click", documentListener);

  return {
    destroy() {
      document.removeEventListener("click", documentListener);
      isDestroyed = true;
    },
    getClicks() {
      if (isDestroyed) {
        return "Analytics is destroyed.";
      }
      return counter;
    }
  };
}

window.analytics = createAnalytics();
