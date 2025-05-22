function toggleSubMenu() {
  const subMenu = document.getElementById('sub-menu');
  subMenu.classList.toggle('active');
}

function adicionarDespesa() {
  const descInput = document.getElementById('desc');
  const valorInput = document.getElementById('valor');

  const desc = descInput.value.trim();
  const valor = parseFloat(valorInput.value);

  if (!desc || isNaN(valor)) {
    alert("Preencha a descrição e o valor corretamente.");
    return;
  }

  const lista = document.getElementById('lista-despesas');
  const item = document.createElement('li');
  item.textContent = `${desc} - R$ ${valor.toFixed(2)}`;
  lista.appendChild(item);

  descInput.value = '';
  valorInput.value = '';
  descInput.focus();
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnAdicionar').addEventListener('click', adicionarDespesa);
});
