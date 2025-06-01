// fluxo.js

const formFluxo = document.getElementById("form-fluxo");
const tabelaFluxo = document.getElementById("tabela-fluxo");
const resumoEntradas = document.getElementById("resumo-entradas");
const resumoSaidas = document.getElementById("resumo-saidas");
const resumoSaldo = document.getElementById("resumo-saldo");

let lancamentos = JSON.parse(localStorage.getItem("lancamentos_fluxo")) || [];

function salvarLancamentos() {
  localStorage.setItem("lancamentos_fluxo", JSON.stringify(lancamentos));
}

function atualizarTabela() {
  tabelaFluxo.innerHTML = "";
  lancamentos.forEach((item, index) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${item.data}</td>
      <td>${item.descricao}</td>
      <td>${item.tipo === "entrada" ? "Entrada" : "Saída"}</td>
      <td class="${item.tipo === 'entrada' ? 'positivo' : 'negativo'}">R$ ${item.valor.toFixed(2)}</td>
      <td><button onclick="removerLancamento(${index})">Remover</button></td>
    `;
    tabelaFluxo.appendChild(linha);
  });
  atualizarResumo();
  desenharGraficoFluxo();
}

function atualizarResumo() {
  const entradas = lancamentos.filter(l => l.tipo === "entrada").reduce((s, l) => s + l.valor, 0);
  const saidas = lancamentos.filter(l => l.tipo === "saida").reduce((s, l) => s + l.valor, 0);
  const saldo = entradas - saidas;

  resumoEntradas.textContent = entradas.toFixed(2);
  resumoSaidas.textContent = saidas.toFixed(2);
  resumoSaldo.textContent = saldo.toFixed(2);
  resumoSaldo.className = saldo >= 0 ? "positivo" : "negativo";
}

formFluxo.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = document.getElementById("data-lancamento").value;
  const descricao = document.getElementById("descricao").value;
  const tipo = document.getElementById("tipo").value;
  const valor = parseFloat(document.getElementById("valor").value);

  if (!data || !descricao || isNaN(valor)) return;

  lancamentos.push({ data, descricao, tipo, valor });
  salvarLancamentos();
  atualizarTabela();
  formFluxo.reset();
});

function removerLancamento(index) {
  lancamentos.splice(index, 1);
  salvarLancamentos();
  atualizarTabela();
}

function desenharGraficoFluxo() {
  const ctx = document.getElementById("grafico-fluxo").getContext("2d");

  if (window.fluxoChart) {
    window.fluxoChart.destroy();
  }

  const entradas = lancamentos.filter(l => l.tipo === "entrada").reduce((s, l) => s + l.valor, 0);
  const saidas = lancamentos.filter(l => l.tipo === "saida").reduce((s, l) => s + l.valor, 0);

  window.fluxoChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Entradas", "Saídas"],
      datasets: [{
        label: "Fluxo de Caixa",
        data: [entradas, saidas],
        backgroundColor: ["#4caf50", "#f44336"]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Inicialização
atualizarTabela();