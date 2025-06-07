// resumo.js

document.addEventListener("DOMContentLoaded", () => {
  atualizarResumo();

  const atualizarBtn = document.getElementById("atualizarResumo");
  if (atualizarBtn) {
    atualizarBtn.addEventListener("click", atualizarResumo);
  }
});

function atualizarResumo() {
  const ativos = JSON.parse(localStorage.getItem("ativos")) || [];

  let totalInvestido = 0;
  let totalIdeal = 0;
  let totalSaldo = 0;

  ativos.forEach((ativo) => {
    const preco = parseFloat(ativo.precoAtual || 0);
    const saldo = parseFloat(ativo.saldo || 0);
    const ideal = parseFloat(ativo.carteiraIdeal || 0);

    totalInvestido += preco * saldo;
    totalSaldo += saldo;
    totalIdeal += ideal;
  });

  const diferenca = totalIdeal - totalSaldo;
  const percentual = totalIdeal > 0 ? ((totalSaldo / totalIdeal) * 100).toFixed(2) : "0.00";

  document.getElementById("totalInvestido").textContent = `R$ ${totalInvestido.toFixed(2)}`;
  document.getElementById("totalIdeal").textContent = `R$ ${totalIdeal.toFixed(2)}`;
  document.getElementById("totalSaldo").textContent = `R$ ${totalSaldo.toFixed(2)}`;
  document.getElementById("diferencaResumo").textContent = `R$ ${diferenca.toFixed(2)}`;
  document.getElementById("percentualResumo").textContent = `${percentual}%`;
}