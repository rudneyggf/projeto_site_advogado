import { PedidoProps} from "@/types/pedido";
import style from "@/css/Atendimento.module.css"
import { jwtDecode } from "jwt-decode";
import { Token } from "@/types/token";
import api from "@/services/api"
import { useState } from "react";
import ModalDecisao from "./ModalDecisao";

interface PedidoPropsAtualizacaoEffect extends PedidoProps{
    atualizarLista: () => void;
    setMensagem: React.Dispatch<React.SetStateAction<string>>;
    setErro: React.Dispatch<React.SetStateAction<boolean>>;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const Pedido = (pedido : PedidoPropsAtualizacaoEffect) =>{

    const token = localStorage.getItem("token") as string;
    const decoded_token = jwtDecode(token) as Token ;

    const[IsModalDecisaoOpen,setDecisaoOpen]= useState(false);
    const [mensagemModalDecisao,setMensagemModal] = useState("");

    const closeModalDecisao = () =>{
        setDecisaoOpen(false);
    }

    const abrirParaDeletarPedido = () =>{
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
                pedido.atualizarLista();
            } catch (error) {
                pedido.setMensagem("Ocorreu um erro ao deletar a solicitação");
                pedido.setErro(true);
                pedido.setModalOpen(true);
                setDecisaoOpen(false);
            }
        }


    return(
           <>
            <div className= {style.pedido}  >
                <p><span>Nome:</span> {decoded_token.sub} </p>
                <p><span>CPF:</span> {pedido.cpf} </p>
                <p><span>RG: </span> {pedido.rg} </p>
                <p><span>Ocupação:</span> {pedido.ocupacao} </p>
                
                <div className={style.div_botoesCRUD}>
                    <button className={`${style.botoes_CRUD_pedido} ${style.botao_editar} `} >Editar</button>
                    <button className={`${style.botoes_CRUD_pedido} ${style.botao_deletar} `} onClick={abrirParaDeletarPedido} >Excluir</button>
                </div>
            </div>

            <ModalDecisao isOpen={IsModalDecisaoOpen} onClose={closeModalDecisao} deleteFunction={DeletarPedido} mensagem={mensagemModalDecisao} />

            </>

    )
}


export default Pedido;