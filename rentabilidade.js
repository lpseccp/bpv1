// rentabilidade.js

document.addEventListener("DOMContentLoaded", () => {
  const investimentoInput = document.getElementById("investimento-inicial");
  const retornoInput = document.getElementById("retorno-final");
  const calcularBtn = document.getElementById("calcular-rentabilidade");
  const resultadoEl = document.getElementById("resultado-rentabilidade");

  calcularBtn.addEventListener("click", () => {
    const investimento = parseFloat(investimentoInput.value);
    const retorno = parseFloat(retornoInput.value);

    if (isNaN(investimento) || isNaN(retorno) || investimento <= 0) {
      resultadoEl.textContent = "Por favor, insira valores válidos.";
      return;
    }

    const rentabilidade = ((retorno - investimento) / investimento) * 100;
    resultadoEl.textContent = `Rentabilidade: ${rentabilidade.toFixed(2)}%`;
  });
});