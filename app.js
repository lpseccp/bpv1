// app.js

// Recupera contas do localStorage
function getContas() {
  return JSON.parse(localStorage.getItem("contas") || "[]");
}

// Salva contas no localStorage
function salvarContas(contas) {
  localStorage.setItem("contas", JSON.stringify(contas));
}

// Adiciona uma nova conta
function adicionarConta() {
  const nomeInput = document.getElementById("nome");
  const valorInput = document.getElementById("valor");
  const tipoInput = document.getElementById("tipo");

  if (!nomeInput || !valorInput || !tipoInput) {
    alert("Elementos do formulário não encontrados!");
    return;
  }

  const nome = nomeInput.value.trim();
  const valor = parseFloat(valorInput.value);
  const tipo = tipoInput.value;

  if (!nome || isNaN(valor)) {
    alert("Preencha corretamente o nome e o valor!");
    return;
  }

  const novaConta = { nome, valor, tipo };
  const contas = getContas();
  contas.push(novaConta);
  salvarContas(contas);

  nomeInput.value = "";
  valorInput.value = "";
  tipoInput.value = "entrada"; // ou valor padrão

  listarContas();
}

// Remove uma conta pelo índice
function removerConta(index) {
  const contas = getContas();
  contas.splice(index, 1);
  salvarContas(contas);
  listarContas();
}

// Lista as contas no elemento <ul id="listaContas">
function listarContas() {
  const lista = document.getElementById("listaContas");
  if (!lista) return;

  lista.innerHTML = "";
  const contas = getContas();

  if (contas.length === 0) {
    lista.innerHTML = "<li>Nenhuma conta cadastrada.</li>";
    return;
  }

  contas.forEach((conta, index) => {
    const item = document.createElement("li");
    item.textContent = `${conta.nome}: R$ ${conta.valor.toFixed(2)} (${conta.tipo})`;

    const btn = document.createElement("button");
    btn.textContent = "Remover";
    btn.onclick = () => removerConta(index);

    item.appendChild(btn);
    lista.appendChild(item);
  });
}

// Carrega as contas ao iniciar
document.addEventListener("DOMContentLoaded", listarContas);