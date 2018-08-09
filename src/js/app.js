firebase.initializeApp({
    apiKey: "AIzaSyBgC8VSVMtFdRtd0fGVxQVTG_DQskngoUw",
    authDomain: "registrovisitantes-8986e.firebaseapp.com",
    projectId: "registrovisitantes-8986e"
  });
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
 // Agregar docuemento
 function guardar(){
     var email = document.getElementById("email").value;
     var nombre = document.getElementById("nombre").value;
     var password = document.getElementById("password").value;
     var empresa = document.getElementById("empresa").value;
     var direccion = document.getElementById("direccion").value;
     

    db.collection("users").add({
        email: email,
        nombre: nombre,
        password: password,
        empresa: empresa,
        direccion: direccion
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById("email").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("password").value = "";
        document.getElementById("empresa").value = "";
        document.getElementById("direccion").value = "";
        console.log(vue)
    vue.enviar();

    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

 }

     //Leer documentos
     var tabla = document.getElementById("tabla");
    db.collection("users").onSnapshot((querySnapshot) => {
        tabla.innerHTML = "";
        querySnapshot.forEach((doc) => {
           // console.log(`${doc.id} => ${doc.data().email}`);
            tabla.innerHTML += `
            <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().email}</td>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().password}</td>
            <td>${doc.data().empresa}</td>
            <td>${doc.data().direccion}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().email}','${doc.data().nombre}','${doc.data().password}','${doc.data().empresa}','${doc.data().dirección}')">Editar</button></td>
          </tr>`
        });
    });

    //borrar documentos
    function eliminar(id){
        db.collection("users").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    //editar documentos
    function editar(id,email,nombre,password,empresa,direccion){
        
        document.getElementById("email").value = email;
        document.getElementById("nombre").value = nombre;
        document.getElementById("password").value = password;
        document.getElementById("empresa").value = password;
        document.getElementById("direccion").value = password;
        var boton = document.getElementById("boton");
        boton.innerHTML = "Editar";

        boton.onclick = function(){
        var washingtonRef = db.collection("users").doc(id);
        
        var email = document.getElementById("email").value;
        var nombre = document.getElementById("nombre").value;
        var password = document.getElementById("password").value;
        var empresa = document.getElementById("empresa").value;
        var direccion = document.getElementById("direccion").value;

        return washingtonRef.update({
            email: email,
            nombre: nombre,
            password: password,
            empresa: empresa,
            direccion: direccion
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = "Guardar";
            document.getElementById("email").value = "";
            document.getElementById("nombre").value = "";
            document.getElementById("password").value = "";
            document.getElementById("empresa").value = "";
            document.getElementById("direccion").value = "";
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            });
        }
        }

         //Leer documentos empresas
     var tabla2 = document.getElementById("tabla2");
     db.collection("empresas").onSnapshot((querySnapshot) => {
         tabla2.innerHTML = "";
         querySnapshot.forEach((doc) => {
             console.log(doc.data().email)
            // console.log(`${doc.id} => ${doc.data().email}`);
             tabla2.innerHTML += `
             <tr>
             <th scope="row">${doc.id}</th>
             <td>${doc.data().email}</td>
             <td>${doc.data().nombre}</td>

             <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
             <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().email}','${doc.data().nombre}','${doc.data().password}','${doc.data().empresa}','${doc.data().dirección}')">Editar</button></td>
           </tr>`
         });
     });
    
     (function(){
        emailjs.init("user_rkhG8ABbW9wspIRpvfENm");
     })();
    const vue    = new Vue({
        el: '#app',
        data(){
            return {
                from_name: '',
                from_email: '',
                from_password: '',
                from_empresa: '',
                from_direccion: '',
            }
        },
        methods: {
            enviar(){
                let data = {
                    from_name: this.from_name,
                    from_email: this.from_email,
                    from_password: this.from_password,
                    from_empresa: this.from_empresa,
                    from_direccion: this.from_direccion,
                };
                
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
    });
    

    console.log(vue)