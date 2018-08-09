firebase.initializeApp({
  apiKey: 'AIzaSyBgC8VSVMtFdRtd0fGVxQVTG_DQskngoUw',
  authDomain: 'registrovisitantes-8986e.firebaseapp.com',
  projectId: 'registrovisitantes-8986e'
});

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

window.client = {
  save: () => {
    // Agregar docuemento
    let email = document.getElementById('email').value;
    let nombre = document.getElementById('nombre').value;
    let password = document.getElementById('password').value;
    let empresa = document.getElementById('empresa').value;
    let direccion = document.getElementById('direccion').value;     

    db.collection('users').add({
      email: email,
      nombre: nombre,
      password: password,
      empresa: empresa,
      direccion: direccion
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        document.getElementById('email').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('password').value = '';
        document.getElementById('empresa').value = '';
        document.getElementById('direccion').value = '';
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
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
        video.stop();
        return finalPhoto;
      };

      startbutton.addEventListener('click', event => {
        takepicture();
        event.preventDefault();
      }, false);
    })
    ();
  }
};

window.admin = {
  // borrar documentos
  showTable: () => {
    // Leer documentos
    let tabla = document.getElementById('tabla');
    db.collection('users').onSnapshot((querySnapshot) => {
      tabla.innerHTML = '';
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().email}`);
        tabla.innerHTML += `
          <tr>
          <th scope="row">${doc.id}</th>
          <td>${doc.data().email}</td>
          <td>${doc.data().nombre}</td>
          <td>${doc.data().password}</td>
          <td>${doc.data().empresa}</td>
          <td>${doc.data().direccion}</td>
          <td><button class="btn btn-danger" onclick="window.admin.delete('${doc.id}')">Eliminar</button></td>
          <td><button class="btn btn-warning" onclick="window.admin.edit('${doc.id}','${doc.data().email}','${doc.data().nombre}','${doc.data().password}','${doc.data().empresa}','${doc.data().dirección}')">Editar</button></td>
        </tr>`;
      });
    });
  },

  delete: (id) => {
    db.collection('users').doc(id).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  },

  // editar documentos
  edit: (id, email, nombre, password, empresa, direccion) => {
    document.getElementById('email').value = email;
    document.getElementById('nombre').value = nombre;
    document.getElementById('password').value = password;
    document.getElementById('empresa').value = password;
    document.getElementById('direccion').value = password;
    let boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = (() => {
      let washingtonRef = db.collection('users').doc(id);
        
      let email = document.getElementById('email').value;
      let nombre = document.getElementById('nombre').value;
      let password = document.getElementById('password').value;
      let empresa = document.getElementById('empresa').value;
      let direccion = document.getElementById('direccion').value;

      return washingtonRef.update({
        email: email,
        nombre: nombre,
        password: password,
        empresa: empresa,
        direccion: direccion
      })
        .then(() => {
          console.log('Document successfully updated!');
          boton.innerHTML = 'Guardar';
          document.getElementById('email').value = '';
          document.getElementById('nombre').value = '';
          document.getElementById('password').value = '';
          document.getElementById('empresa').value = '';
          document.getElementById('direccion').value = '';
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error);
        });
    });
  }
};