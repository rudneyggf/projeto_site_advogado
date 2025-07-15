import Footer from "@/components/Footer";
import Header_logado from "@/components/Header_logado";
import Head from "next/head";
import style from "@/css/Atendimento.module.css"
import "@/css/globals.css"
import Pedido from "@/components/Pedido";
import api from "@/services/api"
import { useEffect, useState } from "react";
import { PedidoProps} from "@/types/pedido";

const Atendimento = () =>{

    const [pedido_a_cadastrar ,setPedidoCadastro] = useState({
              cpf: "",
              rg: "",
              telefone:"",
              ocupacao: "",
              logradouro : "",
              numero: 0,
              bairro: "",
              complemento :"",
              descricaoProcesso: ""
    });


    const MostrarPedidos = async () =>{
     
        const token = localStorage.getItem("token") as string ;

        let pedido : PedidoProps = {
              cpf: "",
              rg: "",
              telefone:"",
              ocupacao: "",
              logradouro : "",
              numero: 0,
              bairro: "",
              complemento :"",
              descricaoProcesso: ""
        }

        try{
            const response = await api.get("/cliente/me",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
          
            const dados_pedidos = response.data;
            console.log(dados_pedidos);

        }catch(error){
            console.log("Ocorreu um erro");
        }
    }

    useEffect(()=>{
        MostrarPedidos();
    },[]);


    const FazerPedido = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault;
        const token = localStorage.getItem("token") as string ;
        try{
            console.log(pedido_a_cadastrar.rg);

            await api.post("/cliente",pedido_a_cadastrar,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
        }catch(error){
            console.log("Ocorreu um ao cadastrar um pedido");
        }
    }

    return (<>
         <Head>
                <link rel="stylesheet" 
                href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" />
         </Head>
         <Header_logado></Header_logado>

         <main className={style.flex_main} >

            <div className={style.div_atendimento}>
                <h1>Formulário de Atendimento</h1>
                <form onSubmit={FazerPedido} className={style.atendimento} >
                    <span>
                        <label htmlFor="cpf">CPF:</label>
                        <input type="text" placeholder=" 000.000.000-00" id="cpf" onChange={(e)=>{setPedidoCadastro(prev =>(
                            {...prev, cpf:e.target.value}
                            ) )}} />
                    </span>

                    <span>
                        <label htmlFor="rg">RG:</label>
                        <input type="text" placeholder=" 123456782010-7"  id="rg" onChange={(e)=>{setPedidoCadastro(prev =>(
                            {...prev, rg:e.target.value}
                        ))}}  />
                    </span>


                    <span>
                        <label htmlFor="telefone">Telefone</label>
                        <input type="text" id="telefone" placeholder="(00) 00000-0000" onChange={(e)=>{setPedidoCadastro(prev=>(
                            {...prev,telefone:e.target.value}
                        ))}} />
                    </span>

                    <span>
                        <label htmlFor="ocupacao">Ocupação</label>
                        <input type="text" id="ocupacao" placeholder="Digite sua profissão" onChange={(e)=>{setPedidoCadastro(prev=>(
                            {...prev,ocupacao:e.target.value}
                        ))}} />
                    </span>

                    <span>
                        <label htmlFor="logradouro">Logradouro:</label>
                        <input type="text" id="logradouro" placeholder="Rua da Consolação" onChange={(e)=>{setPedidoCadastro(prev=>(
                            {...prev,logradouro:e.target.value}
                        ))}}/>
                    </span>

                    <span>
                        <label htmlFor="numero" >Número do endereço:</label>
                        <input type="number" id="numero" placeholder="67" onChange={(e) =>{setPedidoCadastro(prev=>(
                            {...prev,numero: Number.parseInt(e.target.value)}
                        ))}} />
                    </span>

                    <span>
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" id="bairro" placeholder="Cohatrac" onChange={(e)=>{setPedidoCadastro(prev=>(
                            {...prev,bairro:e.target.value}
                        ))}}/>
                    </span>

                    <span>
                        <label htmlFor="complemento">Complemento</label>
                        <input type="text" id="complemento" onChange={(e)=>{setPedidoCadastro(prev=>(
                            {...prev,complemento:e.target.value}
                        ))}} />
                    </span>

                    <span>
                        <label htmlFor="processo">Descrição do Processo:</label>
                        <textarea name="descricao" id="processo"  placeholder="Digite o seu problema" onChange={(e)=>{setPedidoCadastro(prev=>(
                            {...prev,descricaoProcesso:e.target.value}
                        ))}} ></textarea>
                    </span>
   
                    <button type="submit" className={`${style.botoes_CRUD_pedido} ${style.botao_confirmar} `}>Confirmar</button>
                </form>
            </div>

            
         </main>

         <Footer></Footer>
    </>)
}

export default Atendimento;