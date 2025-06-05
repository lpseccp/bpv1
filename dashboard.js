// dashboard.js

document.addEventListener("DOMContentLoaded", () => { const dadosDashboard = [ { titulo: "Ativos", valor: localStorage.getItem("totalAtivos") || 0, cor: "#4caf50" }, { titulo: "Passivos", valor: localStorage.getItem("totalPassivos") || 0, cor: "#f44336" }, { titulo: "Saldo Ideal", valor: localStorage.getItem("saldoIdeal") || 0, cor: "#2196f3" }, ];

const container = document.getElementById("dashboard-container");

dadosDashboard.forEach((item) => { const card = document.createElement("div"); card.className = "dashboard-card"; card.innerHTML = <h3 style="color: ${item.cor}">${item.titulo}</h3> <p>R$ ${parseFloat(item.valor).toFixed(2)}</p>; container.appendChild(card); }); });

