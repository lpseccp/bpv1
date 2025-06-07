// Arquivo: simulador.js

document.addEventListener("DOMContentLoaded", function () { const formulario = document.getElementById("formSimulador"); const resultado = document.getElementById("resultadoSimulador");

formulario.addEventListener("submit", function (event) { event.preventDefault();

const valorInicial = parseFloat(document.getElementById("valorInicial").value);
const aporteMensal = parseFloat(document.getElementById("aporteMensal").value);
const taxa = parseFloat(document.getElementById("taxa").value);
const meses = parseInt(document.getElementById("meses").value);

let valorFinal = valorInicial;
let historico = [];

for (let i = 1; i <= meses; i++) {
  valorFinal = (valorFinal + aporteMensal) * (1 + taxa / 100);
  historico.push({
    mes: i,
    valor: valorFinal.toFixed(2)
  });
}

resultado.innerHTML = `<h3>Valor Final: R$ ${valorFinal.toFixed(2)}</h3><h4>Projeção:</h4><ul>` +
  historico.map(entry => `<li>Mês ${entry.mes}: R$ ${entry.valor}</li>`).join("") +
  "</ul>";

}); });

