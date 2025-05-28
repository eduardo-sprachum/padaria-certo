// Importações Firebase (modular SDK)
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Configuração Firebase - substitua pelos seus dados
const firebaseConfig = {
    apiKey: "AIzaSyA7XciNrWAT4-FJ7NztW9SJfnR7Qa0HIcI",
    authDomain: "sistema-padaria-50adc.firebaseapp.com",
    projectId: "sistema-padaria-50adc",
    storageBucket: "sistema-padaria-50adc.firebasestorage.app",
    messagingSenderId: "334275197728",
    appId: "1:334275197728:web:513b722ef95e4b21c6f545"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para salvar a venda no Firestore
async function salvarVenda(produto, quantidade, pagamento, valorTotal) {
  try {
    const docRef = await addDoc(collection(db, "vendas"), {
      produto,
      quantidade: Number(quantidade),
      pagamento,
      valorTotal: Number(valorTotal),
      data_venda: new Date()
    });
    console.log("Venda registrada, ID:", docRef.id);
    alert("Venda registrada com sucesso!");
  } catch (e) {
    console.error("Erro ao registrar venda:", e);
    alert("Erro ao registrar venda.");
  }
}

// Função que vai ligar o formulário ao salvarVenda
function initForm() {
  const form = document.getElementById("formVenda");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const produto = document.getElementById("produto").value;
    const quantidade = document.getElementById("quantidade").value;
    const pagamento = document.getElementById("pagamento").value;
    const valorTotal = document.getElementById("valorTotal").value;

    // Validação simples (você pode expandir)
    if (produto === "nenhum") {
      alert("Selecione um produto.");
      return;
    }
    if (pagamento === "nenhum") {
      alert("Selecione uma forma de pagamento.");
      return;
    }
    if (!quantidade || quantidade <= 0) {
      alert("Informe a quantidade correta.");
      return;
    }

    salvarVenda(produto, quantidade, pagamento, valorTotal);

    // Limpar formulário após envio
    form.reset();
    document.getElementById("valorTotal").value = "";
  });
}

// Exporta initForm para chamar no carregamento
export { initForm };
