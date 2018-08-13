
//Direccionamiento a Interfaz Registro 
document.getElementById('colorbtn').addEventListener('click', event => {
   
  window.location.assign("views/Formulario.html");

});

  









document.getElementById('camera').addEventListener('click', event => {
  document.getElementById('photo').innerHTML = `<video id="video"></video>
      <br>
      <button id="startbutton">Tomar fotografia</button>
      <br>
      <canvas id="canvas"></canvas>`;
  window.client.photo();
});


document.getElementById('Registrarte').addEventListener('click', event => {
  window.client.guardar();
});