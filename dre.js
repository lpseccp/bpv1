// dre.js
const dreForm = document.getElementById("dre-form");
const receitasContainer = document.getElementById("receitas-lista");
const despesasContainer = document.getElementById("despesas-lista");
const totalReceitasEl = document.getElementById("total-receitas");
const totalDespesasEl = document.getElementById("total-despesas");
const lucroPrejuizoEl = document.getElementById("lucro-prejuizo");

let dreDados = JSON.parse(localStorage.getItem("dreDados")) || [];

function salvarDre() {
  localStorage.setItem("dreDados", JSON.stringify(dreDados));
}

function renderizarDre() {
  receitasContainer.innerHTML = "";
  despesasContainer.innerHTML = "";

  const receitas = dreDados.filter(item => item.tipo === "receita");
  const despesas = dreDados.filter(item => item.tipo === "despesa");

  let totalReceitas = 0;
  let totalDespesas = 0;

  receitas.forEach((item, index) => {
    totalReceitas += item.valor;
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `${item.nome}: R$ ${item.valor.toFixed(2)} <button onclick="removerItem(${index})">Remover</button>`;
    receitasContainer.appendChild(div);
  });

  despesas.forEach((item, index) => {
    totalDespesas += item.valor;
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `${item.nome}: R$ ${item.valor.toFixed(2)} <button onclick="removerItem(${index})">Remover</button>`;
    despesasContainer.appendChild(div);
  });

  const lucro = totalReceitas - totalDespesas;

  totalReceitasEl.textContent = totalReceitas.toFixed(2);
  totalDespesasEl.textContent = totalDespesas.toFixed(2);
  lucroPrejuizoEl.textContent = `${lucro >= 0 ? 'Lucro' : 'Prejuízo'}: R$ ${Math.abs(lucro).toFixed(2)}`;

  desenharGraficoReceitaDespesa(totalReceitas, totalDespesas);
}

function removerItem(index) {
  dreDados.splice(index, 1);
  salvarDre();
  renderizarDre();
}

dreForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome-dre").value;
  const valor = parseFloat(document.getElementById("valor-dre").value);
  const tipo = document.getElementById("tipo-dre").value;

  if (!nome || isNaN(valor)) return;

  dreDados.push({ nome, valor, tipo });
  salvarDre();
  renderizarDre();
  dreForm.reset();
});

function desenharGraficoReceitaDespesa(receitas, despesas) {
  const ctx = document.getElementById("grafico-dre").getContext("2d");

  if (window.dreChart) {
    window.dreChart.destroy();
  }

  window.dreChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Receitas", "Despesas"],
      datasets: [{
        label: "R$",
        data: [receitas, despesas],
        backgroundColor: ["#4caf50", "#f44336"]
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Inicializar
renderizarDre();