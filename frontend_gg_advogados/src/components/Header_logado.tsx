import Image from "next/image"
import Link from "next/link"
import style from "@/css/Header.module.css"
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import {Token} from "@/types/token"
import { useEffect, useState } from "react";


const Header_logado = () =>{

    //variavel para controlar o tipo de header que será mostrado ao logar
    const [adm_logado, setAdmLogado] = useState<boolean | null>(null)
    const router = useRouter();

    //remove o token e leva para a tela principal
    const logout = () =>{

        //remove o token
        localStorage.removeItem("token");
        
        router.push("/");
    }


    useEffect(()=> {
            try{
                const token = localStorage.getItem("token") as string;
                const decoded_token = jwtDecode(token) as Token;
                if (decoded_token.authorities.includes("ROLE_ADMIN"))
                    setAdmLogado(true)
                else
                    setAdmLogado(false);
        }catch(error){
            router.push("/Login");
        }
    },[])

    if (adm_logado==null) {
        return null;
    }

    return(
        <header>
            <div className={style.div_header}>
                <Image  className={style.logo} src="/images/logo_Geraldo_Advogado-fundoR.png" height="220" width="500" alt="Logo da Geraldo Advogados"></Image>
                <span className={style.botoes_header}>
                    <button onClick={logout} className={style.botoes_cadastro_login} >Sair</button>
                </span>
            </div> 
             <nav className={style.navbar}>

                <Link href="/" className={style.links}>Início</Link>
                <Link href="/Sobre" className={style.links}>Sobre</Link>
                <Link href="/" className={style.links}>Contato</Link>

                {/* o que muda dependendo do tipo de perfil */}
                {!adm_logado && <Link href="/Atendimento" className={style.links}>Requisitar Atendimento</Link> }
                {adm_logado && <Link href="/" className={style.links}>Gerenciar Casos</Link> }
            </nav>
        </header>
    )
}

export default Header_logado;