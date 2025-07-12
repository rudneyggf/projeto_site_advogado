import Footer from "@/components/Footer";
import Header_logado from "@/components/Header_logado";
import Head from "next/head";
import style from "@/css/Atendimento.module.css"
import "@/css/globals.css"
import Pedido from "@/components/Pedido";

const Atendimento = () =>{
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

                    <button type="submit" className={`${style.botoes_CRUD_pedido} ${style.botao_confirmar} `}>Confirmar</button>
                </form>
            </div>

            <Pedido></Pedido>

         </main>

         <Footer></Footer>
    </>)
}

export default Atendimento;