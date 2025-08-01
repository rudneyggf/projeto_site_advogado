import Image from "next/image"
import Link from "next/link"
import style from "@/css/Header.module.css"
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import {Token} from "@/types/token"
import { useEffect, useState } from "react";


const Header = () =>{

    //variavel para controlar o tipo de header que será mostrado ao logar
    const [adm_logado, setAdmLogado] = useState<boolean | null>(null)
    const [login_realizado,setLogin] = useState<boolean | null>(null);
    const router = useRouter();

    //remove o token e leva para a tela principal
    const logout = () =>{

        //remove o token
        localStorage.removeItem("token");
        router.push("/");
    }

    const MudarHeader = (token:string) =>{
            setLogin(true);
            const decoded_token = jwtDecode(token) as Token;
            if (decoded_token.authorities.includes("ROLE_ADMIN"))
                    setAdmLogado(true)
            else
                    setAdmLogado(false);
    }

    useEffect(()=> {
            try{
                const token = localStorage.getItem("token") as string;
            
                //verifica se o Login foi realizado, o Header é diferente para pessoas logadas e não logadas
                if (token) 
                    MudarHeader(token);
                else
                    setLogin(false)
                

        }catch(error){
            router.push("/Login");
        }
    },[])



    if (login_realizado==true) {
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
}else{
    return(
        <header>
            <div className={style.div_header}>
                <Image  className={style.logo} src="/images/logo_Geraldo_Advogado-fundoR.png" height="220" width="500" alt="Logo da Geraldo Advogados"></Image>
                <span className={style.botoes_header}>
                    <Link href="/Login" className={style.botoes_cadastro_login} >Login</Link>
                    <Link href="/Cadastro" className={style.botoes_cadastro_login}>Cadastro</Link>
                </span>
            </div> 
             <nav className={style.navbar}>
                <Link href="/" className={style.links}>Início</Link>
                <Link href="/Sobre" className={style.links}>Sobre</Link>
                <Link href="/" className={style.links}>Contato</Link>
                
            </nav>
        </header>
    )
}
  
}

export default Header;