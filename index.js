
import validator from './validator.js';
//creacion variables
let mes = document.getElementById('mes').value;
let anio = document.getElementById('anio').value;

const vista1 = document.getElementById("vista1");
const vista2 = document.getElementById("vista2");
const botonContinuar = document.getElementById("continuar");
const cardNumberDisplay = document.getElementById('numero-en-tarjeta');
const cardNameDisplay = document.getElementById('nombre-en-tarjeta');
const cardNameInput = document.getElementById('nom');
let bandera = true;
let i = 0;
let tarjetaOriginal = [];
let cardNumber = "";
const botonEnviar = document.getElementById("botonEnviar");
const valor = document.getElementById("tarjeta");
const cardImage = document.getElementById("card-image");
//validamos la entrada en los dos selectores de fecha, mes y año, depende el valor seleccionado se asigna a cada variable correspondiente
document.addEventListener('DOMContentLoaded', function () {
  //leo los cambios en el documento
  document.getElementById('anio').addEventListener('change', function () { //cuando hay un cambio en el selector de mes o año se activa la funcion
    mes = document.getElementById('mes').value; //se lee el valor de mes
    anio = document.getElementById('anio').value; //se lee el valor de año

    //en este if miramos si mes y año vienen o no vacios
    if (mes !== '' && anio !== '') { // si no viene vacio asigna los valores de mes y año y los concatena con un guion medio
      document.getElementById('fecha-en-tarjeta').value = mes + '-' + anio;
    } else { // si viene vacio, se asigna vacio a el valor que se muestra en la tarjeta
      document.getElementById('fecha-en-tarjeta').value = '';
    }
  });
});

//tener visible la vista 1 inicialmente
vista1.style.display = "block";
vista2.style.display = "none";
botonContinuar.style.display = "block";

//evento cuando se presiona el boton continuar para cambiar a la segunda vista
botonContinuar.addEventListener("click", function () {
  vista1.style.display = "none";
  vista2.style.display = "block";
  botonContinuar.style.display = "block";
});

//evento cuando hay un cambio en la caja de texto del numeor de tarjeta, es decir cuando se ingresa un digito
valor.addEventListener('input', function (event) {
  const regex = /[^0-9]/;  // esta variable regex funciona para asignarle los valore de 0 a 9 
  cardNumber = event.target.value;
  if (regex.test(cardNumber[i]) === true && cardNumber[i] !== undefined) {
    alert('...Estas ingresando un valor diferente a un numero \n  Por favor, vuelve a intentarlo...');
    this.value = '';
    i = 0;
    cardNumber = "";
  } else if (cardNumber[i] === undefined) {

    i = i - 1;
    if (i <= 0) {
      cardNumber = "";
      bandera = true;
    }
  } else {
    tarjetaOriginal[i] = cardNumber[i];
    i = i + 1;

    if (cardNumber.startsWith('4') && bandera === true) {
      // Visa
      cardImage.src = "tarjetaVisa.jpg";
      bandera = false;
    } else if (cardNumber.startsWith('5') && bandera === true) {
      // Mastercard
      cardImage.src = "tarjetaMasterCard.jpg";
      bandera = false;
    } else if (cardNumber.startsWith('3') && bandera === true) {
      // American Express
      cardImage.src = "tarjetaAmericanExpress.jpg";
      bandera = false;
    } else if (cardNumber === ('')) {
      // Otra tarjeta
      cardImage.src = "tarjeta.jpg";
      bandera = true;

    }
    // variable para info del cuadro de texto
    const tarjeta = document.getElementById("tarjeta").value;

    const enmascarar = validator.maskify(tarjeta);
    cardNumberDisplay.value = enmascarar.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();

    return document.getElementById("tarjeta").value = enmascarar; // se sobrescribe el numero
  }
}
)
botonEnviar.addEventListener("click", function () {

  if (cardNameInput.value === "" || valor.value === "" || mes.value === '' || anio.value === '') {
    alert("todos los campos son requeridos")
  } else {
    // variable para info del cuadro de texto
    let targetaFinal = tarjetaOriginal.join("")


    const tarjetaValida = validator.isValid(targetaFinal);
    if (tarjetaValida === true && targetaFinal !== "") {

      alert("tu tarjeta es valida")
      targetaFinal = "";
      tarjetaOriginal = [];
      i = 0;
      cardNumber = "";
      bandera = true;
      cardImage.src = "tarjeta.jpg";
      return document.getElementById("fecha-en-tarjeta").value = "", document.getElementById("numero-en-tarjeta").value = "", document.getElementById("nombre-en-tarjeta").value = "", document.getElementById("tarjeta").value = "", document.getElementById("nom").value = "", document.getElementById("mes").value = "", document.getElementById("anio").value = "";

    } else {
      alert("tu tarjeta no es valida")

      targetaFinal = "";
      tarjetaOriginal = [];
      i = 0;
      cardNumber = '';
      bandera = true;
      cardImage.src = "tarjeta.jpg";
      return document.getElementById("fecha-en-tarjeta").value = "", document.getElementById("numero-en-tarjeta").value = "", document.getElementById("nombre-en-tarjeta").value = "", document.getElementById("tarjeta").value = "", document.getElementById("nom").value = "", document.getElementById("mes").value = "", document.getElementById("anio").value = "";

    }
  }
})

cardNameInput.addEventListener('input', function (event) {
  // Leer el valor actual del campo de entrada de texto



  const cardName = event.target.value;

  // Leer el valor actual del campo de entrada de texto

  cardNameDisplay.value = cardName;

  // Actualizar el campo de texto de visualización

});
