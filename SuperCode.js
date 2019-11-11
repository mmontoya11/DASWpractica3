
let UrlLogIn = "https://users-dasw.herokuapp.com/api/login"
let UrlSingUp = "https://users-dasw.herokuapp.com/api/users"


document.addEventListener("DOMContentLoaded", function () {

    let formLogIn = document.querySelector("#btnLogIn")
    formLogIn.addEventListener("click", function (e) {
        let user = { correo: document.querySelector("#emailLogin").value,
                    password: document.querySelector("#ContraseñaLogin").value
                }
        console.log(user);
        
        LogIn(user)
    })

    let formSingup = document.querySelector("#btnSingUp")
    formSingup.addEventListener("click",function(e){
        e.preventDefault()
        let password = document.querySelector("#SingUpPassword1").value
        

        if(password != document.querySelector("#SingUpPassword2").value){
            alert("Contraseñas no coincide favor de volver lo a intentar")
        }else{
            let NewUser = 
                {
                    "nombre": document.querySelector("#SingUpName").value,
                    "apellido":document.querySelector("#SingUpLastName").value,
                    "correo":document.querySelector("#SingUpEmail").value,
                    "url":"",
                    "password":document.querySelector("#SingUpPassword1").value,
                    "fecha":document.querySelector("#SingUpBirthdate").value,
                    "sexo":document.querySelector('.sexo:checked').value
                }
        console.log("se creo el usuario " + JSON.stringify(NewUser) )
        SingUp(NewUser)
        }
    })
    

})



//no funciona bien
function SingUp(datos){
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr.open('POST', UrlSingUp);

    // 3. indicar tipo de datos JSO
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('x-auth','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA5MDkzIiwiaWF0IjoxNTcyMjcwMDkzfQ.43qB8WO3RNa2qJp3EfLjhQGVtIA3ayRLsnETtdsyeuc');
    console.log(JSON.stringify(xhr))
    // 4. Enviar solicitud a la red
    xhr.send(JSON.stringify(datos));

    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
        } else {
            console.log("Usuario Creado con exito "+xhr.responseText); // Significa que fue exitoso
        }
    };
}


function LogIn(datos) {

    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr.open('POST', UrlLogIn);

    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('x-auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA5MDkzIiwiaWF0IjoxNTcyMjcwMDkzfQ.43qB8WO3RNa2qJp3EfLjhQGVtIA3ayRLsnETtdsyeuc');

    // 4. Enviar solicitud a la red
    xhr.send(JSON.stringify(datos));

    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
        } else {
            console.log(xhr.responseText); // Significa que fue exitoso

            let token = xhr.responseText
            alert("login exitoso")
            token.split('token')
            let StringToken="";
            for(let i = 10; i < token.length-2;i++){
                StringToken += token[i]
            }
            
            

            localStorage.setItem("UserToken", StringToken);
            //console.log(localStorage.getItem("UserToken"))
            window.location.href= "consulta.html"
            
        }
    };
}

