import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import style from "@/css/Sobre.module.css";

export default function Sobre() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
        />
      </Head>

      <Header />
         <main>
        <h1 className={style.titulo_sobre}>
          Sobre <span>Geraldo Guedes</span>
        </h1>

        <div className={style.texto_sobre}>
          <p>
            <span>Geraldo Guedes</span> é advogado trabalhista com destacada atuação na
            defesa dos direitos dos trabalhadores e empregadores, sempre pautado
            pela ética, compromisso e excelência técnica. Formado em Direito
            pelo Centro Universitário de João Pessoa (UNIPÊ), construiu uma
            carreira sólida ao longo de mais de 10 anos de atuação no campo do
            Direito do Trabalho.
          </p>

          <p>
            Desde o início de sua trajetória, <span>Geraldo Guedes</span> demonstrou vocação
            para a área trabalhista, dedicando-se ao estudo profundo da
            Consolidação das Leis do Trabalho (CLT) e das constantes
            atualizações na jurisprudência brasileira. Sua experiência abrange
            desde ações individuais e coletivas até consultoria estratégica
            preventiva para empresas de diversos segmentos.
          </p>

          <p>
            Com uma abordagem humanizada, <span>Geraldo Guedes</span> acredita que o papel do
            advogado vai além do tribunal — é também orientar, esclarecer e
            buscar soluções justas e eficazes para todos os envolvidos. Seu
            compromisso com a justiça e com o respeito às relações de trabalho o
            tornou uma referência na área, sendo frequentemente convidado para
            palestras, seminários e entrevistas sobre temas trabalhistas.
          </p>

          <p>
            Além de sua atuação jurídica, <span>Geraldo Guedes</span> mantém constante
            atualização profissional, participando de congressos nacionais e
            cursos de especialização em Direito do Trabalho e Processo do
            Trabalho. Sua atuação é marcada por uma combinação rara de
            conhecimento técnico, empatia e combatividade — características que
            fazem dele um aliado de confiança em momentos decisivos. Seja na
            defesa de direitos violados ou na construção de ambientes
            corporativos mais saudáveis, <span>Geraldo Guedes</span> coloca sua expertise a
            serviço da justiça.
          </p>
        </div>
        
      </main>
      <Footer />
    </>
  );
}
