// drl.js 
const drlForm = document.getElementById("drl-form"); const drlContainer = document.getElementById("drl-container"); const lucroLiquidoDrlEl = document.getElementById("lucro-liquido-drl"); const distribuicoesEl = document.getElementById("distribuicoes"); const restanteLucroEl = document.getElementById("restante-lucro");

let distribuicoes = JSON.parse(localStorage.getItem("distribuicoes")) || [];

function salvarDistribuicoes() { localStorage.setItem("distribuicoes", JSON.stringify(distribuicoes)); }

function renderizarDistribuicoes() { drlContainer.innerHTML = ""; distribuicoes.forEach((item, index) => { const div = document.createElement("div"); div.className = "drl-item"; div.innerHTML = <strong>${item.destino}</strong>: R$ ${item.valor.toFixed(2)} <button onclick="removerDistribuicao(${index})">Remover</button>; drlContainer.appendChild(div); }); atualizarResumoDRL(); }

function removerDistribuicao(index) { distribuicoes.splice(index, 1); salvarDistribuicoes(); renderizarDistribuicoes(); }

drlForm.addEventListener("submit", (e) => { e.preventDefault(); const destino = document.getElementById("drl-destino").value; const valor = parseFloat(document.getElementById("drl-valor").value);

if (!destino || isNaN(valor)) return;

distribuicoes.push({ destino, valor }); salvarDistribuicoes(); renderizarDistribuicoes(); drlForm.reset(); });

function atualizarResumoDRL() { const lucroLiquido = parseFloat(localStorage.getItem("lucroLiquido")) || 0; const totalDistribuido = distribuicoes.reduce((acc, i) => acc + i.valor, 0); const restante = lucroLiquido - totalDistribuido;

lucroLiquidoDrlEl.textContent = lucroLiquido.toFixed(2); distribuicoesEl.textContent = totalDistribuido.toFixed(2); restanteLucroEl.textContent = restante.toFixed(2); }

renderizarDistribuicoes();

