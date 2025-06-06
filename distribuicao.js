// distribuicao.js

// Simulação de dados para distribuição const distribuicaoDados = [ { categoria: 'Renda Fixa', percentual: 35 }, { categoria: 'Ações', percentual: 25 }, { categoria: 'Fundos Imobiliários', percentual: 15 }, { categoria: 'Tesouro Direto', percentual: 10 }, { categoria: 'Internacional', percentual: 10 }, { categoria: 'Criptomoedas', percentual: 5 } ];

function desenharGraficoDistribuicao() { const ctx = document.getElementById("graficoDistribuicao").getContext("2d");

new Chart(ctx, { type: "pie", data: { labels: distribuicaoDados.map(d => d.categoria), datasets: [{ data: distribuicaoDados.map(d => d.percentual), backgroundColor: [ "#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#00bcd4", "#e91e63" ] }] }, options: { responsive: true, plugins: { legend: { position: 'bottom' } } } }); }

document.addEventListener("DOMContentLoaded", () => { desenharGraficoDistribuicao(); });

