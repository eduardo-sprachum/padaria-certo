import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// 🔹 Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

// 🔹 Inicializando Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Lista de produtos adicionados
let listaProdutos = [];

// 🔹 Adicionar produtos ao pedido
document.getElementById("adicionarProduto").addEventListener("click", function () {
    let produtoSelecionado = document.getElementById("produto").value;
    let quantidade = parseInt(document.getElementById("quantidade").value);

    if (!produtoSelecionado || isNaN(quantidade) || quantidade <= 0) {
        alert("Preencha os campos corretamente!");
        return;
    }

    let precoUnitario = precosProdutos[produtoSelecionado];
    let precoTotal = precoUnitario * quantidade;

    let novoProduto = document.createElement("p");
    novoProduto.textContent = `${quantidade}x ${produtoSelecionado} - R$ ${precoTotal.toFixed(2)}`;
    document.getElementById("produtosLista").appendChild(novoProduto);

    listaProdutos.push({ produto: produtoSelecionado, quantidade, precoTotal });

    let valorAtual = parseFloat(document.getElementById("valorTotal").value) || 0;
    document.getElementById("valorTotal").value = (valorAtual + precoTotal).toFixed(2);

    // Resetar inputs
    document.getElementById("produto").selectedIndex = 0;
    document.getElementById("quantidade").value = "";
});

// 🔹 Submissão do formulário e envio ao Firebase
document.getElementById("formVenda").addEventListener("submit", async function (e) {
    e.preventDefault();

    let pagamento = document.getElementById("pagamento").value;
    let valorTotal = parseFloat(document.getElementById("valorTotal").value);

    if (listaProdutos.length === 0 || pagamento === "nenhum") {
        alert("Adicione ao menos um produto e selecione o pagamento!");
        return;
    }

    try {
        await addDoc(collection(db, "vendas"), {
            produtos: listaProdutos,
            pagamento,
            valorTotal,
            data_venda: new Date()
        });

        alert("Venda registrada com sucesso!");

        // Resetar tudo
        document.getElementById("produtosLista").innerHTML = "";
        document.getElementById("valorTotal").value = "";
        listaProdutos = [];

    } catch (error) {
        console.error("Erro ao salvar venda:", error);
        alert("Erro ao registrar a venda.");
    }
});
