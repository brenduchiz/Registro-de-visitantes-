

let logOut = document.getElementById('buttonOut');
// Cierra Sesión
logOut.addEventListener('click', element => {
  console.log('Saliendo');
  window.location.assign('../index.html');
});