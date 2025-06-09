document.addEventListener("DOMContentLoaded", function () {
  const dadosBalanco = [
    { categoria: "Ativo", descricao: "Caixa", valor: 10000 },
    { categoria: "Ativo", descricao: "Contas a Receber", valor: 5000 },
    { categoria: "Passivo", descricao: "Contas a Pagar", valor: 3000 },
    { categoria: "Patrimônio Líquido", descricao: "Capital Social", valor: 12000 }
  ];

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = ""; // Limpa conteúdo inicial da tabela

  dadosBalanco.forEach(item => {
    const linha = document.createElement("tr");

    const tdCategoria = document.createElement("td");
    tdCategoria.textContent = item.categoria;

    const tdDescricao = document.createElement("td");
    tdDescricao.textContent = item.descricao;

    const tdValor = document.createElement("td");
    tdValor.textContent = item.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    linha.appendChild(tdCategoria);
    linha.appendChild(tdDescricao);
    linha.appendChild(tdValor);

    tbody.appendChild(linha);
  });
});