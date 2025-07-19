import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import style from "@/css/Sessao.module.css"
import api from "@/services/api"
import { useState } from "react";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";

export default function Login(){
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagemFeedback, setMensagem] = useState("");
    const [erro,setErro] = useState(false)
    const [IsModalOpen,setOpen] = useState(false);
    
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
          const response = await api.post("/autenticar/login",{nome,senha});

          const token = response.data;
          localStorage.setItem("token",token);

          router.push("/HomepageUser");

        } catch (error) {
          setMensagem(" Senha ou nome inválidos, tente novamente.");
          setErro(true); 
          setOpen(true);
        } 
       
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
              <form  onSubmit={handleLogin} className={style.formulario}>
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                <button type="submit">Iniciar Sessão</button>
            </form>
            </div>
         </main>

        <Modal isOpen={IsModalOpen} mensagem={mensagemFeedback} isError={erro} closeModal={CloseModal}/>
      <Footer />
    </>
    )

}