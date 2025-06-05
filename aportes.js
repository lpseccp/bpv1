// aportes.js

// Função para carregar aportes do localStorage
function carregarAportes() {
    const dados = localStorage.getItem('aportes');
    return dados ? JSON.parse(dados) : [];
}

// Função para salvar aportes no localStorage
function salvarAportes(aportes) {
    localStorage.setItem('aportes', JSON.stringify(aportes));
}

// Função para adicionar um novo aporte
function adicionarAporte() {
    const data = document.getElementById('data').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const descricao = document.getElementById('descricao').value;

    if (!data || isNaN(valor)) {
        alert('Preencha os campos obrigatórios corretamente.');
        return;
    }

    const aportes = carregarAportes();
    aportes.push({ data, valor, descricao });
    salvarAportes(aportes);
    listarAportes();
    limparFormulario();
}

// Função para listar os aportes na tabela
function listarAportes() {
    const tabela = document.getElementById('tabela-aportes');
    const aportes = carregarAportes();
    tabela.innerHTML = '';

    aportes.forEach((aporte, index) => {
        const linha = `<tr>
            <td>${aporte.data}</td>
            <td>R$ ${aporte.valor.toFixed(2)}</td>
            <td>${aporte.descricao}</td>
            <td><button onclick="removerAporte(${index})">Excluir</button></td>
        </tr>`;
        tabela.innerHTML += linha;
    });
}

// Função para remover um aporte
function removerAporte(index) {
    const aportes = carregarAportes();
    aportes.splice(index, 1);
    salvarAportes(aportes);
    listarAportes();
}

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById('data').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('descricao').value = '';
}

// Inicializar a listagem ao carregar a página
document.addEventListener('DOMContentLoaded', listarAportes);
