firebase.initializeApp({
    apiKey: "AIzaSyBgC8VSVMtFdRtd0fGVxQVTG_DQskngoUw",
    authDomain: "registrovisitantes-8986e.firebaseapp.com",
    projectId: "registrovisitantes-8986e"
  });


  const takepicture = (foto) => {

console.log(foto)
}


  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
 // Agregar docuemento
 function guardar(){
     var email = document.getElementById("email").value;
     var nombre = document.getElementById("nombre").value;
     var empresa = document.getElementById("empresa").value;
     var visitados = document.getElementById("visitados").value;
     var motivo= document.getElementById("motivo").value;

    db.collection("users").add({
        
        nombre: nombre,
        email: email,
        empresa: empresa,
        visitado: visitados,
        motivo: motivo
     
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);

      
        document.getElementById("email").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("empresa").value = "";
        document.getElementById("visitado").value = "";
        document.getElementById("motivo").value = "";
        
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

   
 

     //Leer documentos
     var delate = document.getElementById("delate");
    db.collection("users").onSnapshot((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().email}`);
           console.log(doc.data())
           console.log(nombre)
            delate.innerHTML = `

            

            <div class="row">
            
            <div class="card" style="width: auto; margin: 100px auto;">
            <img class="card-img-top" src="..." alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">Benvenidx al CoWorking</h5>
              <h6 class="card-title">${doc.data().nombre}</h6>
              <p class="card-text"><b>Correo:</b>  ${doc.data().email}</p>
              <p class="card-text"><b>Empresa:</b>  ${doc.data().empresa}</p>
              <p class="card-text"><b>Visita a :</b>  ${doc.data().visitado}</p>
              <p class="card-text"><b>Motivo de visita:</b>  ${doc.data().motivo}</p>
              <a href="#" class="btn btn-raised btn-raised">Finalizar Registro</a>
            </div>
          </div>
          </div>
          





            
            `
        });
    });
}
    //borrar documentos
   /* function eliminar(id){
        db.collection("users").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    //editar documentos
    function editar(id,email,nombre,empresa,visitado,motivo){
        
        document.getElementById("email").value = email;
        document.getElementById("nombre").value = nombre;
        document.getElementById("empresa").value = empresa;
        document.getElementById("visitado").value = visitados;
        document.getElementById("motivo").value = motivo;
        var boton = document.getElementById("boton");
        boton.innerHTML = "Editar";

        boton.onclick = function(){
        var washingtonRef = db.collection("users").doc(id);
        
        var email = document.getElementById("email").value;
        var nombre = document.getElementById("nombre").value;
        var empresa = document.getElementById("empresa").value;
        var password = document.getElementById("visitados").value;
        var direccion = document.getElementById("motivo").value;

        return washingtonRef.update({
        nombre: nombre,
        email: email,
        empresa: empresa,
        visitado: visitados,
        motivo: motivo
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = "Guardar";
            document.getElementById("email").value = "";
            document.getElementById("nombre").value = "";
            document.getElementById("empresa").value = "";
            document.getElementById("visitados").value = "";
            document.getElementById("motivo").value = "";
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            });
        }
        }*/

        
    
    