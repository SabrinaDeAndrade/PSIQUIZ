import Header from "@/components/header"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <h2>Descubra a sua personalidade MBTI!</h2>
        <Link href="/quiz" className="btn-iniciar">
          Iniciar o teste
        </Link>

        <section className="metodo">
          <h3>O que é o método MBTI?</h3>
          <p>
            O MBTI (Myers-Briggs Type Indicator) é um teste de personalidade que identifica as preferências de uma
            pessoa em quatro dimensões: Extroversão vs. Introversão, Sensorial vs. Intuição, Pensamento vs. Sentimento,
            e Julgamento vs. Percepção. Essas preferências, combinadas, resultam em 16 tipos de personalidade
            diferentes, oferecendo uma visão detalhada sobre as forças, fraquezas e preferências de comunicação de cada
            indivíduo.
          </p>
        </section>
      </main>
    </>
  )
}
