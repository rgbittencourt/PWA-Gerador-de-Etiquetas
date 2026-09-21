if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function (error) {
      console.warn('Não foi possível ativar o modo aplicativo.', error);
    });
  });
}
