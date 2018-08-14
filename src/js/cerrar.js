let logOutt = document.getElementById('buttonOutt');
// Cierra Sesión
logOutt.addEventListener('click', element => {
  console.log('Saliendo');
  window.location.assign('../src/index.html');
});