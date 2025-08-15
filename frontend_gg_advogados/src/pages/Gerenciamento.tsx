import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Pedido from "@/components/Pedido";
import api from "@/services/api";
import { PedidoProps } from "@/types/pedido";
import Head from "next/head";
import { useEffect, useState } from "react";
import "@/css/globals.css";
import style from "@/css/Atendimento.module.css";

const Gerenciamento = () =>{

     // Array que conterá uma lista de pedidos
    const [pedidos_realizados, setPedidosRealizado] = useState<PedidoProps[]>([]);
    
    const [mensagemFeedback, setMensagem] = useState("");
    const [erro, setErro] = useState(false);
    const [IsModalOpen, setOpen] = useState(false);

    const CloseModal = () => {
    setOpen(false);
    };

    const MostrarPedidos = async () => {
    const token = localStorage.getItem("token") as string;

    try {
      const response = await api.get("/cliente?pagina=1&itens=2", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dados_pedidos = response.data;

      // armazena na variável se os pedidos existirem
      if (dados_pedidos) {
        setPedidosRealizado(dados_pedidos);
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
      MostrarPedidos();
    }, []);

    return(
        <>
          <Head>
                <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
                />
          </Head>
          <Header></Header>

          <main className={style.flex_main} >
            <h1> Lista de Pedidos dos Clientes</h1>

            {pedidos_realizados.map((item) => (
                <Pedido
                  key={item.id}
                  {...item}
                  atualizarLista={MostrarPedidos}
                  setErro={setErro}
                  setMensagem={setMensagem}
                  setModalOpen={setOpen}
                />
              ))}
              
          </main>

          <Modal
          isOpen={IsModalOpen}
          mensagem={mensagemFeedback}
          isError={erro}
          closeModal={CloseModal}
          />
          <Footer></Footer>
        </>
    )
}

export default Gerenciamento;