// indicadores.js

document.addEventListener("DOMContentLoaded", () => { const indicadoresContainer = document.getElementById("indicadores-container");

const contas = JSON.parse(localStorage.getItem("contas")) || [];

const totalAtivos = contas .filter((c) => c.tipo === "ativo") .reduce((acc, c) => acc + c.valor, 0); const totalPassivos = contas .filter((c) => c.tipo === "passivo") .reduce((acc, c) => acc + c.valor, 0); const patrimonioLiquido = totalAtivos - totalPassivos;

const liquidezCorrente = totalPassivos === 0 ? "∞" : (totalAtivos / totalPassivos).toFixed(2); const endividamento = totalAtivos === 0 ? "0" : ((totalPassivos / totalAtivos) * 100).toFixed(2) + "%"; const margemSeguranca = patrimonioLiquido.toFixed(2);

indicadoresContainer.innerHTML = <div class="indicador"> <strong>Liquidez Corrente:</strong> ${liquidezCorrente} </div> <div class="indicador"> <strong>Índice de Endividamento:</strong> ${endividamento} </div> <div class="indicador"> <strong>Margem de Segurança:</strong> R$ ${margemSeguranca} </div>; });

