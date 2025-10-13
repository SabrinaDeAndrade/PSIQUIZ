import Header from "@/components/header"

export default function MBTI() {
  return (
    <>
      <Header />
      <main>
        <h2>Conheça os tipos MBTI</h2>
        <p>Explore os 16 tipos de personalidade com descrições detalhadas.</p>

        <section className="metodo">
          <h3>Como funciona o MBTI?</h3>
          <p>
            O MBTI é baseado em quatro dimensões principais que determinam como você processa informações, toma decisões
            e interage com o mundo. Cada pessoa tem preferências naturais em cada uma dessas dimensões, criando um
            perfil único de personalidade.
          </p>
        </section>
      </main>
    </>
  )
}
