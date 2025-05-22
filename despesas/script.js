    function adicionarDespesa() {
        const desc = document.getElementById('desc').value.trim();
        const valor = parseFloat(document.getElementById('valor').value);

        if (!desc || isNaN(valor)) {
            alert("Preencha a descrição e o valor corretamente.");
            return;
        }

        const lista = document.getElementById('lista-despesas');
        const item = document.createElement('li');
        item.textContent = `${desc} - R$ ${valor.toFixed(2)}`;
        lista.appendChild(item);

        // Limpar campos
        document.getElementById('desc').value = '';
        document.getElementById('valor').value = '';
    }