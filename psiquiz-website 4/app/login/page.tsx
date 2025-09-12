import Header from "@/components/header"

export default function Login() {
  return (
    <>
      <Header />
      <main>
        <h2>Faça seu login</h2>
        <p>Em breve aqui você poderá acessar seu perfil personalizado!</p>

        <section className="metodo">
          <h3>Recursos do perfil personalizado:</h3>
          <p>
            Quando o sistema de login estiver ativo, você poderá salvar seus resultados do teste MBTI, acompanhar seu
            desenvolvimento pessoal ao longo do tempo, e receber recomendações personalizadas de carreira baseadas no
            seu tipo de personalidade.
          </p>
        </section>
      </main>
    </>
  )
}
