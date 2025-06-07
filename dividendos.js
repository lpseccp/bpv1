document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("dividendo-form");
  const tabela = document.getElementById("tabela-dividendos");
  const corpoTabela = tabela.querySelector("tbody");

  function carregarDividendos() {
    const dividendos = JSON.parse(localStorage.getItem("dividendos") || "[]");
    corpoTabela.innerHTML = "";
    dividendos.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.ativo}</td>
        <td>R$ ${parseFloat(item.valor).toFixed(2)}</td>
        <td>${item.data}</td>
        <td><button onclick="removerDividendo(${index})">Remover</button></td>
      `;
      corpoTabela.appendChild(tr);
    });
  }

  function salvarDividendo(dividendo) {
    const dividendos = JSON.parse(localStorage.getItem("dividendos") || "[]");
    dividendos.push(dividendo);
    localStorage.setItem("dividendos", JSON.stringify(dividendos));
  }

  window.removerDividendo = function (index) {
    const dividendos = JSON.parse(localStorage.getItem("dividendos") || "[]");
    dividendos.splice(index, 1);
    localStorage.setItem("dividendos", JSON.stringify(dividendos));
    carregarDividendos();
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const ativo = document.getElementById("ativo").value.trim();
    const valor = parseFloat(document.getElementById("valor").value);
    const data = document.getElementById("data").value;

    if (!ativo || isNaN(valor) || !data) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    salvarDividendo({ ativo, valor, data });
    form.reset();
    carregarDividendos();
  });

  carregarDividendos();
});