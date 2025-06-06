document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orcamento-form");
  const tabela = document.getElementById("tabela-orcamento").getElementsByTagName("tbody")[0];
  const totalEl = document.getElementById("orcamento-total");

  let orcamentos = JSON.parse(localStorage.getItem("orcamentos")) || [];

  function salvar() {
    localStorage.setItem("orcamentos", JSON.stringify(orcamentos));
  }

  function renderizar() {
    tabela.innerHTML = "";
    let total = 0;

    orcamentos.forEach((item, index) => {
      const linha = tabela.insertRow();

      linha.innerHTML = `
        <td>${item.categoria}</td>
        <td>${item.descricao}</td>
        <td>R$ ${item.valor.toFixed(2)}</td>
        <td><button onclick="removerOrcamento(${index})">Remover</button></td>
      `;
      total += item.valor;
    });

    totalEl.textContent = `R$ ${total.toFixed(2)}`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const categoria = document.getElementById("categoria").value;
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);

    if (!categoria || !descricao || isNaN(valor)) return;

    orcamentos.push({ categoria, descricao, valor });
    salvar();
    renderizar();
    form.reset();
  });

  window.removerOrcamento = (index) => {
    orcamentos.splice(index, 1);
    salvar();
    renderizar();
  };

  renderizar();
});