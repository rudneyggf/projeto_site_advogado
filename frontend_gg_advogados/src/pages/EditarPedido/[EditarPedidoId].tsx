import Footer from "@/components/Footer";
import Header_logado from "@/components/Header_logado";
import api from "@/services/api";
import { PedidoProps } from "@/types/pedido";
import Head from "next/head";
import style from "@/css/Atendimento.module.css"
import { useEffect, useState } from "react";
import { GetStaticPropsContext } from "next";



export const getStaticPaths = async () =>{

    return {
        paths:[],
        fallback: 'blocking',
    };
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.EditarPedidoId;

  return {
    props: {
      EditarPedidoId: id
    }
  };
};


export default function EdicaoPedido(props:{EditarPedidoId: string}){

    const id = Number.parseInt(props.EditarPedidoId);

    const [pedidoOriginal, setPedidoOriginal] = useState<PedidoProps | null>(null)
    const [pedidoAEditar, setPedidoEditar] = useState<PedidoProps | null>(null)
    

     const GetListaPedidos = async () =>{
        const token = localStorage.getItem("token") as string;

        const response = await api.get("/cliente/me",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }); 

        const dados = response.data as PedidoProps[];
        const pedidoEncontrado = dados.find(p => p.id === id)
        if (pedidoEncontrado){
            setPedidoOriginal(pedidoEncontrado);
            setPedidoEditar(pedidoEncontrado);
        }
            
        
    }


    useEffect(()=>{GetListaPedidos()},[props]);


    const EditarPedido = async () =>{
        const token = localStorage.getItem("token") as string

       try {
            await api.put(`/cliente/${pedidoOriginal?.id}`,pedidoAEditar,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
       } catch (error) {
            console.log("Erro ao editar Pedido");
       }

    }
     
    if(!pedidoAEditar) return null;
    
    return(<>
        <Head>
                <link rel="stylesheet" 
                href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" />
        </Head>
        <Header_logado></Header_logado>
        
        <main>
            <h1>Editando o pedido número {pedidoAEditar.id } </h1>

            <form onSubmit={EditarPedido} className={style.atendimento} >
                    <span>
                        <label htmlFor="cpf">CPF:</label>
                        <input type="text" placeholder=" 000.000.000-00" id="cpf" value={pedidoAEditar.cpf ?? ""} onChange={(e)=>setPedidoEditar({ ...pedidoAEditar, cpf: e.target.value })} />
                    </span>

                    <span>
                        <label htmlFor="rg">RG:</label>
                        <input type="text" placeholder=" 123456782010-7"  id="rg" value={pedidoAEditar.rg ?? ""}  onChange={(e) => setPedidoEditar({ ...pedidoAEditar, rg: e.target.value })} />
                    </span>


                    <span>
                        <label htmlFor="telefone">Telefone</label>
                        <input type="text" id="telefone" placeholder="(00) 00000-0000" value={pedidoAEditar.telefone ?? ""} onChange={(e)=>setPedidoEditar({ ...pedidoAEditar, telefone: e.target.value })} />
                    </span>

                    <span>
                        <label htmlFor="ocupacao">Ocupação</label>
                        <input type="text" id="ocupacao" placeholder="Digite sua profissão" value={pedidoAEditar.ocupacao ?? ""} onChange={(e)=>setPedidoEditar({ ...pedidoAEditar, ocupacao: e.target.value })} />
                    </span>

                    <span>
                        <label htmlFor="logradouro">Logradouro:</label>
                        <input type="text" id="logradouro" placeholder="Rua da Consolação" value={pedidoAEditar.logradouro ?? ""} onChange={(e)=>setPedidoEditar({ ...pedidoAEditar, logradouro: e.target.value })}/>
                    </span>

                    <span>
                        <label htmlFor="numero" >Número do endereço:</label>
                        <input type="number" id="numero" placeholder="67" value={pedidoAEditar.numero ?? 0}  onChange={(e) =>setPedidoEditar({ ...pedidoAEditar, numero: Number.parseInt(e.target.value) })} />
                    </span>

                    <span>
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" id="bairro" placeholder="Cohatrac" value={pedidoAEditar.bairro ?? "" } onChange={(e)=>setPedidoEditar({ ...pedidoAEditar, bairro: e.target.value })}/>
                    </span>

                    <span>
                        <label htmlFor="complemento">Complemento</label>
                        <input type="text" id="complemento"  value={pedidoAEditar.complemento ?? ""}  onChange={(e)=>setPedidoEditar({ ...pedidoAEditar, complemento: e.target.value })} />
                    </span>

                    <span>
                        <label htmlFor="processo">Descrição do Processo:</label>
                        <textarea name="descricao" id="processo"  placeholder="Digite o seu problema" value={pedidoAEditar.descricaoProcesso ?? ""} onChange={(e)=>
                            setPedidoEditar({ ...pedidoAEditar, descricaoProcesso: e.target.value })} ></textarea>
                    </span>
   
                    <button type="submit" className={`${style.botoes_CRUD_pedido} ${style.botao_confirmar} `}>Confirmar</button>
                </form>
            
        </main>

        <Footer></Footer>
    </>)

}