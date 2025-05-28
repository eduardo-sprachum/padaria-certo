import Head from 'next/head';
import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA7XciNrWAT4-FJ7NztW9SJfnR7Qa0HIcI",
  authDomain: "sistema-padaria-50adc.firebaseapp.com",
  projectId: "sistema-padaria-50adc",
  storageBucket: "sistema-padaria-50adc.firebasestorage.app",
  messagingSenderId: "334275197728",
  appId: "1:334275197728:web:513b722ef95e4b21c6f545"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [pagamento, setPagamento] = useState('');
  const [produtosLista, setProdutosLista] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  function adicionarProduto() {
    if (produto && quantidade > 0) {
      const precoMap = {
        "BISCOITO DE POLVILHO": 5, "BOLACHA": 4, "BOLO DE CENOURA": 12, "BOLO DE CHOCOLATE": 15,
        "BOLO DE FUBÁ": 10, "BOLO DE LARANJA": 13, "BOLO DE MILHO": 11, "COXINHA": 7,
        "CROISSANT": 9, "CUCA": 14, "DONUTS": 8, "EMPADINHA": 6, "ESFIHA": 10,
        "PÃO DE FORMA": 8, "PÃO FRANCÊS": 2, "PASTEL": 6, "ROSQUINHA": 4,
        "ROSCA POLVILHO": 5, "TORTA DOCE": 20, "TORTA SALGADA": 18, "CAFÉ": 5,
        "CAFÉ COM LEITE": 8, "CAPUCCINO": 10, "CHÁ": 4, "CHOCOLATE QUENTE": 8,
        "SUCO": 10, "REFRIGERANTE": 10
      };

      const preco = precoMap[produto] || 0;
      const novoProduto = {
        produto,
        quantidade,
        preco,
        subtotal: preco * quantidade
      };
      setProdutosLista([...produtosLista, novoProduto]);
      setProduto('');
      setQuantidade(1);
    }
  }

  useEffect(() => {
    const total = produtosLista.reduce((acc, item) => acc + item.subtotal, 0);
    setValorTotal(total);
  }, [produtosLista]);

  async function handleSubmit(e) {
    e.preventDefault();
  
    // Pegando diretamente o último estado atualizado
    const listaProdutosAtual = [...produtosLista];
  
    if (listaProdutosAtual.length === 0) {
      alert("Adicione pelo menos um produto à venda.");
      return;
    }
  
    if (!pagamento) {
      alert("Selecione a forma de pagamento.");
      return;
    }
  
    try {
      await addDoc(collection(db, "vendas"), {
        produtos: listaProdutosAtual,
        pagamento,
        valorTotal,
        data_venda: new Date()
      });
  
      alert("Venda lançada com sucesso!");
      setProdutosLista([]); // Limpa a lista após o registro
      setProduto('');
      setQuantidade(1);
      setPagamento('');
      setValorTotal(0);
    } catch (error) {
      console.error("Erro ao lançar venda:", error);
      alert("Erro ao lançar venda. Tente novamente.");
    }
  }

  return (
    <>
      <Head>
        <title>New Code Systems - Padaria Nova Esperança</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <div className="sidebar">
          <img src="img/logo3.png" alt="New Code Systems Logo" className="logo" />

          <div className="menu-item">
            <div className="icon">
              <img src="img/inicio.svg" alt="Ícone de Início" className="home-icon" />
            </div>
            <span>Início</span>
            <button onClick={() => {
              const subMenu = document.getElementById('sub-menu');
              subMenu.classList.toggle('active');
            }} className="toggle-btn">▾</button>
          </div>

          <div id="sub-menu" className="sub-menu">
            <a href="../vendas/index.html">Vendas</a>
            <a href="../despesas/index.html">Despesas</a>
            <a href="../relatorios/index.html">Relatórios</a>
          </div>

          <a href="../perfil/index.html">
            <div className="icon">
              <img src="img/perfil.svg" alt="Ícone de Perfil" className="profile-icon" />
            </div>
            Perfil
          </a>

          <a href="#">
            <div className="icon">
              <img src="img/whatsapp.png" alt="Ícone do WhatsApp" className="ai-icon" />
            </div>
            IA
          </a>

          <a href="https://wa.me/5542999443005?text=Ol%C3%A1,%20Ajuda%20New%20Code%20Systems!">
            <div className="icon">
              <img src="img/ajuda.svg" alt="Ícone de Ajuda" className="help-icon" />
            </div>
            Ajuda
          </a>
        </div>

        <div className="main-content">
          <header className="header-top">
            <h1>Vendas</h1>
            <h2>Padaria Nova Esperança</h2>
          </header>

          <form id="formVenda" onSubmit={handleSubmit}>
            <label htmlFor="produto">Produto:</label>
            <select 
            id="produto" 
            value={produto} 
            onChange={e => setProduto(e.target.value)}
            >

              <option value="" disabled>Selecione um produto</option>
              <option value="BISCOITO DE POLVILHO">Biscoito de Polvilho - R$ 5.00</option>
              <option value="BOLACHA">Bolacha - R$ 4.00</option>
              <option value="BOLO DE CENOURA">Bolo de Cenoura - R$ 12.00</option>
              <option value="BOLO DE CHOCOLATE">Bolo de Chocolate - R$ 15.00</option>
              <option value="BOLO DE FUBÁ">Bolo de Fubá - R$ 10.00</option>
              <option value="BOLO DE LARANJA">Bolo de Laranja - R$ 13.00</option>
              <option value="BOLO DE MILHO">Bolo de Milho - R$ 11.00</option>
              <option value="COXINHA">Coxinha - R$ 7.00</option>
              <option value="CROISSANT">Croissant - R$ 9.00</option>
              <option value="CUCA">Cuca - R$ 14.00</option>
              <option value="DONUTS">Donuts - R$ 8.00</option>
              <option value="EMPADINHA">Empadinha - R$ 6.00</option>
              <option value="ESFIHA">Esfiha - R$ 10.00</option>
              <option value="PÃO DE FORMA">Pão de Forma - R$ 8.00</option>
              <option value="PÃO FRANCÊS">Pão Francês - R$ 2.00</option>
              <option value="PASTEL">Pastel - R$ 6.00</option>
              <option value="ROSQUINHA">Rosquinha - R$ 4.00</option>
              <option value="ROSCA POLVILHO">Rosca de Polvilho - R$ 5.00</option>
              <option value="TORTA DOCE">Torta Doce - R$ 20.00</option>
              <option value="TORTA SALGADA">Torta Salgada - R$ 18.00</option>
              <option value="CAFÉ">Café preto - R$ 5.00</option>
              <option value="CAFÉ COM LEITE">Café com leite - R$ 8.00</option>
              <option value="CAPUCCINO">Capuccino - R$ 10.00</option>
              <option value="CHÁ">Chá - R$ 4.00</option>
              <option value="CHOCOLATE QUENTE">Chocolate Quente - R$ 8.00</option>
              <option value="SUCO">Suco - R$ 10.00</option>
              <option value="REFRIGERANTE">Refrigerante - R$ 10.00</option>
            </select>

            <label htmlFor="quantidade">Quantidade:</label>
            <input
              type="number"
              min="1"
              required
              value={quantidade}
              onChange={e => setQuantidade(Number(e.target.value))}
            />

            <label htmlFor="pagamento">Forma de Pagamento:</label>
            <select
              id="pagamento"
              required
              value={pagamento}
              onChange={e => setPagamento(e.target.value)}
            >
              <option value="" disabled>Selecione uma forma de pagamento</option>
              <option value="DINHEIRO">Dinheiro</option>
              <option value="CARTÃO">Cartão</option>
              <option value="FIADO">Fiado</option>
            </select>

            <button type="button" onClick={adicionarProduto}>
              Adicionar Produto
            </button>

            <div id="produtosLista">
              {produtosLista.length === 0 && <p>Nenhum produto adicionado.</p>}
              {produtosLista.length > 0 && (
                <ul>
                  {produtosLista.map((item, index) => (
                    <li key={index}>
                      {item.produto} - Quantidade: {item.quantidade} - Subtotal: R$ {item.subtotal.toFixed(2)}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label htmlFor="valorTotal">Valor Total:</label>
            <input
              type="number"
              readOnly
              value={valorTotal.toFixed(2)}
            />

            <div className="submit-container">
              <button type="submit">Lançar Venda</button>
            </div>
          </form>
        </div>
      </div>

      <footer>
        <p>New Code Systems© - A solução para o seu negócio | Contato: (42) 99944-3005</p>
      </footer>
    </>
  );
}
