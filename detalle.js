let UrlUsers = "https://users-dasw.herokuapp.com/api/users"
document.addEventListener("DOMContentLoaded", function () {
    LoadData()
})

function LoadData(){
    let email = localStorage.getItem("UserDetalle")

        // 1. Crear XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // 2. Configurar: PUT actualizar archivo
        xhr.open('GET', UrlUsers+"/"+ email);
    
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
                console.log("Usuario obtenido con exito "+xhr.responseText); // Significa que fue exitoso
                let JSONarryUser = JSON.parse(xhr.responseText)
                let body = document.getElementById("mediabody") 
                let UserImagen = document.getElementById("imagen") 

                body.insertAdjacentHTML("beforeend", '<h4 >'+ `${JSONarryUser.nombre}`+' '+ `${JSONarryUser.apellido}`+'</h4>'+
                '<p >Correo:'+ `${JSONarryUser.correo}`+'</p>'+
                '<p >Fecha de nacimiento:'+ `${JSONarryUser.fecha}`+' </p>'+
                '<p >Sexo:'+ `${JSONarryUser.sexo}`+'  </p>')

                UserImagen.insertAdjacentHTML("beforeend", '<img class="rounded-circle" style="width: inherit;" src="'+ `${JSONarryUser.url}`+'" id="Imagen">')



            }
        };
    
}