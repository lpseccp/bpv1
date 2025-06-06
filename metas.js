// metas.js
document.addEventListener("DOMContentLoaded", () => {
  const metasForm = document.getElementById("metas-form");
  const metasLista = document.getElementById("metas-lista");

  let metas = JSON.parse(localStorage.getItem("metas")) || [];

  function salvarMetas() {
    localStorage.setItem("metas", JSON.stringify(metas));
  }

  function renderizarMetas() {
    metasLista.innerHTML = "";
    metas.forEach((meta, index) => {
      const item = document.createElement("div");
      item.className = "meta-item";
      item.innerHTML = `
        <strong>${meta.objetivo}</strong><br>
        Valor alvo: R$ ${meta.valorAlvo.toFixed(2)}<br>
        Valor atual: R$ ${meta.valorAtual.toFixed(2)}<br>
        Progresso: ${(meta.valorAtual / meta.valorAlvo * 100).toFixed(1)}%<br>
        <button onclick="removerMeta(${index})">Remover</button>
      `;
      metasLista.appendChild(item);
    });
  }

  window.removerMeta = function(index) {
    metas.splice(index, 1);
    salvarMetas();
    renderizarMetas();
  }

  metasForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const objetivo = document.getElementById("objetivo-meta").value;
    const valorAlvo = parseFloat(document.getElementById("valor-alvo").value);
    const valorAtual = parseFloat(document.getElementById("valor-atual").value);

    if (!objetivo || isNaN(valorAlvo) || isNaN(valorAtual)) return;

    metas.push({ objetivo, valorAlvo, valorAtual });
    salvarMetas();
    renderizarMetas();
    metasForm.reset();
  });

  renderizarMetas();
});