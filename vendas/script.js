document.getElementById("adicionarProduto").addEventListener("click", function () {
    let container = document.getElementById("produtosContainer");

    let novoProduto = document.createElement("div");
    novoProduto.classList.add("produto-item");

    let idProduto = "produto" + (container.children.length + 1);
    let idQuantidade = "quantidade" + (container.children.length + 1);

    novoProduto.innerHTML = `
        <label for="${idProduto}">Produto:</label>
        <select id="${idProduto}" name="produto[]" required>
            <option value="nenhum" selected disabled>Selecione um produto</option>
            <option value="biscoito">Biscoito de Polvilho</option>
            <option value="bolo-cenoura">Bolo de Cenoura</option>
            <option value="bolo-chocolate">Bolo de Chocolate</option>
            <option value="bolo-fuba">Bolo de Fubá</option>
            <option value="bolo-laranja">Bolo de Laranja</option>
            <option value="bolo-milho">Bolo de Milho</option>
            <option value="coxinha">Coxinha</option>
            <option value="croissant">Croissant</option>
            <option value="cuca">Cuca</option>
            <option value="donuts">Donuts</option>
            <option value="empadinha">Empadinha</option>
            <option value="esfiha">Esfiha</option>
            <option value="pao-forma">Pão de Forma</option>
            <option value="pao-frances">Pão Francês</option>
            <option value="pastel">Pastel</option>
            <option value="rosquinha">Rosquinha</option>
            <option value="rosca-polvilho">Rosca de Polvilho</option>
            <option value="torta-doce">Torta Doce</option>
            <option value="torta-salgada">Torta Salgada</option>
            <option value="cafe">Café preto</option>
            <option value="cafe-leite">Café com leite</option>
            <option value="capuccino">Capuccino</option>
            <option value="cha">Chá</option>
            <option value="chocolate-quente">Chocolate quente</option>
            <option value="suco">suco</option>
            <option value="refrigerante">Refrigerante</option>
            
        </select>

        <label for="${idQuantidade}">Quantidade:</label>
        <input type="number" id="${idQuantidade}" name="quantidade[]" required>
    `;

    container.appendChild(novoProduto);
});

// Lista de preços dos produtos
const precosProdutos = {
    "BISCOITO": 5.00,
    "BOLO CENOURA": 12.00,
    "BOLO CHOCOLATE": 15.00,
    "BOLO FUBÁ": 10.00,
    "BOLO LARANJA": 13.00,
    "BOLO MILHO": 11.00,
    "COXINHA": 7.00,
    "CROISSANT": 9.00,
    "CUCA": 14.00,
    "DONUTS": 8.00,
    "EMPADINHA": 6.00,
    "ESFIHA": 10.00,
    "PÃO FORMA": 8.00,
    "PÃO FRANCÊS": 3.00,
    "PASTEL": 6.00,
    "ROSQUINHA": 4.00,
    "ROSCA POLVILHO": 5.50,
    "TORTA DOCE": 20.00,
    "TORTA SALGADA": 18.00,
    "CAFE": 5.00,
    "CAFE COM LEITE": 7.00,
    "CAPUCCINO": 10.00,
    "CHA": 4.00,
    "CHOCOLATE-QUENTE": 8.00,
    "SUCO": 10.00,
    "REFRIGERANTE": 10.00
};

document.getElementById("adicionarProduto").addEventListener("click", function () {
    let produtoSelecionado = document.getElementById("produto").value;
    let quantidade = parseInt(document.getElementById("quantidade").value);

    if (produtoSelecionado && precosProdutos.hasOwnProperty(produtoSelecionado)) {
        if (!isNaN(quantidade) && quantidade > 0) {
            let precoUnitario = precosProdutos[produtoSelecionado];
            let precoTotal = precoUnitario * quantidade;

            // Criando um parágrafo único para listar os produtos
            let novoProduto = document.createElement("p");
            novoProduto.textContent = `${quantidade}x ${produtoSelecionado} - R$ ${precoTotal.toFixed(2)}`;

            document.getElementById("produtosLista").appendChild(novoProduto);

            // Atualizar o valor total sem criar novos labels
            let valorAtual = parseFloat(document.getElementById("valorTotal").value) || 0;
            document.getElementById("valorTotal").value = (valorAtual + precoTotal).toFixed(2);

            // Resetando campos para inserir outro produto sem duplicação
            document.getElementById("produto").selectedIndex = 0;
            document.getElementById("quantidade").value = "";
        } else {
            alert("Quantidade inválida!");
        }
    } else {
        alert("Selecione um produto válido!");
    }
});

document.getElementById("adicionarProduto").addEventListener("click", function () {
    // Código que adiciona o produto...

    // Depois de adicionar, rolar para o final
    setTimeout(() => {
        let lista = document.getElementById("produtosLista");
        lista.scrollTo({ top: lista.scrollHeight, behavior: "smooth" });
    }, 100); // Pequeno delay para garantir atualização da DOM
});