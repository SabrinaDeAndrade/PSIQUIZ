import Header from "@/components/header"

export default function Tipos() {
  return (
    <>
      <Header />
      <main>
        <h2>Os 4 Grupos do MBTI</h2>
        <p>
          Os 16 tipos de personalidade MBTI são organizados em 4 grupos principais. Cada grupo compartilha traços e
          valores semelhantes.
        </p>

        <section className="grupo-boxes">
          <div className="grupo">
            <h3>🎯 Analistas (NT)</h3>
            <p>Racionais, estratégicos e independentes. Valorizam lógica, eficiência e inovação.</p>
            <ul>
              <li>
                <strong>INTJ</strong> – Arquiteto
              </li>
              <li>
                <strong>INTP</strong> – Lógico
              </li>
              <li>
                <strong>ENTJ</strong> – Comandante
              </li>
              <li>
                <strong>ENTP</strong> – Inovador
              </li>
            </ul>
          </div>

          <div className="grupo">
            <h3>🌿 Diplomatas (NF)</h3>
            <p>Empáticos, idealistas e intuitivos. Guiam-se por valores e conexões humanas.</p>
            <ul>
              <li>
                <strong>INFJ</strong> – Advogado
              </li>
              <li>
                <strong>INFP</strong> – Mediador
              </li>
              <li>
                <strong>ENFJ</strong> – Protagonista
              </li>
              <li>
                <strong>ENFP</strong> – Ativista
              </li>
            </ul>
          </div>

          <div className="grupo">
            <h3>🛡️ Sentinelas (SJ)</h3>
            <p>Práticos, organizados e responsáveis. Gostam de estabilidade, regras e rotina.</p>
            <ul>
              <li>
                <strong>ISTJ</strong> – Logístico
              </li>
              <li>
                <strong>ISFJ</strong> – Defensor
              </li>
              <li>
                <strong>ESTJ</strong> – Executivo
              </li>
              <li>
                <strong>ESFJ</strong> – Cônsul
              </li>
            </ul>
          </div>

          <div className="grupo">
            <h3>🧭 Exploradores (SP)</h3>
            <p>Espontâneos, flexíveis e aventureiros. Adaptam-se bem e vivem intensamente o presente.</p>
            <ul>
              <li>
                <strong>ISTP</strong> – Virtuoso
              </li>
              <li>
                <strong>ISFP</strong> – Aventureiro
              </li>
              <li>
                <strong>ESTP</strong> – Empreendedor
              </li>
              <li>
                <strong>ESFP</strong> – Animador
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}
