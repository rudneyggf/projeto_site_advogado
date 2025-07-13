import Footer from "@/components/Footer";
import Header_logado from "@/components/Header_logado";
import Head from "next/head";
import style from "@/css/Atendimento.module.css"
import "@/css/globals.css"
import Pedido from "@/components/Pedido";
import api from "@/services/api"
import { useEffect } from "react";
import { PedidoProps} from "@/types/pedido";

const Atendimento = () =>{

    const MostrarPedidos = async () =>{
        const token = localStorage.getItem("token");
        
        let pedido : PedidoProps = {
              cpf: "",
              rg: "",
              telefone:"",
              ocupacao: "",
              logradouro : "",
              numero: 0,
              bairro: "",
              complemento :"",
              descricao_processo: ""
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

    return (<>
         <Head>
                <link rel="stylesheet" 
                href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" />
         </Head>
         <Header_logado></Header_logado>

         <main className={style.flex_main} >

            <div className={style.div_atendimento}>
                <h1>Formulário de Atendimento</h1>
                <form action="" className={style.atendimento} >
                    <span>
                        <label htmlFor="cpf">CPF:</label>
                        <input type="text" placeholder=" 000.000.000-00" id="cpd"/>
                    </span>

                    <span>
                        <label htmlFor="rg">RG:</label>
                        <input type="text" placeholder=" 123456782010-7"  id="rg" />
                    </span>

                    <span>
                        <label htmlFor="ocupacao">Ocupação</label>
                        <input type="text" id="ocupacao" placeholder="Digite sua profissão"/>
                    </span>

                    <span>
                        <label htmlFor="logradouro">Logradouro:</label>
                        <input type="text" id="logradouro" placeholder="Rua da Consolação"/>
                    </span>

                    <span>
                        <label htmlFor="numero" >Número do endereço:</label>
                        <input type="number" id="numero" placeholder="67"/>
                    </span>

                    <span>
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" id="bairro" placeholder="Cohatrac"/>
                    </span>

                    <span>
                        <label htmlFor="bairro">Complemento</label>
                        <input type="text" id="bairro" />
                    </span>

                    <span>
                        <label htmlFor="processo">Descrição do Processo:</label>
                        <textarea name="descricao" id="processo"  placeholder="Digite o seu problema"></textarea>
                    </span>
   
                    <button type="submit" className={`${style.botoes_CRUD_pedido} ${style.botao_confirmar} `}>Confirmar</button>
                </form>
            </div>

            
         </main>

         <Footer></Footer>
    </>)
}

export default Atendimento;