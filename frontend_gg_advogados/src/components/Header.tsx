import Image from "next/image"
import Link from "next/link"
import style from "@/css/Header.module.css"

const Header = () =>{
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

export default Header;