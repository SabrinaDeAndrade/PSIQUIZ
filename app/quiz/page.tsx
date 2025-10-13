import Header from "@/components/header"

export default function Quiz() {
  return (
    <>
      <Header />
      <main>
        <h2>Teste de Personalidade</h2>
        <p>Responda às perguntas abaixo e descubra seu tipo MBTI!</p>

        <section className="metodo">
          <h3>Como funciona o teste?</h3>
          <p>
            Nosso teste consiste em uma série de perguntas cuidadosamente elaboradas para identificar suas preferências
            naturais. Não existem respostas certas ou erradas - apenas seja honesto(a) consigo mesmo(a) e escolha a
            opção que mais se aproxima do seu comportamento natural.
          </p>
        </section>
      </main>
    </>
  )
}
