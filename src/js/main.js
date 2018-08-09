document.getElementById('camera').addEventListener('click', event => {
  document.getElementById('photo').innerHTML = `<video id="video"></video>
    <br>
    <button class="btn btn-info" id="startbutton">Tomar fotografia</button>
    <br>
    <canvas id="canvas"></canvas>`;
  window.client.photo();
});

document.getElementById('boton').addEventListener('click', event => {
  window.admin.showTable();
});