// projecoes.js

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-projecao");
  const resultados = document.getElementById("resultados-projecao");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const valorInicial = parseFloat(document.getElementById("valor-inicial").value);
    const aporteMensal = parseFloat(document.getElementById("aporte-mensal").value);
    const taxaJuros = parseFloat(document.getElementById("taxa-juros").value) / 100;
    const meses = parseInt(document.getElementById("periodo").value);

    if (isNaN(valorInicial) || isNaN(aporteMensal) || isNaN(taxaJuros) || isNaN(meses)) {
      resultados.innerHTML = "<p>Por favor, preencha todos os campos corretamente.</p>";
      return;
    }

    let montante = valorInicial;
    let historico = [];

    for (let i = 1; i <= meses; i++) {
      montante = montante * (1 + taxaJuros) + aporteMensal;
      historico.push({ mes: i, valor: montante });
    }

    resultados.innerHTML = `
      <p><strong>Montante final:</strong> R$ ${montante.toFixed(2)}</p>
      <h4>Projeção Mensal:</h4>
      <ul>
        ${historico.map(item => `<li>Mês ${item.mes}: R$ ${item.valor.toFixed(2)}</li>`).join("")}
      </ul>
    `;
  });
});