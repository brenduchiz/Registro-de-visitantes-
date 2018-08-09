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
            console.log(`${doc.id} => ${doc.data().email}`);
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

        
    
    