let logOut = document.getElementById('buttonOut');
// Registro
logOut.addEventListener('click', element => {
  console.log('Saliendo');
  window.location.assign('../Inicio.html');
});