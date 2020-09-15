         //funcion autoinvocada para proteger variables globales
(function(window, document){


//**************************************MENU DESPLEGABLE**************************************
  //uso un contador para generar cambios con cada click
  let contador = 0;
  //declaro las variables necesarias para acceder a elementos del DOM
  let formularioUno = document.getElementById("formulario-1");
  let formularioDos = document.getElementById("formulario-2")
  let toggle = document.getElementById("toggle");
  let span = document.getElementById("span");
  let reset = document.getElementById("reset");
  //formularioUno.style.transition = 'display 5s linear';

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
//********************************* VALIDACION FORMULARIOS*************************************

  const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{4,12}$/, // 4 a 12 digitos.
  }
  console.log(expresiones);

  const form = document.querySelector("form");
  const inputs = document.querySelectorAll('#form-2 input');

  //inicializo cada campo en false para validar que todos esten en true antes de enviar el formulario
  const campos = {
	   usuario: false,
	   contraseña: false,
	   correo: false,
     password2 : false
   };

   //tipo es el p error- usuario contraseña contraseña2 correo acepto
   //expresion es el objeto regexp expresiones.usuario expresiones.password expresiones.correo
   //input es el e.target
   const validarCampo = (expresion, input, tipo)=>{
     if(expresion.test(input.value)){
       input.classList.remove('error');//remuevo la clase error para el borde rojo
       document.querySelector(`#error-${tipo}`).style.visibility = 'hidden';//remuevo la clase activo del texto p
       document.querySelector(`#icono-${tipo}`).style.visibility = 'visible';
       campos[tipo] = true;
     }else{
       input.classList.add('error');//remuevo la clase error para el borde rojo
       document.querySelector(`#error-${tipo}`).style.visibility = 'visible';//agrego la clase activo del texto p
       document.querySelector(`#icono-${tipo}`).style.visibility = 'hidden';
       campos[tipo] = false;
     };
   };

   const validarFormulario = (e)=>{
     switch (e.target.name) {
      case 'usuario':
        validarCampo(expresiones.usuario, e.target, 'usuario');
        break;
      case 'password':
        validarCampo(expresiones.password, e.target, 'contraseña');
        validarPassword();
        break;
      case 'password2':
        validarPassword();
        break;
      case 'correo':
        validarCampo(expresiones.correo, e.target, 'correo');
        break;
      }
    };

    const validarPassword= () => {
    const inputPassword1 = document.getElementById('nuevaContraseña');
    const inputPassword2 = document.getElementById('repetirContraseña');
      if(inputPassword1.value !== inputPassword2.value){
        inputPassword2.classList.add('error');//si es diferente agrego la clase error
        document.querySelector('#error-contraseña2').style.visibility= "visible";
        document.querySelector('#icono-contraseña2').style.visibility="hidden";
        campos['password2']= false;
      }else{
        inputPassword2.classList.remove('error');//si es diferente agrego la clase error
        document.querySelector('#error-contraseña2').style.visibility= "hidden";
        document.querySelector('#icono-contraseña2').style.visibility="visible";
        campos['password2']=true;
      }
    };

    inputs.forEach((input) => {
	     input.addEventListener('keyup', validarFormulario);
	     input.addEventListener('blur', validarFormulario);
    });


    //creo un objeto para almacenar temporalmente los usuarios que se logean (mientras no se recarge la pagina)
    var usuarios = {
    };

    function Persona(nombre, password, correo){
      var datos = {
        nombre: nombre,
        password: password,
        correo: correo,
      };
      return datos;
    };


    document.getElementById("iniciar").addEventListener("click", validar);
    document.getElementById("registro").addEventListener("click",registro);
    document.getElementById('reset').addEventListener("click", mostrarPassword);

    //funcion para comparar llaves y valores dentro del objeto "usuarios"
    function validar() {
      //Me traigo la informacion que ingreso el usuario (user + password)
      let usuario = document.form.usuario.value;
      let password = document.form.password.value;
      const mensajeUsuario = document.querySelector('#usuario-invalido');
      const mensajeContraseña = document.querySelector('#contraseña-invalida');
      const denegado = document.querySelector('.denegado')
      //transformo el value a minusculas antes de comparar
      usuario = usuario.toLowerCase();
      //declaro una variable que corresponde a un array de las llaves (nombre de usuarios)
      let userName = Object.keys(usuarios);
      //primero verifico que el usuario no deje campos vacios
      if (usuario == ""){
        mensajeUsuario.style.visibility= "visible";
      }else{
        mensajeUsuario.style.visibility= "hidden";
        if(password == ""){
          mensajeContraseña.style.visibility= "visible";
        }else{
          mensajeContraseña.style.visibility="hidden";
          //Verifico que el username ingresado por el usuario exista dentro del objeto
          if (userName.includes(usuario)){
            //declaro una variable que...
            var propiedad = usuarios[usuario];

            console.log(propiedad);
            //compruebo que la contraseña sea correcta, comparando el value con los valores del array password (valor de las llaves del objeto usuarios)
            if (propiedad.password == password){
              denegado.style.display = "none";
              alert("hola" + " " + usuario[0].toUpperCase() + usuario.slice(1));
              form.reset();
            //si el value del password no esta incluido en el array, verifico primero que no haya dejado el espacio en blanco
            }else{
            //si no dejo el espacio en blaco y llego hasta aca es porque la contraseña es incorrecta
            denegado.style.display = "block";
            };
          }else{
            denegado.style.display = "block";
          };
        };
      };
    };//cierre funcion validar

    //funcion para agregar usuarios al objeto "usuarios"(temporalmente)
    function registro() {
      let nuevousuario = document.getElementById("nuevousuario").value;
      const nuevacontraseña = document.getElementById("nuevaContraseña").value;
      const nuevocorreo = document.querySelector('#correo').value;
      const creado = document.querySelector('.creado');
      const denegado2 = document.querySelector('.denegado2');
      const acepto = document.getElementById('acepto');
      nuevousuario = nuevousuario.toLowerCase();
      if(acepto.checked && campos.usuario && campos.contraseña && campos.password2 && campos.correo){
        creado.style.display = "block";
        denegado2.style.display = "none";
        usuarios[nuevousuario] = new Persona(nuevousuario, nuevacontraseña, nuevocorreo);
        console.log(usuarios);
        document.getElementById("form-2").reset();
        let iconos = document.querySelectorAll('i');
        setTimeout(()=>{
          creado.style.display = "none"
          iconos[1].style.visibility = 'hidden';
          iconos[2].style.visibility = 'hidden';
          iconos[3].style.visibility = 'hidden';
          iconos[4].style.visibility = 'hidden'
        },5000);;
      }else{
        creado.style.display = "none";
        denegado2.style.display = "block";
      };
    };//cierre funcion registro

    //funcion para mostrar contraseña al usuario
     function mostrarPassword() {
      const overlay = document.querySelector('.overlay');
      const form_p = document.querySelector('#mostrar-password');
      const respuesta_p = form_p.children[4];
      const boton_p = form_p.children[5];
      //para mostrar el overlay
      overlay.style.display = 'flex';
      //para ocultar el overlay
      function cerrar(e){
          e.stopPropagation();
          if(e.target == overlay){
          overlay.style.display = 'none';
          respuesta_p.innerText = '';
          overlay.removeEventListener("click", cerrar);
          boton_p.removeEventListener("click", respuesta);
          form_p.reset();
        };
      };//fin funcion cerrar
      //para mostrar la respuesta
      function respuesta(){
        let nombre = form_p.children[2].value;
        let correo_p = form_p.children[3].value;
        let keys = Object.keys(usuarios);
        nombre = nombre.toLowerCase();
        if(keys.includes(nombre)){
          let propiedad = usuarios[nombre];
          if(propiedad.correo == correo_p){
            respuesta_p.innerText ='tu contraseña es: '+propiedad.password;
          }else{
            respuesta_p.innerText ='verifica los datos';
          };
        }else{
          respuesta_p.innerText ='usuario no valido';
        };
      };//fin funcion respuesta

      boton_p.addEventListener('click', respuesta);
      overlay.addEventListener("click", cerrar);
    };//fin mostrarPassword


  //***************************RELOJ******************************************
  //funcion para ver la hora en tiempo real
  function reloj(){
        let momentoActual = new Date()
        let hora = momentoActual.getHours()
        let minuto = momentoActual.getMinutes()
        let segundo = momentoActual.getSeconds()

        let horaImprimible = "Hora Actual:  " + hora + " : " + minuto + " : " + segundo + " hrs."

        document.form_reloj.reloj.value = horaImprimible
        //setTimeout es una funcion predeterminada del objeto window, donde Nombredelafuncionpredet(nombredemifuncion, tiempoMiliseg)
        //se tiene que invocar a la funcion predeterminada dentro de mi funcion
        setTimeout(reloj,1000);
      };
  window.addEventListener("load",reloj);

})(window, document);
