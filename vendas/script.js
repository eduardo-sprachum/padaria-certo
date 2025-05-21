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
        </select>

        <label for="${idQuantidade}">Quantidade:</label>
        <input type="number" id="${idQuantidade}" name="quantidade[]" required>
    `;

    container.appendChild(novoProduto);
});

// Lista de preços dos produtos
const precosProdutos = {
    "biscoito": 5.00,
    "bolo-cenoura": 12.00,
    "bolo-chocolate": 15.00,
    "bolo-fuba": 10.00,
    "bolo-laranja": 13.00,
    "bolo-milho": 11.00,
    "coxinha": 7.00,
    "croissant": 9.00,
    "cuca": 14.00,
    "donuts": 8.00,
    "empadinha": 6.00,
    "esfiha": 10.00,
    "pao-forma": 8.00,
    "pao-frances": 3.00,
    "pastel": 6.00,
    "rosquinha": 4.00,
    "rosca-polvilho": 5.50,
    "torta-doce": 20.00,
    "torta-salgada": 18.00
};

document.getElementById("adicionarProduto").addEventListener("click", function () {
    let produtoSelecionado = document.getElementById("produto").value;
    let quantidade = parseInt(document.getElementById("quantidade").value);

    if (produtoSelecionado && precosProdutos.hasOwnProperty(produtoSelecionado)) {
        if (!isNaN(quantidade) && quantidade > 0) {
            let precoUnitario = precosProdutos[produtoSelecionado];
            let precoTotal = precoUnitario * quantidade;

            let novoProduto = document.createElement("p");
            novoProduto.textContent = `${quantidade}x ${produtoSelecionado} - R$ ${precoTotal.toFixed(2)}`;

            document.getElementById("produtosLista").appendChild(novoProduto);

            // Atualizar o valor total
            let valorAtual = parseFloat(document.getElementById("valorTotal").value) || 0;
            document.getElementById("valorTotal").value = (valorAtual + precoTotal).toFixed(2);

            // Limpar seleção para adicionar novo produto
            document.getElementById("produto").selectedIndex = 0;
            document.getElementById("quantidade").value = "";
        } else {
            alert("Quantidade inválida!");
        }
    } else {
        alert("Selecione um produto válido!");
    }
});