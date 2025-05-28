// pages/api/salvar-venda.js
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Configuração do Firebase (insira sua própria configuração aqui)
const firebaseConfig = {
  apiKey: "AIzaSyA7XciNrWAT4-FJ7NztW9SJfnR7Qa0HIcI",
  authDomain: "sistema-padaria-50adc.firebaseapp.com",
  projectId: "sistema-padaria-50adc",
  storageBucket: "sistema-padaria-50adc.firebasestorage.app",
  messagingSenderId: "334275197728",
  appId: "1:334275197728:web:513b722ef95e4b21c6f545"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    const { produtos, pagamento, valorTotal } = req.body;
    
    if (!produtos || produtos.length === 0) {
      return res.status(400).json({ erro: "Nenhum produto adicionado." });
    }
    
    if (!pagamento) {
      return res.status(400).json({ erro: "Forma de pagamento não selecionada." });
    }

    // Insere a venda no Firestore
    await addDoc(collection(db, "vendas"), {
      produtos,
      pagamento,
      valorTotal,
      data_venda: new Date().toISOString()
    });

    res.status(200).json({ mensagem: "Venda salva com sucesso no Firebase!" });
  } catch (error) {
    console.error("Erro ao salvar venda:", error);
    res.status(500).json({ erro: "Erro ao salvar venda. Tente novamente." });
  }
}