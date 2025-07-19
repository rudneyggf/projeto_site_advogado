import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import style from "@/css/Sessao.module.css"
import { FormEvent, useState } from "react";
import api from "@/services/api"
import Modal from "@/components/Modal";

export default function Cadastro(){

      const [nome, setNome] = useState<string|null>(null);
      const [email, setEmail] = useState<string|null>(null);
      const [senha, setSenha] = useState<string|null>(null);
      const [confirm_senha,setConfirmSenha]= useState<string|null>(null);

      const [mensagemFeedback, setMensagem] = useState("");
      const [erro,setErro] = useState(false)
      const [IsModalOpen,setOpen] = useState(false);

      const handleSign = async (e: React.FormEvent<HTMLFormElement>) =>{
          e.preventDefault();

          try {
            if(senha != confirm_senha){
              throw new Error ("Senhas não conferem");
            }
              await api.post("/autenticar/cadastrar",{nome,email,senha});

             setMensagem("Cadastro realizado com Sucesso");
             setErro(false);

          } catch (error) {
            setMensagem("Falha Ocorreu ao cadastrar.");
            setErro(true);
            
          }
          setOpen(true);
      }

    const CloseModal = ()=>{
        setOpen(false)
     }

    return(
        <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
        />
      </Head>

      <Header />

         <main className={style.fundo_login_registro}>

            <div className={style.div_formulario}>
              <form onSubmit={handleSign} className={style.formulario}>
                <label htmlFor="nome" >Nome:</label>
                <input type="text" id="nome" value={nome ?? ""} onChange={(e)=> setNome(e.target.value)}/>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email ?? ""} onChange={(e)=> setEmail(e.target.value)} />
                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" value={senha ?? ""} onChange={(e)=> setSenha(e.target.value)}  />
                <label htmlFor="confirm_senha">Confirmar senha:</label>
                <input type="password" id="confirm_senha" value={confirm_senha ?? ""} onChange={(e)=> setConfirmSenha(e.target.value)} />
                <button type="submit">Cadastrar-se</button>
                {erro && <p style={{ color: "red" }}>{erro}</p>}
            </form>
            </div>
         </main>

         <Modal isOpen={IsModalOpen} mensagem={mensagemFeedback} isError={erro} closeModal={CloseModal}/>

      <Footer />
    </>
    )

}