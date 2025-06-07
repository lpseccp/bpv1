// resgates.js

document.addEventListener('DOMContentLoaded', () => { const form = document.getElementById('resgate-form'); const listaResgates = document.getElementById('lista-resgates'); const totalResgatado = document.getElementById('total-resgatado');

function carregarResgates() { const resgates = JSON.parse(localStorage.getItem('resgates')) || []; listaResgates.innerHTML = ''; let total = 0; resgates.forEach((resgate, index) => { const li = document.createElement('li'); li.textContent = ${resgate.data} - ${resgate.valor.toFixed(2)} - ${resgate.descricao}; const botaoExcluir = document.createElement('button'); botaoExcluir.textContent = 'Excluir'; botaoExcluir.onclick = () => { resgates.splice(index, 1); localStorage.setItem('resgates', JSON.stringify(resgates)); carregarResgates(); }; li.appendChild(botaoExcluir); listaResgates.appendChild(li); total += resgate.valor; }); totalResgatado.textContent = Total Resgatado: R$ ${total.toFixed(2)}; }

form.addEventListener('submit', (event) => { event.preventDefault(); const data = form.data.value; const valor = parseFloat(form.valor.value); const descricao = form.descricao.value;

if (!data || isNaN(valor) || !descricao) {
  alert('Preencha todos os campos corretamente.');
  return;
}

const resgates = JSON.parse(localStorage.getItem('resgates')) || [];
resgates.push({ data, valor, descricao });
localStorage.setItem('resgates', JSON.stringify(resgates));
form.reset();
carregarResgates();

});

carregarResgates(); });

