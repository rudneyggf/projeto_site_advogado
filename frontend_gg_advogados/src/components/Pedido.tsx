import { PedidoProps} from "@/types/pedido";
import style from "@/css/Atendimento.module.css"
import api from "@/services/api"
import { useEffect } from "react";


const Pedido = (pedido : PedidoProps) =>{

    const MostrarPedidos = async () =>{
        try{
            const response = await api.get("cliente");
            const dados_pedidos = response.data;
            pedido = dados_pedidos as PedidoProps;

        }catch(error){
            
        }
    }

    return(
            <div className= {style.pedido}  >
                <p><span>Nome:</span> {pedido.nome} </p>
                <p><span>CPF:</span> {pedido.cpf} </p>
                <p><span>RG: </span> {pedido.rg} </p>
                <p><span>Ocupação:</span> {pedido.ocupacao} </p>
                
                <div className={style.div_botoesCRUD}>
                    <button className={`${style.botoes_CRUD_pedido} ${style.botao_editar} `} >Editar</button>
                    <button className={`${style.botoes_CRUD_pedido} ${style.botao_deletar} `} >Excluir</button>
                </div>
            </div>
    )
}


export default Pedido;