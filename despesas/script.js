    function toggleSubMenu() {
            const subMenu = document.getElementById('sub-menu');
            subMenu.classList.toggle('active');
        }

        // Função para adicionar despesa
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

            // Limpar campos
            descInput.value = '';
            valorInput.value = '';

            // Focar no campo descrição para facilitar nova entrada
            descInput.focus();
        }

        // Adiciona listener ao botão para evitar usar onclick inline
        document.getElementById('btnAdicionar').addEventListener('click', adicionarDespesa);