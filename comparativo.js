// comparativo.js

document.getElementById("comparar-form").addEventListener("submit", function(e) { e.preventDefault();

const nome1 = document.getElementById("nome1").value; const valor1 = parseFloat(document.getElementById("valor1").value); const nome2 = document.getElementById("nome2").value; const valor2 = parseFloat(document.getElementById("valor2").value);

if (!nome1 || isNaN(valor1) || !nome2 || isNaN(valor2)) return;

const resultado = document.getElementById("resultado-comparativo"); if (valor1 > valor2) { resultado.textContent = ${nome1} tem valor maior que ${nome2}; } else if (valor2 > valor1) { resultado.textContent = ${nome2} tem valor maior que ${nome1}; } else { resultado.textContent = ${nome1} e ${nome2} têm o mesmo valor; }

desenharGraficoComparativo(nome1, valor1, nome2, valor2); });

function desenharGraficoComparativo(nome1, valor1, nome2, valor2) { const ctx = document.getElementById("grafico-comparativo").getContext("2d"); if (window.comparativoChart) window.comparativoChart.destroy();

window.comparativoChart = new Chart(ctx, { type: 'bar', data: { labels: [nome1, nome2], datasets: [{ label: 'Valor dos ativos', data: [valor1, valor2], backgroundColor: ['#42a5f5', '#66bb6a'] }] }, options: { scales: { y: { beginAtZero: true } } } }); }

