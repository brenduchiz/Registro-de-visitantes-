window.client = {
  guardar: () => {
    let email = document.getElementById('email').value;
    let nombre = document.getElementById('nombre').value;
    let empresa = document.getElementById('empresa').value;
    let visitados = document.getElementById('visitados').value;
    let motivo = document.getElementById('motivo').value;
    window.client.enviar();

    db.collection('users').add({
      nombre: nombre,
      email: email,
      empresa: empresa,
      visitado: visitados,
      motivo: motivo
    })
      .then((docRef) => {
      //  console.log('Document written with ID: ', docRef.id);
        document.getElementById('email').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('empresa').value = '';
        document.getElementById('visitados').value = '';
        document.getElementById('motivo').value = '';
        
        
        
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });


    // Leer documentos
    let delate = document.getElementById('delate');
    db.collection('users').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
       // console.log(`${doc.id} => ${doc.data().email}`);
        //console.log(doc.data());
        //console.log(nombre);
        //vue.enviar();
        
        delate.innerHTML = `
            <div class="row">            
            <div class="card" style="width: auto; margin: 100px auto;">
            <div class="card-body">
            <h5 class="card-title">Bienvenidx a Terminal 1</h5>
              <h6 class="card-title">${doc.data().nombre}</h6>
              <p class="card-text"><b>Correo:</b>  ${doc.data().email}</p>
              <p class="card-text"><b>Empresa:</b>  ${doc.data().empresa}</p>
              <p class="card-text"><b>Visita a :</b>  ${doc.data().visitados}</p>
              <p class="card-text"><b>Motivo de visita:</b>  ${doc.data().motivo}</p>
              <a href="#" class="btn btn-raised btn-raised" onclick="edit();">Editar Campos</a>
              <a href="#" class="btn btn-raised btn-raised">Finalizar Registro</a>
            </div>
          </div>
          </div>`;
      });
    });
  },
  photo: () => {
    (() => {
      let streaming = false,
        video = document.querySelector('#video'),
        canvas = document.querySelector('#canvas'),
        startbutton = document.querySelector('#startbutton'),
        width = 320,
        height = 0;

      navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

      navigator.getMedia(
        {
          video: true,
          audio: false
        },
        (stream) => {
          if (navigator.mozGetUserMedia) {
            video.mozSrcObject = stream;
          } else {
            let vendorURL = window.URL || window.webkitURL;
            video.src = vendorURL.createObjectURL(stream);
          }
          video.play();
        },
        (err) => {
          console.log('An error occured! ' + err);
        }
      );

      video.addEventListener('canplay', event => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);

      const takepicture = () => {
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        let finalPhoto = canvas.toDataURL('image/png');
      };

      startbutton.addEventListener('click', event => {
        takepicture();
        event.preventDefault();
      }, false);
    })
    ();
  },
  edit: () => {
    delate.style.display = 'none';
    document.getElementById('email').value = email;
    document.getElementById('nombre').value = nombre;
    document.getElementById('empresa').value = empresa;
    document.getElementById('visitados').value = visitados;
    document.getElementById('motivo').value = motivo;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';
    boton.onclick = function() {
      var washingtonRef = db.collection('users').doc(id);
      var email = document.getElementById('email').value;
      var nombre = document.getElementById('nombre').value;
      var empresa = document.getElementById('empresa').value;
      var visitados = document.getElementById('visitados').value;
      var motivo = document.getElementById('motivo').value;
      return washingtonRef.update({
        nombre: nombre,
        email: email,
        empresa: empresa,
        visitado: visitados,
        motivo: motivo
      })
        .then(function() {
          console.log('Document successfully updated!');
          boton.innerHTML = 'Guardar';
          document.getElementById('email').value = '';
          document.getElementById('nombre').value = '';
          document.getElementById('empresa').value = '';
          document.getElementById('visitados').value = '';
          document.getElementById('motivo').value = '';
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error);
        });
    };
  },
  
  enviar: () => {

    let from_name1 = document.getElementById("nombre").value;
    let from_email1 = document.getElementById("email").value;
    let from_empresa1 = document.getElementById("empresa").value;
    let from_motivo1 = document.getElementById("motivo").value;
    console.log(from_name1)
      let data = {
          from_name: from_name1,
          from_email: from_email1,
          from_empresa: from_empresa1,
          from_motivo: from_motivo1,
      };
      emailjs.init("user_rkhG8ABbW9wspIRpvfENm");
      emailjs.send("gmail","notificaci_n_visitantes", data)
      .then(function(response) {
          if(response.text === 'OK'){
              alert('El correo se ha enviado de forma exitosa');
          }
         console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
      }, function(err) {
          alert('Ocurrió un problema al enviar el correo');
         console.log("FAILED. error=", err);
      });
  }
}

window.admin = {
  stats: () => { }
};