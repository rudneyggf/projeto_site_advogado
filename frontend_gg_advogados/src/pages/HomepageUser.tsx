import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/css/globals.css";
import Head from "next/head";
import Image from "next/image";

export default function HomepageUser() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
        />
      </Head>

      <Header/>

      <main>
        <section id="section_1">
          <Image
            id="foto_gera"
            src="/images/geraldo_sabotagem.png"
            height="600"
            width="600"
            alt="Foto do Advogado"
          ></Image>
          <p id="paragrafo_slogan">
            Geraldo Guedes um dos mais renomados advogados trabalhistas de
            Goiana, formado no Centro Universitário de João Pessoa. Defendendo
            seus direitos no trabalho com coragem, clareza e compromisso.
          </p>
        </section>

        <section id="section_2">
          <ul>
            <li>Ação Trabalhista</li>
            <li> Acidente de Trabalho</li>
            <li>Afastamento do Trabalho</li>
            <li>Análise de Acordo</li>
            <li>Apoentadoria</li>
          </ul>

          <ul>
            <li>Aposentadoria Rural</li>
            <li>Assédio</li>
            <li>Auxílio-Doença</li>
            <li>Aviso Prévio</li>
            <li>Consultoria Trabalhista</li>
          </ul>

          <ul>
            <li>Doença de Função</li>
            <li>Doença Ocupacional</li>
            <li>Equiparação Salarial</li>
            <li>Férias</li>
            <li>FGTS</li>
            <li>Horas Extras</li>
          </ul>

          <ul>
            <li>Insalubridade e Periculosidade</li>
            <li>Invalidez</li>
            <li>Jornadas de Trabalhos</li>
            <li>Justa Causa</li>
            <li>Pensão por Morte</li>
          </ul>

          <ul>
            <li>Reclamação Trabalhista</li>
            <li>Recurso Trabalhista</li>
            <li>Salário-Maternidade</li>
            <li>Verbas Rescisórias</li>
          </ul>
        </section>

        <section className="informacoes_de_contato">
          <div>
            <p>Endereço: beco da merda</p>
            <p>Telefone: (81) 12334-6443</p>
            <p>Email: gerashoty@gmail.com</p>
          </div>

          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1TLvU9THUUv4tjLveYW5hw5o38LQZRYo&ehbc=2E312F&noprof=1"
            width="600"
            height="430"
          ></iframe>
        </section>
      </main>

      <Footer />
    </>
  );
}
