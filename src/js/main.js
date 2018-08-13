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