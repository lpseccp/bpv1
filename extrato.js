// extrato.js

document.addEventListener('DOMContentLoaded', () => {
  const extratoBody = document.getElementById('extrato-body');
  const extratoData = JSON.parse(localStorage.getItem('extrato')) || [];

  function renderExtrato() {
    extratoBody.innerHTML = '';
    extratoData.forEach((item, index) => {
      const row = document.createElement('tr');

      const dataCell = document.createElement('td');
      dataCell.textContent = item.data || '';
      row.appendChild(dataCell);

      const tipoCell = document.createElement('td');
      tipoCell.textContent = item.tipo || '';
      row.appendChild(tipoCell);

      const descricaoCell = document.createElement('td');
      descricaoCell.textContent = item.descricao || '';
      row.appendChild(descricaoCell);

      const valorCell = document.createElement('td');
      valorCell.textContent = item.valor || '';
      row.appendChild(valorCell);

      const acaoCell = document.createElement('td');
      const excluirBtn = document.createElement('button');
      excluirBtn.textContent = 'Excluir';
      excluirBtn.onclick = () => {
        extratoData.splice(index, 1);
        localStorage.setItem('extrato', JSON.stringify(extratoData));
        renderExtrato();
      };
      acaoCell.appendChild(excluirBtn);
      row.appendChild(acaoCell);

      extratoBody.appendChild(row);
    });
  }

  renderExtrato();
});