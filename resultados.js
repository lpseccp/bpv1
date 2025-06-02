// Função para carregar resultados do localStorage
function carregarResultados() {
  const dados = localStorage.getItem('resultados');
  return dados ? JSON.parse(dados) : [];
}

// Função para salvar resultados no localStorage
function salvarResultados(resultados) {
  localStorage.setItem('resultados', JSON.stringify(resultados));
}

// Função para atualizar o DOM e o gráfico
function atualizarInterface() {
  const container = document.getElementById('resultados-container');
  const resultados = carregarResultados();
  container.innerHTML = '';

  resultados.forEach((res, index) => {
    const div = document.createElement('div');
    div.className = 'resultado-item';
    div.innerHTML = `
      <strong>${res.ano}</strong> - ${res.tipo.toUpperCase()} de R$ ${res.valor.toFixed(2)}
      <button onclick="removerResultado(${index})">Remover</button>
    `;
    container.appendChild(div);
  });

  desenharGrafico(resultados);
}

// Função para desenhar o gráfico
function desenharGrafico(resultados) {
  const ctx = document.getElementById('grafico-resultados').getContext('2d');
  const anos = [...new Set(resultados.map(r => r.ano))].sort();
  const lucroPorAno = anos.map(ano =>
    resultados
      .filter(r => r.ano === ano && r.tipo === 'lucro')
      .reduce((soma, r) => soma + r.valor, 0)
  );
  const prejuizoPorAno = anos.map(ano =>
    resultados
      .filter(r => r.ano === ano && r.tipo === 'prejuizo')
      .reduce((soma, r) => soma + r.valor, 0)
  );

  if (window.graficoResultados) window.graficoResultados.destroy();

  window.graficoResultados = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: anos,
      datasets: [
        {
          label: 'Lucros',
          backgroundColor: 'green',
          data: lucroPorAno
        },
        {
          label: 'Prejuízos',
          backgroundColor: 'red',
          data: prejuizoPorAno
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Lucros e Prejuízos por Ano'
        }
      }
    }
  });
}

// Função para remover resultado
function removerResultado(index) {
  const resultados = carregarResultados();
  resultados.splice(index, 1);
  salvarResultados(resultados);
  atualizarInterface();
}

// Evento de envio do formulário
document.getElementById('resultado-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const tipo = document.getElementById('tipo-resultado').value;
  const valor = parseFloat(document.getElementById('valor-resultado').value);
  const ano = parseInt(document.getElementById('ano-resultado').value);

  if (!valor || !ano) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  const resultados = carregarResultados();
  resultados.push({ tipo, valor, ano });
  salvarResultados(resultados);
  atualizarInterface();

  e.target.reset();
});

// Inicializa a interface
atualizarInterface();