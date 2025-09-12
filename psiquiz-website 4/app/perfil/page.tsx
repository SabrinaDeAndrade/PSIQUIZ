import Header from "@/components/header"

export default function Perfil() {
  return (
    <>
      <Header />
      <main>
        <h2>Seu Perfil MBTI</h2>
        <p>Bem-vindo(a)! Aqui aparecerão suas informações de personalidade assim que você realizar o teste.</p>

        <section className="metodo">
          <h3>Exemplo de informações exibidas:</h3>
          <p>
            <strong>Tipo de personalidade:</strong> INFP – O Mediador
          </p>
          <p>
            <strong>Principais características:</strong> idealista, sensível, leal aos seus valores, criativo.
          </p>
          <p>
            <strong>Forças:</strong> empatia, imaginação, autenticidade.
          </p>
          <p>
            <strong>Fraquezas:</strong> indecisão, excesso de idealismo, sensibilidade ao conflito.
          </p>
        </section>
      </main>
    </>
  )
}
