// consolidado.js

document.addEventListener("DOMContentLoaded", () => { const consolidadoContainer = document.getElementById("consolidado-container"); const ctx = document.getElementById("grafico-consolidado").getContext("2d");

const contas = JSON.parse(localStorage.getItem("contas")) || [];

const ativos = contas.filter(c => c.tipo === "ativo"); const passivos = contas.filter(c => c.tipo === "passivo");

const totalAtivos = ativos.reduce((acc, c) => acc + c.valor, 0); const totalPassivos = passivos.reduce((acc, c) => acc + c.valor, 0); const saldoLiquido = totalAtivos - totalPassivos;

const percentualAtivos = totalAtivos > 0 ? ((totalAtivos / (totalAtivos + totalPassivos)) * 100).toFixed(2) : 0; const percentualPassivos = totalPassivos > 0 ? ((totalPassivos / (totalAtivos + totalPassivos)) * 100).toFixed(2) : 0;

consolidadoContainer.innerHTML = <p><strong>Total de Ativos:</strong> R$ ${totalAtivos.toFixed(2)}</p> <p><strong>Total de Passivos:</strong> R$ ${totalPassivos.toFixed(2)}</p> <p><strong>Saldo Líquido:</strong> R$ ${saldoLiquido.toFixed(2)}</p> <p><strong>Percentual de Ativos:</strong> ${percentualAtivos}%</p> <p><strong>Percentual de Passivos:</strong> ${percentualPassivos}%</p>;

new Chart(ctx, { type: 'doughnut', data: { labels: ['Ativos', 'Passivos'], datasets: [{ label: 'Distribuição Consolidada', data: [totalAtivos, totalPassivos], backgroundColor: ['#4caf50', '#f44336'] }] }, options: { responsive: true, plugins: { legend: { position: 'bottom' } } } }); });

