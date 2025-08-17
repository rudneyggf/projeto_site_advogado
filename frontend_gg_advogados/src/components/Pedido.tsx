import { PedidoProps} from "@/types/pedido";
import style from "@/css/Atendimento.module.css"
import { jwtDecode } from "jwt-decode";
import { Token } from "@/types/token";
import api from "@/services/api"
import { useEffect, useState } from "react";
import ModalDecisao from "./ModalDecisao";
import Link from "next/link";

// propriedades além das informações do pedido que são essenciais para o funcionamento da página
interface PedidoPropsAtualizacaoEffect extends PedidoProps{
    // função passada pela página "pai" Atendimento que é responsável por atualizar os pedidos sem precisar recarregar a página
    atualizarLista: () => void;

    //variáveis da que vem da página atendimento e são responsáveis por controlar o Modal que só mostra Mensagem (Modal.tsx)
    setMensagem: React.Dispatch<React.SetStateAction<string>>;
    setErro: React.Dispatch<React.SetStateAction<boolean>>;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const Pedido = (pedido : PedidoPropsAtualizacaoEffect) =>{

    const token = localStorage.getItem("token") as string;
    const decoded_token = jwtDecode(token) as Token ;

    const [nomePedido,setNomePedido] = useState("");

    //variáveis que controlam o modal de decisão
    const[IsModalDecisaoOpen,setDecisaoOpen]= useState(false);
    const [mensagemModalDecisao,setMensagemModal] = useState("");

    
    const closeModalDecisao = () =>{
        setDecisaoOpen(false);
    }

    // Seta o nome do usuário que fez o pedido
    const NomePedido = async (id : number) =>{
        const response = await api.get(`/cliente/nome/${id}`, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        const nome = response.data;
        setNomePedido(nome)
    }


    useEffect(() => {
          if(decoded_token.authorities.includes("ROLE_ADMIN"))
            NomePedido(pedido.id!);
        }, []);
    
    const abrirModalParaDeletarPedido = () =>{
        setMensagemModal("Tem certeza que deseja deletar a solicitação?")
        setDecisaoOpen(true);
    }

    const DeletarPedido = async () =>{
            try {
                await api.delete(`/cliente/${pedido.id}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })

                // atualiza a lista de pedidos após carregar sem deletar a página
                pedido.atualizarLista();
                setDecisaoOpen(false);
            } catch (error) {

                // controle do modal da página "pai" Atendimento
                pedido.setMensagem("Ocorreu um erro ao deletar a solicitação");
                pedido.setErro(true);
                pedido.setModalOpen(true);

                setDecisaoOpen(false);
            }
        }
    
    if (decoded_token.authorities.includes("ROLE_ADMIN")) {
        return(
                <>
                <div className= {style.pedido}  >
                    <p><span>Id do pedido:</span> {pedido.id} </p>
                    <p><span>Nome:</span> {nomePedido} </p>
                    <p><span>CPF:</span> {pedido.cpf} </p>
                    
                    <div className={style.div_botoesCRUD}>
                        <Link href={`/GerenciarPedido/${pedido.id}`} className={`${style.botoes_CRUD_pedido} ${style.botao_detalhe} `} >Ver Detalhes</Link>
                        <button className={`${style.botoes_CRUD_pedido} ${style.botao_deletar} `} onClick={abrirModalParaDeletarPedido} >Excluir</button>
                    </div>
                </div>

                <ModalDecisao isOpen={IsModalDecisaoOpen} onClose={closeModalDecisao} deleteFunction={DeletarPedido} mensagem={mensagemModalDecisao} />

                </>
            )

    }else{ 
        return(
            <>
                <div className= {style.pedido}  >
                    <p><span>Nome:</span> {decoded_token.sub} </p>
                    <p><span>CPF:</span> {pedido.cpf} </p>
                    <p><span>RG: </span> {pedido.rg} </p>
                    <p><span>Ocupação:</span> {pedido.ocupacao} </p>
                    
                    <div className={style.div_botoesCRUD}>
                        <Link href={`/EditarPedido/${pedido.id}`} className={`${style.botoes_CRUD_pedido} ${style.botao_editar} `} >Editar</Link>
                        <button className={`${style.botoes_CRUD_pedido} ${style.botao_deletar} `} onClick={abrirModalParaDeletarPedido} >Excluir</button>
                    </div>
                </div>

                <ModalDecisao isOpen={IsModalDecisaoOpen} onClose={closeModalDecisao} deleteFunction={DeletarPedido} mensagem={mensagemModalDecisao} />

                </>

        )
    }

}


export default Pedido;