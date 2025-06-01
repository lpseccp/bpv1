// dre.js

document.addEventListener("DOMContentLoaded", () => { const form = document.getElementById("dre-form"); const receitaInput = document.getElementById("receita"); const custoInput = document.getElementById("custo"); const despesasInput = document.getElementById("despesas"); const resultadoEl = document.getElementById("resultado"); const graficoCtx = document.getElementById("grafico-dre").getContext("2d");

let dreData = JSON.parse(localStorage.getItem("dreData")) || [];

function salvarDados() { localStorage.setItem("dreData", JSON.stringify(dreData)); }

function atualizarResultado() { if (dreData.length === 0) { resultadoEl.textContent = "Nenhum dado cadastrado."; return; }

const totalReceita = dreData.reduce((acc, item) => acc + item.receita, 0);
const totalCusto = dreData.reduce((acc, item) => acc + item.custo, 0);
const totalDespesas = dreData.reduce((acc, item) => acc + item.despesas, 0);
const lucro = totalReceita - totalCusto - totalDespesas;

resultadoEl.innerHTML = `
  <p><strong>Total Receita:</strong> R$ ${totalReceita.toFixed(2)}</p>
  <p><strong>Total Custo:</strong> R$ ${totalCusto.toFixed(2)}</p>
  <p><strong>Total Despesas:</strong> R$ ${totalDespesas.toFixed(2)}</p>
  <p><strong>Lucro Líquido:</strong> R$ ${lucro.toFixed(2)}</p>
`;

desenharGrafico(totalReceita, totalCusto, totalDespesas, lucro);

}

function desenharGrafico(receita, custo, despesas, lucro) { if (window.graficoDRE) window.graficoDRE.destroy();

window.graficoDRE = new Chart(graficoCtx, {
  type: 'bar',
  data: {
    labels: ['Receita', 'Custo', 'Despesas', 'Lucro'],
    datasets: [{
      label: 'DRE (Demonstração do Resultado do Exercício)',
      data: [receita, custo, despesas, lucro],
      backgroundColor: ['#4caf50', '#f44336', '#ff9800', '#2196f3']
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

}

form.addEventListener("submit", (e) => { e.preventDefault();

const receita = parseFloat(receitaInput.value);
const custo = parseFloat(custoInput.value);
const despesas = parseFloat(despesasInput.value);

if (isNaN(receita) || isNaN(custo) || isNaN(despesas)) return;

dreData.push({ receita, custo, despesas });
salvarDados();
atualizarResultado();
form.reset();

});

atualizarResultado(); });

