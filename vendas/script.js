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
            <option value="biscoito">Biscoito de Polvilho-R$ 5.00</option>
            <option value="bolacha">Bolacha-R$ 4.00</option>
            <option value="bolo-cenoura">Bolo de Cenoura-R$ 12.00</option>
            <option value="bolo-chocolate">Bolo de Chocolate-R$ 15.00</option>
            <option value="bolo-fuba">Bolo de Fubá-R$ 10.00</option>
            <option value="bolo-laranja">Bolo de Laranja-R$ 13.00</option>
            <option value="bolo-milho">Bolo de Milho R$-11.00</option>
            <option value="coxinha">Coxinha-R$ 7.00</option>
            <option value="croissant">Croissant-R$ 9.00</option>
            <option value="cuca">Cuca-R$ 14.00</option>
            <option value="donuts">Donuts-R$ 8.00</option>
            <option value="empadinha">Empadinha-R$ 6.00</option>
            <option value="esfiha">Esfiha-R$ 10.00</option>
            <option value="pao-forma">Pão de Forma-R$ 8.00</option>
            <option value="pao-frances">Pão Francês-R$ 2.00</option>
            <option value="pastel">Pastel-R$ 6.00</option>
            <option value="rosquinha">Rosquinha-R$ 4.00</option>
            <option value="rosca-polvilho">Rosca de PolvilhO-R$ 5.00</option>
            <option value="torta-doce">Torta Doce-R$ 20.00</option>
            <option value="torta-salgada">Torta Salgada-R$ 18.00</option>
            <option value="cafe">Café preto-R$ 5.00</option>
            <option value="cafe-leite">Café com leite-R$ 8.00</option>
            <option value="capuccino">Capuccino-R$ 10.00</option>
            <option value="cha">Chá-R$ 4.00</option>
            <option value="chocolate-quente">Chocolate quente-R$ 8.00</option>
            <option value="suco">Suco-R$ 10.00</option>
            <option value="refrigerante">Refrigerante-R$ 10.00</option>
        </select>

        <label for="${idQuantidade}">Quantidade:</label>
        <input type="number" id="${idQuantidade}" name="quantidade[]" required>
    `;

    container.appendChild(novoProduto);
});

const precosProdutos = {
    "BISCOITO DE POLVILHO": 5.00,
    "BOLACHA": 4.00,
    "BOLO DE CENOURA": 12.00,
    "BOLO DE CHOCOLATE": 15.00,
    "BOLO DE FUBÁ": 10.00,
    "BOLO DE LARANJA": 13.00,
    "BOLO MILHO": 11.00,
    "COXINHA": 7.00,
    "CROISSANT": 9.00,
    "CUCA": 14.00,
    "DONUTS": 8.00,
    "EMPADINHA": 6.00,
    "ESFIHA": 10.00,
    "PÃO DE FORMA": 8.00,
    "PÃO FRANCÊS": 2.00,
    "PASTEL": 6.00,
    "ROSQUINHA": 4.00,
    "ROSCA POLVILHO": 5.00,
    "TORTA DOCE": 20.00,
    "TORTA SALGADA": 18.00,
    "CAFÉ": 5.00,
    "CAFÉ COM LEITE": 7.00,
    "CAPUCCINO": 10.00,
    "CHÁ": 4.00,
    "CHOCOLATE QUENTE": 8.00,
    "SUCO": 10.00,
    "REFRIGERANTE": 10.00
};

let listaProdutos = [];
let listaQuantidades = [];

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

            let valorAtual = parseFloat(document.getElementById("valorTotal").value) || 0;
            document.getElementById("valorTotal").value = (valorAtual + precoTotal).toFixed(2);

            listaProdutos.push(produtoSelecionado);
            listaQuantidades.push(quantidade);

            document.getElementById("produto").selectedIndex = 0;
            document.getElementById("quantidade").value = "";
        } else {
            alert("Quantidade inválida!");
        }
    } else {
        alert("Selecione um produto válido!");
    }

    setTimeout(() => {
        let lista = document.getElementById("produtosLista");
        lista.scrollTo({ top: lista.scrollHeight, behavior: "smooth" });
    }, 100);
});

// Submissão do formulário
document.getElementById("formVenda").addEventListener("submit", async function (e) {
    e.preventDefault(); // Impede o recarregamento da página

    let produtoSelecionado = document.getElementById("produto").value;
    let quantidade = parseInt(document.getElementById("quantidade").value);
    let pagamento = document.getElementById("pagamento").value;
    let valorTotal = parseFloat(document.getElementById("valorTotal").value);

    if (!produtoSelecionado || isNaN(quantidade) || quantidade <= 0 || isNaN(valorTotal) || pagamento === "nenhum") {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    try {
        // Salvar venda no Firebase
        await addDoc(collection(db, "vendas"), {
            produto: produtoSelecionado,
            quantidade: quantidade,
            pagamento: pagamento,
            valorTotal: valorTotal,
            data_venda: new Date()
        });

        alert("Venda registrada com sucesso!");

        // Limpa os campos do formulário
        document.getElementById("produto").selectedIndex = 0;
        document.getElementById("quantidade").value = "";
        document.getElementById("valorTotal").value = "";
        document.getElementById("produtosLista").innerHTML = "";

    } catch (error) {
        console.error("Erro ao salvar venda:", error);
        alert("Erro ao registrar a venda.");
    }
});
