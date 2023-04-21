const validator = {
  isValid: function (numeroDeTarjeta) {
    // console.log(numeroDeTarjeta)
    const array = numeroDeTarjeta.split("");
    // Invierte el orden de los elementos en el array
    const numero = array.reverse();
    const resultado = [];
    let caracter = "";
    let separacion = [];
    let separacion1 = [];
    let separacion2 = [];
    let entero = 0;

    for (let i = 0; i < numero.length; i++) {
      if (i % 2 === 1) {
        resultado[i] = numero[i] * 2;
        if (resultado[i] >= 10) {
          caracter = resultado[i].toString();
          separacion = caracter.split("");
          separacion1 = parseInt(separacion[0]);
          separacion2 = parseInt(separacion[1]);
          entero = separacion1 + separacion2;
          resultado[i] = entero;
        }
      } else {
        resultado[i] = numero[i];
      }
    }
    let suma = 0;
    //ciclo para sumar todo y covercion de array a numeros
    for (let i = 0; i < resultado.length; i++) {
      suma += parseInt(resultado[i]);
    }
    const division = suma % 10;

    if (division === 0) {
      return true;
    } else {
      return false;
    }
  },

  maskify: function (enmascarar) {
    const conversion = enmascarar.split("");
    for (let i = 0; i < enmascarar.length-4; i++) {
      //if (enmascarar.length <= 12) {
        conversion[i] = "#";
    }
    return conversion.join("");
  },
};

export default validator;
