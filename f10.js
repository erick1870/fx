window.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);
  const efectivoUno = $("efectivo1");
  const dividirPersonas = $("dividir-per");
  const calcu = document.querySelectorAll(".calcu");
  const montoPorPersona = $("monto-personalizado");
  const totalPorPersona = $("monto-total");
  const resetBtn = document.querySelector(".reset");
  const montoPersonalizado = document.querySelector(".monto-amedida");
  const error = document.querySelector(".error");

  efectivoUno.addEventListener("input", efectivoUnoFun);
  dividirPersonas.addEventListener("input", dividirPersonasFun);
  calcu.forEach((val) => {
    val.addEventListener("click", handleClick);
  });
  resetBtn.addEventListener("click", reset);
  montoPersonalizado.addEventListener("input", anadirmontoFun);

  let efectivoValue = 0.0;
  let porpersonaValue = 1;
  let montoValue = 0.15;

  function efectivoUnoFun() {
    efectivoValue = parseFloat(efectivoUno.value);
    calcularMonto();
  }

  function anadirmontoFun() {
    montoValue = parseFloat(montoPersonalizado.value / 100);

    calcu.forEach((val) => {
      val.classList.remove("active-monto");
    });
    calcularMonto();
  }

  function dividirPersonasFun() {
    porpersonaValue = parseFloat(dividirPersonas.value);

    if (porpersonaValue < 1) {
      error.style.display = "flex";
      dividirPersonas.style.border = "3px solid #B68372";
    } else {
      error.style.display = "none";
      dividirPersonas.style.border = "none";
      calcularMonto();
    }
  }

  function handleClick(event) {
    calcu.forEach((val) => {
      val.classList.remove("active-monto");
      if (event.target.innerHTML == val.innerHTML) {
        val.classList.add("active-monto");
        montoValue = parseFloat(val.innerHTML) / 100;
      }
    });
    calcularMonto();
  }

  function calcularMonto() {
    if (porpersonaValue >= 1) {
      let cantidadPropina = (efectivoValue * montoValue) / porpersonaValue;
      let total = (efectivoValue + cantidadPropina) / porpersonaValue;
      montoPorPersona.innerHTML = "$" + cantidadPropina.toFixed(2);
      totalPorPersona.innerHTML = "$" + total.toFixed(2);
    }
  }

  function reset() {
    efectivoUno.value = "0.0";
    efectivoUnoFun();
    dividirPersonas.value = "";
    dividirPersonasFun();
    montoPersonalizado.value = "";
  }

  // re iniciar todo
  efectivoUnoFun();
  dividirPersonasFun();
});
