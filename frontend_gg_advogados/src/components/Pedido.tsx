import { PedidoProps} from "@/types/pedido";
import style from "@/css/Atendimento.module.css"
import { jwtDecode } from "jwt-decode";
import { Token } from "@/types/token";
import api from "@/services/api"

interface PedidoPropsAtualizacaoEffect extends PedidoProps{
    atualizarLista: () => void;
}


const Pedido = (pedido : PedidoPropsAtualizacaoEffect) =>{

    const token = localStorage.getItem("token") as string;
    const decoded_token = jwtDecode(token) as Token ;

    const DeletarPedido = async () =>{
            try {
                await api.delete(`/cliente/${pedido.id}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                pedido.atualizarLista();
            } catch (error) {
                console.log("Ocorreu um erro ao deletar pedido")
            }
        }


    return(
            <div className= {style.pedido}  >
                <p><span>Nome:</span> {decoded_token.sub} </p>
                <p><span>CPF:</span> {pedido.cpf} </p>
                <p><span>RG: </span> {pedido.rg} </p>
                <p><span>Ocupação:</span> {pedido.ocupacao} </p>
                
                <div className={style.div_botoesCRUD}>
                    <button className={`${style.botoes_CRUD_pedido} ${style.botao_editar} `} >Editar</button>
                    <button className={`${style.botoes_CRUD_pedido} ${style.botao_deletar} `} onClick={DeletarPedido} >Excluir</button>
                </div>
            </div>
    )
}


export default Pedido;