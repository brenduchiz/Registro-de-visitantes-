window.client = {
  photo: () => {
    let storage = firebase.storage();
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
        document.getElementById('video').style.display = 'none';
        document.getElementById('startbutton').style.display = 'none';
        let finalPhoto = canvas.toDataURL('image/png');
        localStorage.setItem('userPhoto', finalPhoto);
        let storageRef = storage.ref('visitor-images/');
        console.log(storageRef);
        const newVisitorKey = firebase.database().ref().child('visitors').push().key;
        let images = storageRef.child(newVisitorKey);
        sessionStorage.setItem('visitorKey', newVisitorKey);


        images.putString(finalPhoto, 'data_url').then((snapshot) => {
          console.log('Uploaded a data_url string!');
        });
      };

      startbutton.addEventListener('click', event => {
        takepicture();
        event.preventDefault();
      }, false);
    })
    ();
  },
  guardar: () => {
    let email = document.getElementById('email').value;
    let nombre = document.getElementById('nombre').value;
    let empresa = document.getElementById('empresa').value;
    let visitados = document.getElementById('visitados').value;
    let motivo = document.getElementById('motivo').value;
    let photito = localStorage.getItem('userPhoto');
    let newDates = new Date();
    let time = newDates.toLocaleTimeString();
    let date = newDates.toLocaleDateString();

    db.collection('users').add({
      time: time,
      date: date,
      nombre: nombre,
      email: email,
      empresa: empresa,
      visitado: visitados,
      motivo: motivo,
      photo: photito
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        document.getElementById('email').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('empresa').value = '';
        document.getElementById('visitado').value = '';
        document.getElementById('motivo').value = '';
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });


    // Leer documentos
    let delate = document.getElementById('delate');
    db.collection('users').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id}`);
        console.log(doc.data());
        console.log(nombre);
        let saveId = doc.id;
        console.log(saveId);
        let savePhotito = doc.data().photo;
        delate.innerHTML = `
            <div class="row">            
            <div class="card" style="width: auto; margin: 100px auto;">
            <div class="card-body">
            <h5 class="card-title">Bienvenidx a Terminal 1</h5>
            <img src='${savePhotito}'>
              <h6 class="card-title">${doc.data().nombre}</h6>
              <p class="card-text"><b>Correo:</b>  ${doc.data().email}</p>
              <p class="card-text"><b>Empresa:</b>  ${doc.data().empresa}</p>
              <p class="card-text"><b>Visita a :</b>  ${doc.data().visitado}</p>
              <p class="card-text"><b>Motivo de visita:</b>  ${doc.data().motivo}</p>
              <a href="#" class="btn btn-raised btn-raised" id="editRegister">Editar Campos</a>
              <a href="#" class="btn btn-raised btn-raised" id="registerFinish">Finalizar Registro</a>
            </div>
          </div>
          </div>`;
      });
    });
  },
  edit: () => {
    delate.style.display = 'none';
    document.getElementById('email').value = email;
    document.getElementById('nombre').value = nombre;
    document.getElementById('empresa').value = empresa;
    document.getElementById('visitado').value = visitados;
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
        motivo: motivo,
        photo: photito
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
  }
};

window.admin = {
  drawData: () => {
    let tabla = documento.getElementById(' tabla ');
    db.colección(' usuarios ').onSnapshot((querySnapshot) => {
      tabla.innerHTML = ' ';
      querySnapshot.forEach((doc) => {
        // console.log (`$ {doc.id} => $ {doc.data (). email}`);
        tabla.innerHTML += `
         <tr>
         <th scope = " row " > $ { doc . id } </ th >
         <td>${doc.datos().correo electrónico } </ td >
         <td>${doc.datos().nombre} </ td >
         <td>${doc.datos().contraseña} </ td >
         <td>${doc.datos().empresa} </ td >
         <td>${doc.datos().direccion} </ td >
         <td><button  class = " btn btn-danger "  onclick = " eliminar ( ' $ {doc.id} ' ) " > Eliminar </ button > </ td >
         <td><button  class = " btn btn-warning "  onclick = " editar ( ' $ {doc.id} ' , ' $ {doc.data (). email} ' , ' $ {doc.data (). nombre } ' , ' $ {doc.data (). contraseña} ' , ' $ {doc.data (). empresa} ' , ' $ {doc.data (). dirección} ' ) " > Editar </ button > < / td >
       </ tr > `;
      });
    });
  },
  delete: (id) => {
    db.collection('users').doc(id).delete()
      .then(() => {
        console.log('Document successfully deleted!');
      }).catch(() => {
        console.error('Error removing document: ', error);
      });
  }
};