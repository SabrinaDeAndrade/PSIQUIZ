"use client"

import { useEffect } from "react"

export default function QuizPage() {
  useEffect(() => {
    // Interceptar o resultado do quiz MBTI original e salvar no localStorage
    const interceptarResultado = () => {
      const originalSubmit = document.getElementById("mbti-quiz")?.addEventListener

      // Adicionar listener para quando o resultado for mostrado
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            const resultadoElement = document.getElementById("tipo-resultado")
            if (resultadoElement && resultadoElement.textContent) {
              const tipoMBTI = resultadoElement.textContent.trim()
              localStorage.setItem("resultadoMBTI", tipoMBTI)

              // Adicionar botão para ir ao teste vocacional
              const btnContainer = document.querySelector(".resultado-container")
              if (btnContainer && !document.getElementById("btn-vocacional")) {
                const btnVocacional = document.createElement("button")
                btnVocacional.id = "btn-vocacional"
                btnVocacional.innerHTML = "🎯 Fazer Teste Vocacional"
                btnVocacional.className = "btn-iniciar"
                btnVocacional.style.marginTop = "1rem"
                btnVocacional.style.backgroundColor = "#28a745"
                btnVocacional.onclick = () => {
                  window.location.href = "/profissoes"
                }

                const btnReiniciar = btnContainer.querySelector(".btn-reiniciar")
                if (btnReiniciar) {
                  btnContainer.insertBefore(btnVocacional, btnReiniciar)
                }
              }
            }
          }
        })
      })

      observer.observe(document.body, { childList: true, subtree: true })
    }

    // Aguardar o DOM carregar
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", interceptarResultado)
    } else {
      interceptarResultado()
    }
  }, [])

  // Renderizar o HTML original do quiz
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Quiz - PsiQuiz</title>
          <style>
            /* Incluir todos os estilos do CSS original aqui */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f8f9fa;
            }

            /* Header Styles */
            header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 1rem 0;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              position: sticky;
              top: 0;
              z-index: 100;
            }

            .header-container {
              max-width: 1200px;
              margin: 0 auto;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 2rem;
            }

            .logo img {
              height: 50px;
              width: auto;
              border-radius: 50%;
            }

            nav ul {
              display: flex;
              list-style: none;
              gap: 2rem;
            }

            nav a {
              color: white;
              text-decoration: none;
              font-weight: 500;
              padding: 0.5rem 1rem;
              border-radius: 25px;
              transition: all 0.3s ease;
            }

            nav a:hover {
              background-color: rgba(255, 255, 255, 0.2);
              transform: translateY(-2px);
            }

            nav a.active {
              background-color: rgba(255, 255, 255, 0.3);
            }

            /* Main Content */
            main {
              max-width: 1200px;
              margin: 0 auto;
              padding: 3rem 2rem;
              min-height: calc(100vh - 100px);
            }

            h1, h2, h3 {
              color: #2c3e50;
              margin-bottom: 1rem;
            }

            h2 {
              font-size: 2.5rem;
              text-align: center;
              margin-bottom: 2rem;
            }

            p {
              margin-bottom: 1.5rem;
              font-size: 1.1rem;
              text-align: center;
            }

            /* Button Styles */
            .btn-iniciar {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 1rem 2rem;
              text-decoration: none;
              border-radius: 50px;
              font-weight: bold;
              font-size: 1.2rem;
              margin: 2rem auto;
              display: block;
              width: fit-content;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
              border: none;
              cursor: pointer;
            }

            .btn-iniciar:hover {
              transform: translateY(-3px);
              box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
            }

            /* Resto dos estilos do quiz... */
            /* (incluir todos os estilos do arquivo CSS original) */
          </style>
        </head>
        <body>
          <header>
            <div class="header-container">
              <div class="logo">
                <a href="/">
                  <img src="/imagens/borboleta.png" alt="Logo Borboleta">
                </a>
              </div>
              <nav>
                <ul>
                  <li><a href="/">Início</a></li>
                  <li><a href="/mbti">MBTIs</a></li>
                  <li><a href="/tipos">Tipos de MBTI</a></li>
                  <li><a href="/quiz" class="active">Quiz</a></li>
                  <li><a href="/profissoes">Profissões</a></li>
                  <li><a href="/perfil">Perfil</a></li>
                  <li><a href="/login">Login</a></li>
                </ul>
              </nav>
            </div>
          </header>

          <!-- Incluir todo o conteúdo do quiz.html original aqui -->
          
          <footer>
            <p>&copy; 2024 PsiQuiz. Todos os direitos reservados.</p>
          </footer>
        </body>
        </html>
      `,
      }}
    />
  )
}
