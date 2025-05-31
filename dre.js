// dre.js const dreForm = document.getElementById("dre-form"); const dreContainer = document.getElementById("dre-container"); const receitasTotalEl = document.getElementById("receitas-total"); const despesasTotalEl = document.getElementById("despesas-total"); const resultadoEl = document.getElementById("resultado");

let dreItens = JSON.parse(localStorage.getItem("dreItens")) || [];

function salvarDRE() { localStorage.setItem("dreItens", JSON.stringify(dreItens)); }

function renderizarDRE() { dreContainer.innerHTML = ""; dreItens.forEach((item, index) => { const div = document.createElement("div"); div.className = "dre-item"; div.innerHTML = <strong>${item.nome}</strong>: R$ ${item.valor.toFixed(2)} (${item.tipo}) <button onclick="removerDRE(${index})">Remover</button>; dreContainer.appendChild(div); }); atualizarTotaisDRE(); }

function removerDRE(index) { dreItens.splice(index, 1); salvarDRE(); renderizarDRE(); }

dreForm.addEventListener("submit", (e) => { e.preventDefault(); const nome = document.getElementById("nome-dre").value; const valor = parseFloat(document.getElementById("valor-dre").value); const tipo = document.getElementById("tipo-dre").value;

if (!nome || isNaN(valor)) return;

dreItens.push({ nome, valor, tipo }); salvarDRE(); renderizarDRE(); dreForm.reset(); });

function atualizarTotaisDRE() { const receitas = dreItens.filter(i => i.tipo === "receita"); const despesas = dreItens.filter(i => i.tipo === "despesa");

const totalReceitas = receitas.reduce((acc, i) => acc + i.valor, 0); const totalDespesas = despesas.reduce((acc, i) => acc + i.valor, 0); const resultado = totalReceitas - totalDespesas;

receitasTotalEl.textContent = totalReceitas.toFixed(2); despesasTotalEl.textContent = totalDespesas.toFixed(2); resultadoEl.textContent = ${resultado >= 0 ? "Lucro" : "Prejuízo"}: R$ ${Math.abs(resultado).toFixed(2)}; }

renderizarDRE();

