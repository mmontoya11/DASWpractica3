let UrlUsers = "https://users-dasw.herokuapp.com/api/users"

function GetUsers() {
    let xhr = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', UrlUsers);

    // 3. indicar tipo de datos JSO
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('x-auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA5MDkzIiwiaWF0IjoxNTcyMjcwMDkzfQ.43qB8WO3RNa2qJp3EfLjhQGVtIA3ayRLsnETtdsyeuc');
    xhr.setRequestHeader('x-user-token', localStorage.getItem("UserToken"));

    // 5. Una vez recibida la respuesta del servidor
    xhr.send()
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error

            alert(xhr.status + ': ' + xhr.statusText + " tuvo un error"); // e.g. 404: Not Found
        } else {
            console.log("Usuarios Obtenidos " + JSON.stringify(xhr.responseText)); // Significa que fue exitoso
            let JSONarryUser = JSON.parse(xhr.responseText)


            let UserList = document.getElementById("lista")
            for(let i = 0; i<JSONarryUser.length; i++){
                let UserEmail = "'"+JSONarryUser[i].correo+"'"
                let UserName = "'"+JSONarryUser[i].nombre+"'"
                let Userapellido ="'"+JSONarryUser[i].apellido+"'"
                UserList.insertAdjacentHTML("beforeend",
                ' <div class="media col-8 mt-2" id="Modelo_'+ `${JSONarryUser[i].correo}` +'">'+
                '<div class="media-left align-self-center mr-3">' +
                '<img class="rounded-circle" style="width: inherit;" src="'+`${JSONarryUser[i].url}`+'">' +
                ' </div>' +
                ' <div class="media-body">' +
                '<h4>'+ `${JSONarryUser[i].nombre}` +' '+`${JSONarryUser[i].apellido}`+'</h4>' +
                '<p >'+ `${JSONarryUser[i].correo}` +'</p>' +
                '<p >Fecha de nacimiento: 01-01-2001 DATO STATICO </p>' +
                '<p >Sexo: Hombre DATO STATICO</p>' +
                ' </div>' +
                '<div class="media-right align-self-center">' +
                ' <div class="row">' +
                '<button href="#" onclick="verDetalle('+ `${UserEmail}` +')" class="btn btn-primary edit"><i class="fas fa-search edit  "></i></button>' +
                ' </div>' +
                ' <div class="row">' +
                '<a href="#"  data-toggle="modal" data-target="#modelId" onclick="editUser('+ `${UserName}` +','+ `${Userapellido}` +','+ `${UserEmail}` +')" class="btn btn-primary mt-2"><i class="fas fa-pencil-alt edit  "></i></a>' +
                ' </div>' +
                '<div class="row">' +
                ' <a href="#" data-toggle="modal" data-target="#modelId" onclick="toDeleteUser('+ `${UserName}` +','+ `${Userapellido}` +','+ `${UserEmail}` +')" class="btn btn-primary mt-2"><i class="fas fa-trash-alt  remove "></i></i></a>' +
                '</div>' +
                '</div>' +
                '</div>')
            }
             
        }
    };
}

function editUser(userName, userLastname, userEmail) {
    
    document.getElementById("EditName").value = userName
    document.getElementById("EditLastName").value = userLastname
    document.getElementById("EditUpEmail").value = userEmail
    document.getElementById("EditUpEmail").disabled = true;
    document.getElementById("SingUpFemale").disabled = true;
    document.getElementById("SingUpMale").disabled = true;
    
    let btnSumitEditar = document.getElementById("btnEdit")

    btnSumitEditar.addEventListener("click", function(e){
        e.preventDefault()
        console.log("Entro a editar")
        let usuario = {
            "nombre": document.getElementById("EditName").value,
            "apellido": document.getElementById("EditLastName").value,
            "correo":document.getElementById("EditUpEmail").value,
            "url": "https://randomuser.me/api/portraits/men/"+Math.floor(Math.random() * 10)+".jpg",
            "sexo":"H",
            "fecha":"10-10-2012",
            "password":"1"
        }
        
        UpdateUser(usuario, document.getElementById("EditUpEmail").value )

        let lista = document.getElementById("lista");
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
        GetUsers()
    })
    

}


function toDeleteUser(userName, userLastname, userEmail){
    
    document.getElementById("EditName").value = userName
    document.getElementById("EditLastName").value = userLastname
    document.getElementById("EditUpEmail").value = userEmail
    document.getElementById("EditUpEmail").disabled = true;
    document.getElementById("EditPassword1").disabled = true;
    document.getElementById("EditPassword2").disabled = true;
    document.getElementById("EditBirthdate").disabled = true;
    document.getElementById("SingUpFemale").disabled = true;
    document.getElementById("SingUpMale").disabled = true;
    document.getElementById("EditLastName").disabled = true;
    document.getElementById("EditName").disabled = true;

    let btnSumitEditar = document.getElementById("btnDelete")

    btnSumitEditar.addEventListener("click",function (){
        // 1. Crear XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // 2. Configurar: PUT actualizar archivo
        xhr.open('DELETE', UrlUsers+"/"+userEmail);
        console.log( "Peticion a esta url "+UrlUsers+"/"+userEmail)
    
        // 3. indicar tipo de datos JSO
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('x-auth','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA5MDkzIiwiaWF0IjoxNTcyMjcwMDkzfQ.43qB8WO3RNa2qJp3EfLjhQGVtIA3ayRLsnETtdsyeuc');
        xhr.setRequestHeader('x-user-token', localStorage.getItem("UserToken"));
        
    
        // 4. Enviar solicitud a la red
        xhr.send();
    
        // 5. Una vez recibida la respuesta del servidor
        xhr.onload = function () {
            if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
                // Ocurrió un error
                alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            } else {
                alert("Usuario eliminado con exito "+xhr.responseText); // Significa que fue exitoso
                let lista = document.getElementById("lista");
                while (lista.firstChild) {
                    lista.removeChild(lista.firstChild);
                }
                GetUsers()
        
            }
        }
    })



}
function verDetalle(correo){
    console.log("correo Entro al ver detalle " + correo)
    localStorage.setItem("UserDetalle", correo);
    window.location.href= "Detalle.html"
}

function UpdateUser(datos, correo){
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr.open('PUT', UrlUsers+"/"+correo);

    // 3. indicar tipo de datos JSO
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('x-auth','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA5MDkzIiwiaWF0IjoxNTcyMjcwMDkzfQ.43qB8WO3RNa2qJp3EfLjhQGVtIA3ayRLsnETtdsyeuc');
    xhr.setRequestHeader('x-user-token', localStorage.getItem("UserToken"));
    console.log(JSON.stringify(datos))

    // 4. Enviar solicitud a la red
    xhr.send(JSON.stringify(datos));

    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
        } else {
            alert("Usuario editado con exito "+xhr.responseText); // Significa que fue exitoso
        }
    };
}

document.addEventListener("DOMContentLoaded", function () {
    GetUsers()
})