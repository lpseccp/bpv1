// cadastro.js const contaForm = document.getElementById("conta-form"); const contasContainer = document.getElementById("contas-container");

let contas = JSON.parse(localStorage.getItem("contas")) || [];

function salvarContas() { localStorage.setItem("contas", JSON.stringify(contas)); }

function renderizarContas() { contasContainer.innerHTML = ""; contas.forEach((conta, index) => { const div = document.createElement("div"); div.className = "conta-item"; div.innerHTML = <strong>${conta.nome}</strong>: R$ ${conta.valor.toFixed(2)} (${conta.tipo}) <button onclick="removerConta(${index})">Remover</button>; contasContainer.appendChild(div); }); }

function removerConta(index) { contas.splice(index, 1); salvarContas(); renderizarContas(); }

contaForm.addEventListener("submit", (e) => { e.preventDefault(); const nome = document.getElementById("nome-conta").value; const valor = parseFloat(document.getElementById("valor-conta").value); const tipo = document.getElementById("tipo-conta").value;

if (!nome || isNaN(valor)) return;

contas.push({ nome, valor, tipo }); salvarContas(); renderizarContas(); contaForm.reset(); });

renderizarContas();

