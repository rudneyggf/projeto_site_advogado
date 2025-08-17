import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import style from "@/css/Atendimento.module.css";
import "@/css/globals.css";
import Pedido from "@/components/Pedido";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { PedidoProps } from "@/types/pedido";
import Modal from "@/components/Modal";

const Atendimento = () => {
  
  // Array que conterá uma lista de pedidos
  const [pedidos_realizados, setPedidosRealizado] = useState<PedidoProps[]>([]);

  // controlam o modal de Mensagem (Modal.tsx)
  const [mensagemFeedback, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const [IsModalOpen, setOpen] = useState(false);

  //variáveis responsáveis pela paginação na função MostrarPedidos
  const [paginaAtual, setPaginaAtual] = useState(0); 
  const [itensPorPagina] = useState(3);
  const [totalPaginas, setTotalPaginas] = useState(0);

  // controla o pedido que será cadastrado
  const [pedido_a_cadastrar, setPedidoCadastro] = useState<PedidoProps>({
    id: null,
    cpf: null,
    rg: null,
    telefone: null,
    ocupacao: null,
    logradouro: null,
    numero: null,
    bairro: null,
    complemento: null,
    descricaoProcesso: null,
  });

  const pedidoVazio: PedidoProps = {
    id: null,
    cpf: null,
    rg: null,
    telefone: null,
    ocupacao: null,
    logradouro: null,
    numero: null,
    bairro: null,
    complemento: null,
    descricaoProcesso: null,
  };

  const CloseModal = () => {
    setOpen(false);
  };

  // Função que obtem uma lista de pedidos
  const MostrarPedidos = async (pagina: number) => {
    const token = localStorage.getItem("token") as string;

    try {
      const response = await api.get(`/cliente/me/paginado?pagina=${pagina}&itens=${itensPorPagina}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dados_pedidos = response.data;


      // armazena na variável se os pedidos existirem
      if (dados_pedidos) {
        setPedidosRealizado(dados_pedidos.content);
        setTotalPaginas(dados_pedidos.totalPages);
        setPaginaAtual(pagina);
      }
    } catch (error) {
      //controle de modal
      setMensagem("Ocorreu um erro ao carregar os pedidos");
      setErro(true);
      setOpen(true);
    }
  };

  // atualiza a lista sem recarregar a página
  useEffect(() => {
    MostrarPedidos(0);
  }, []);

  const FazerPedido = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token") as string;

    try {
      console.log(pedido_a_cadastrar.rg);

      await api.post("/cliente", pedido_a_cadastrar, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPedidoCadastro(pedidoVazio);
      //Abaixo é somente controle de modal
      setErro(false);
      setMensagem("Atendimento solicitado com sucesso!");
    } catch (error) {
      setMensagem("Ocorreu um erro ao Solicitar Atendimento");
      setErro(true);
    }
    setOpen(true);
    MostrarPedidos(paginaAtual);
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
        />
      </Head>
      <Header></Header>

      <main className={style.flex_main}>
        <div className={style.div_atendimento}>
          <h1>Formulário de Atendimento</h1>
          <form onSubmit={FazerPedido} className={style.atendimento}>
            <span>
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                placeholder=" 000.000.000-00"
                id="cpf"
                value={pedido_a_cadastrar.cpf ?? ""}
                onChange={(e) => {
                  setPedidoCadastro((prev) => ({
                    ...prev,
                    cpf: e.target.value,
                  }));
                }}
              />
            </span>

            <span>
              <label htmlFor="rg">RG:</label>
              <input
                type="text"
                placeholder=" 123456782010-7"
                id="rg"
                value={pedido_a_cadastrar.rg ?? ""}
                onChange={(e) => {
                  setPedidoCadastro((prev) => ({
                    ...prev,
                    rg: e.target.value,
                  }));
                }}
              />
            </span>

            <span>
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                id="telefone"
                placeholder="(00) 00000-0000"
                value={pedido_a_cadastrar.telefone ?? ""}
                onChange={(e) => {
                  setPedidoCadastro((prev) => ({
                    ...prev,
                    telefone: e.target.value,
                  }));
                }}
              />
            </span>

            <span>
              <label htmlFor="ocupacao">Ocupação</label>
              <input
                type="text"
                id="ocupacao"
                placeholder="Digite sua profissão"
                value={pedido_a_cadastrar.ocupacao ?? ""}
                onChange={(e) => {
                  setPedidoCadastro((prev) => ({
                    ...prev,
                    ocupacao: e.target.value,
                  }));
                }}
              />
            </span>

            <span>
              <label htmlFor="logradouro">Logradouro:</label>
              <input
                type="text"
                id="logradouro"
                placeholder="Rua da Consolação"
                value={pedido_a_cadastrar.logradouro ?? ""}
                onChange={(e) => {
                  setPedidoCadastro((prev) => ({
                    ...prev,
                    logradouro: e.target.value,
                  }));
                }}
              />
            </span>

            <span>
              <label htmlFor="numero">Número do endereço:</label>
              <input
                type="number"
                id="numero"
                placeholder="67"
                value={pedido_a_cadastrar.numero ?? 0}
                onChange={(e) => {
                  setPedidoCadastro((prev) => ({
                    ...prev,
                    numero: Number.parseInt(e.target.value),
                  }));
                }}
              />
            </span>

            <span>
              <label htmlFor="bairro">Bairro</label>
              <input
                type="text"
                id="bairro"
                placeholder="Cohatrac"
                value={pedido_a_cadastrar.bairro ?? ""}
                onChange={(e) => {
                  setPedidoCadastro((prev) => ({
                    ...prev,
                    bairro: e.target.value,
                  }));
                }}
              />
            </span>

            <span>
              <label htmlFor="complemento">Complemento</label>
              <input
                type="text"
                id="complemento"
                value={pedido_a_cadastrar.complemento ?? ""}
                onChange={(e) => {
                  setPedidoCadastro((prev) => ({
                    ...prev,
                    complemento: e.target.value,
                  }));
                }}
              />
            </span>

            <span>
              <label htmlFor="processo">Descrição do Processo:</label>
              <textarea
                name="descricao"
                id="processo"
                placeholder="Digite o seu problema"
                value={pedido_a_cadastrar.descricaoProcesso ?? ""}
                onChange={(e) => {
                  setPedidoCadastro((prev) => ({
                    ...prev,
                    descricaoProcesso: e.target.value,
                  }));
                }}
              ></textarea>
            </span>

            <button
              type="submit"
              className={`${style.botoes_CRUD_pedido} ${style.botao_confirmar} `}
            >
              Confirmar
            </button>
          </form>
        </div>

        {pedidos_realizados.map((item, index) => (
          <Pedido
            key={index}
            {...item}
            atualizarLista={()=>MostrarPedidos(paginaAtual)}
            setErro={setErro}
            setMensagem={setMensagem}
            setModalOpen={setOpen}
          />
        ))}

        <div className={style.paginacao}>
            <button onClick={() => MostrarPedidos(paginaAtual - 1)} disabled={paginaAtual === 0}>
                Anterior
            </button>

            <span>Página {paginaAtual + 1} de {totalPaginas}</span>

            <button onClick={() => MostrarPedidos(paginaAtual + 1)} disabled={paginaAtual + 1 >= totalPaginas}>
                Próximo
            </button>
        </div>

      </main>

      <Modal
        isOpen={IsModalOpen}
        mensagem={mensagemFeedback}
        isError={erro}
        closeModal={CloseModal}
      />

      <Footer></Footer>
    </>
  );
};

export default Atendimento;
