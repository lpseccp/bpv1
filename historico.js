// historico.js

// Recuperar histórico do localStorage let historicoOperacoes = JSON.parse(localStorage.getItem("historicoOperacoes")) || [];

function salvarHistorico() { localStorage.setItem("historicoOperacoes", JSON.stringify(historicoOperacoes)); }

function adicionarAoHistorico(descricao, valor, tipo) { const data = new Date().toLocaleDateString(); historicoOperacoes.push({ data, descricao, valor, tipo }); salvarHistorico(); renderizarHistorico(); }

function renderizarHistorico() { const lista = document.getElementById("lista-historico"); lista.innerHTML = ""; historicoOperacoes.forEach((item, index) => { const li = document.createElement("li"); li.innerHTML = <strong>${item.data}</strong> - ${item.descricao}: R$ ${item.valor.toFixed(2)} (${item.tipo}) <button onclick="removerHistorico(${index})">Remover</button>; lista.appendChild(li); }); }

function removerHistorico(index) { historicoOperacoes.splice(index, 1); salvarHistorico(); renderizarHistorico(); }

document.addEventListener("DOMContentLoaded", () => { renderizarHistorico(); });

