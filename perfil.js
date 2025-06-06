// perfil.js

document.getElementById("perfil-form").addEventListener("submit", function(e) { e.preventDefault();

const nome = document.getElementById("nome").value; const idade = parseInt(document.getElementById("idade").value); const experiencia = document.getElementById("experiencia").value; const tolerancia = document.getElementById("tolerancia").value;

const perfil = { nome, idade, experiencia, tolerancia };

localStorage.setItem("perfilInvestidor", JSON.stringify(perfil));

alert("Perfil salvo com sucesso!"); document.getElementById("perfil-form").reset(); });

window.addEventListener("DOMContentLoaded", () => { const perfil = JSON.parse(localStorage.getItem("perfilInvestidor")); if (perfil) { document.getElementById("nome").value = perfil.nome || ""; document.getElementById("idade").value = perfil.idade || ""; document.getElementById("experiencia").value = perfil.experiencia || ""; document.getElementById("tolerancia").value = perfil.tolerancia || ""; } });

