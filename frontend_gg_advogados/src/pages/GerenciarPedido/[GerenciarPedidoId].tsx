import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import api from "@/services/api";
import { PedidoProps } from "@/types/pedido";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import style from "@/css/Atendimento.module.css";
import Link from "next/link";

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.GerenciarPedidoId;

  return {
    props: {
      GerenciarPedidoId: id,
    },
  };
};

export default function GerenciaPedido(props: { GerenciarPedidoId: string }){

    const id = Number.parseInt(props.GerenciarPedidoId);

    const [mensagemFeedback, setMensagem] = useState("");
    const [erro, setErro] = useState(false);
    const [IsModalOpen, setOpen] = useState(false);
    

    const [pedidoDetalhes, setPedido] = useState<PedidoProps | null>()
    const [nomeCliente, setNome] = useState<string>("");

    const CloseModal = () => setOpen(false);

    const encontrarPedido = async () =>{
        const token = localStorage.getItem("token") as string;
        try {
            const response = await api.get(`/cliente/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const pedido = response.data;

            setPedido(pedido);
            console.log(pedido)
        } catch (error) {
            setErro(true);
            setMensagem("Não foi possível encontrar os detalhes desse pedido");
            setOpen(true);
        }
    }

    const encontrarNomeCliente = async () =>{
        const token = localStorage.getItem("token") as string;

        const response = await api.get(`/cliente/nome/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        const nome = response.data;
        setNome(nome);
    }

    useEffect(()=>{
        encontrarPedido();
        encontrarNomeCliente();
    },[])

    return(
        <>
         <Head>
            <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
            />
        </Head>
        <Header></Header>

        <main>
            <div className={style.cabecalho_detalhes}>
                <Link href="/Gerenciamento" className={style.botao_voltar}>
                Voltar
                </Link>
                <h1 style={{textAlign:"center"}}  > Pedido de ID {pedidoDetalhes?.id} </h1>
            </div>
          

            <div className={ style.div_atendimento} >
                <div className={style.atendimento}>
                    <p style={{textAlign:"center"}}  > <span className={style.pedido_detalhes} >Nome:</span>  {nomeCliente} </p>
                    <p style={{textAlign:"center"}} > <span className={style.pedido_detalhes} > CPF: </span> {pedidoDetalhes?.cpf} </p>
                    <p style={{textAlign:"center"}} > <span className={style.pedido_detalhes} >RG:</span>  {pedidoDetalhes?.rg} </p>
                    <p style={{textAlign:"center"}} > <span className={style.pedido_detalhes} >Telefone:</span>  {pedidoDetalhes?.telefone} </p>
                    <p style={{textAlign:"center"}} > <span className={style.pedido_detalhes} >Ocupação:</span>  {pedidoDetalhes?.ocupacao} </p>
                    <p style={{textAlign:"center"}} > <span className={style.pedido_detalhes} >Logradouro:</span>  {pedidoDetalhes?.logradouro} </p>
                    <p style={{textAlign:"center"}} > <span className={style.pedido_detalhes} >Número da residência:</span>  {pedidoDetalhes?.numero} </p>
                    <p style={{textAlign:"center"}} > <span className={style.pedido_detalhes} >Bairro:</span>  {pedidoDetalhes?.bairro} </p>
                    <p style={{textAlign:"center"}} > <span className={style.pedido_detalhes} > Complemento:</span> {pedidoDetalhes?.complemento} </p>
                    <p style={{textAlign:"center"}} > <span className={style.pedido_detalhes} >Descrição:</span>  {pedidoDetalhes?.descricaoProcesso} </p>
                </div>
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
    )
}