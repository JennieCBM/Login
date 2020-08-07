//funcion autoinvocada para proteger variables globales
(function(window, document, $){

/*  //funcion para animacion de formulario desplegable jquery
  window.contador = 1;
  $('.toggle').click( function() { formulario()});
  function formulario() {
    $('.formulario').animate({
        height: "toggle",
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        'opacity': 'toggle'},
        "slow");
        if (window.contador == 1){
          document.getElementById("reset").style.display = 'none';
          window.contador = window.contador +1;
          let span = document.getElementById("span");
          span.innerHTML = "Iniciar Sesion";
          } else {
        document.getElementById("reset").style.display = 'block';
          window.contador = 1;
          let span = document.getElementById("span");
          span.innerHTML = "Crear cuenta";
          }
        }; */

//practica menu desplegable sin Jquery
  //uso un contador para generar cambios con cada click
  let contador = 0;
  //declaro las variables necesarias para acceder a elementos del DOM
  let formularioUno = document.getElementById("formulario-1");
  let formularioDos = document.getElementById("formulario-2")
  let toggle = document.getElementById("toggle");
  let span = document.getElementById("span");
  let reset = document.getElementById("reset");
  //  formularioUno.style.transition = 'display 5s linear';
    formularioDos.style.transition = 'display 5s linear';

  toggle.addEventListener("click", function(){
      if(contador == 0){
        //en el primer click oculto el formulario 1 (iniciar sesion) y muestro el formulario 2 (crear cuenta)
        formularioUno.style.display = 'none';
        formularioDos.style.display = 'block';
        //oculto el boton de resetear contraseña
        reset.style.display = 'none';
        //cambio el texto del boton
        span.innerHTML = "Iniciar Sesion";
        //redefino el valor del contador para ejecutar el else
        contador = 1;
        }else{
        //en el segundo click vuelvo a mostrar el formulario 1 y oculto el formulario 2
        formularioUno.style.display = 'block';
        formularioDos.style.display = 'none';
        //vuelvo a mostrar el boton de resetear contraseña
        reset.style.display = 'block'
        //vuelvo al texto inicial
        span.innerHTML = "Crear Cuenta";
        //redefino el valor del contador para volver a cambiar de pagina cada que sea necesario
        contador = 0;
      }
  });


//creo un objeto para almacenar temporalmente los usuarios que se logean (mientras no se recarge la pagina)
var usuarios = {
    jennie:"1234",
    anibal:"12345",
    mina:"123456"
    };

console.log(usuarios);


document.getElementById("iniciar").addEventListener("click", validar);
document.getElementById("registro").addEventListener("click",registro);


let form = document.querySelector("form");


//funcion para comparar llaves y valores dentro del objeto "usuarios"
function validar() {
  //Me traigo la informacion que ingreso el usuario (user + password)
  let usuario = document.form.usuario.value;
  let password = document.form.password.value;
  //transformo el value a minusculas antes de comparar
  usuario = usuario.toLowerCase();
  //declaro una variable que corresponde a un array de las llaves (nombre de usuarios)
  let userName = Object.keys(usuarios);
  //primero verifico que el usuario no deje campos vacios
  if (usuario == ""){
    alert("no ingreso ningun usuario");
  }else{
    //Verifico que el username ingresado por el usuario exista dentro del array
    if (userName.includes(usuario)){
    //declaro una variable que corresponde a un array de los valores de las llaves (contraseñas)
    var passwordx = usuarios[usuario];
    }else{
    //alert("verifique sus datos");
    console.log("verifique sus datos");
    };
  };
  //compruebo que la contraseña sea correcta, comparando el value con los valores del array password (valor de las llaves del objeto usuarios)
  if (passwordx == password){
    alert("hola" + " " + usuario);
    form.reset();
    //si el value del password no esta incluido en el array, verifico primero que no haya dejado el espacio en blanco
  }else{
    if(password == ""){
    console.log("no ingreso ninguna contraseña");
    //si no dejo el espacio en blaco y llego hasta aca es porque la contraseña es incorrecta
    }else{
    alert("contraseña incorrecta");
    };
  };
};

//funcion para agregar usuarios al objeto "usuarios"(temporalmente)
function registro() {
    var nuevousuario = document.getElementById("nuevousuario").value;
    var nuevacontraseña = document.getElementById("nuevacontraseña").value;
    var nuevousuario = nuevousuario.toLowerCase();

    if (nuevousuario == ""){
      alert("no ha ingresado ningun usuario")
    }else{
      if (nuevacontraseña == ""){
        alert("ingrese una contraseña")
      }else{
        usuarios[nuevousuario.toLowerCase()] = nuevacontraseña;
        console.log(usuarios);
        document.getElementById("form-2").reset();
      };
    };
  };


//funcion para ver la hora en tiempo real
function reloj(){
      let momentoActual = new Date()
      let hora = momentoActual.getHours()
      let minuto = momentoActual.getMinutes()
      let segundo = momentoActual.getSeconds()

      let horaImprimible = "Buenos Aires.  " + hora + " : " + minuto + " : " + segundo + " hrs."

      document.form_reloj.reloj.value = horaImprimible
      //setTimeout es una funcion predeterminada del objeto window, donde Nombredelafuncionpredet(nombredemifuncion, tiempoMiliseg)
      //se tiene que invocar a la funcion predeterminada dentro de mi funcion
      setTimeout(reloj,1000);
    };
window.addEventListener("load",reloj);

})(window, document, window.jQuery);
