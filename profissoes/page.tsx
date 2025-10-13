"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Briefcase, Target, ArrowRight, RotateCcw, CheckCircle } from "lucide-react"

// Componente de Header para manter consistência
function Header({ currentPage = "profissoes" }: { currentPage?: string }) {
  return (
    <header
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "1rem 0",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="header-container">
        <div className="logo">
          <a href="/">
            <img src="/imagens/borboleta.png" alt="Logo Borboleta" />
          </a>
        </div>
        <nav>
          <ul>
            <li>
              <a href="/" className={currentPage === "inicio" ? "active" : ""}>
                Início
              </a>
            </li>
            <li>
              <a href="/mbti.html" className={currentPage === "mbti" ? "active" : ""}>
                MBTIs
              </a>
            </li>
            <li>
              <a href="/tipos.html" className={currentPage === "tipos" ? "active" : ""}>
                Tipos de MBTI
              </a>
            </li>
            <li>
              <a href="/quiz.html" className={currentPage === "quiz" ? "active" : ""}>
                Quiz
              </a>
            </li>
            <li>
              <a href="/profissoes" className={currentPage === "profissoes" ? "active" : ""}>
                Profissões
              </a>
            </li>
            <li>
              <a href="/perfil.html" className={currentPage === "perfil" ? "active" : ""}>
                Perfil
              </a>
            </li>
            <li>
              <a href="/login.html" className={currentPage === "login" ? "active" : ""}>
                Login
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

// Dados dos tipos MBTI
const tiposMBTI = {
  INTJ: "O Arquiteto",
  INTP: "O Lógico",
  ENTJ: "O Comandante",
  ENTP: "O Inovador",
  INFJ: "O Advogado",
  INFP: "O Mediador",
  ENFJ: "O Protagonista",
  ENFP: "O Ativista",
  ISTJ: "O Logístico",
  ISFJ: "O Defensor",
  ESTJ: "O Executivo",
  ESFJ: "O Cônsul",
  ISTP: "O Virtuoso",
  ISFP: "O Aventureiro",
  ESTP: "O Empreendedor",
  ESFP: "O Animador",
}

// Perguntas do teste vocacional
const perguntasVocacionais = [
  {
    id: 1,
    texto: "Que tipo de ambiente de trabalho você prefere?",
    opcoes: [
      { valor: "escritorio", texto: "Escritório tradicional com estrutura formal" },
      { valor: "criativo", texto: "Ambiente criativo e descontraído" },
      { valor: "remoto", texto: "Trabalho remoto ou híbrido" },
      { valor: "campo", texto: "Trabalho de campo ou ao ar livre" },
      { valor: "laboratorio", texto: "Laboratório ou ambiente técnico" },
    ],
  },
  {
    id: 2,
    texto: "Como você prefere trabalhar?",
    opcoes: [
      { valor: "equipe", texto: "Em equipe, colaborando constantemente" },
      { valor: "sozinho", texto: "Sozinho, com autonomia total" },
      { valor: "pequeno_grupo", texto: "Em pequenos grupos especializados" },
      { valor: "liderando", texto: "Liderando e coordenando outros" },
      { valor: "consultoria", texto: "Como consultor ou freelancer" },
    ],
  },
  {
    id: 3,
    texto: "Qual área mais desperta seu interesse?",
    opcoes: [
      { valor: "tecnologia", texto: "Tecnologia e inovação" },
      { valor: "saude", texto: "Saúde e bem-estar" },
      { valor: "educacao", texto: "Educação e desenvolvimento" },
      { valor: "negocios", texto: "Negócios e empreendedorismo" },
      { valor: "arte", texto: "Arte e criatividade" },
      { valor: "ciencias", texto: "Ciências e pesquisa" },
      { valor: "servicos", texto: "Serviços e atendimento" },
    ],
  },
  {
    id: 4,
    texto: "O que mais te motiva no trabalho?",
    opcoes: [
      { valor: "desafios", texto: "Resolver problemas complexos" },
      { valor: "pessoas", texto: "Ajudar e impactar pessoas" },
      { valor: "criatividade", texto: "Expressar criatividade" },
      { valor: "estabilidade", texto: "Ter estabilidade e segurança" },
      { valor: "reconhecimento", texto: "Obter reconhecimento e status" },
      { valor: "autonomia", texto: "Ter liberdade e autonomia" },
    ],
  },
  {
    id: 5,
    texto: "Qual tipo de tarefa você prefere?",
    opcoes: [
      { valor: "analitica", texto: "Análise de dados e informações" },
      { valor: "criativa", texto: "Criação e design" },
      { valor: "interpessoal", texto: "Interação com pessoas" },
      { valor: "tecnica", texto: "Trabalho técnico especializado" },
      { valor: "estrategica", texto: "Planejamento estratégico" },
      { valor: "operacional", texto: "Execução e operações" },
    ],
  },
  {
    id: 6,
    texto: "Que ritmo de trabalho você prefere?",
    opcoes: [
      { valor: "rapido", texto: "Ritmo acelerado com prazos apertados" },
      { valor: "equilibrado", texto: "Ritmo equilibrado e sustentável" },
      { valor: "flexivel", texto: "Ritmo flexível, conforme demanda" },
      { valor: "constante", texto: "Ritmo constante e previsível" },
      { valor: "intenso", texto: "Períodos intensos alternados com calma" },
    ],
  },
  {
    id: 7,
    texto: "Qual nível de responsabilidade você busca?",
    opcoes: [
      { valor: "alta", texto: "Alta responsabilidade e tomada de decisões" },
      { valor: "media", texto: "Responsabilidade moderada com supervisão" },
      { valor: "especialista", texto: "Responsabilidade técnica especializada" },
      { valor: "colaborativa", texto: "Responsabilidade compartilhada em equipe" },
      { valor: "crescente", texto: "Responsabilidade que cresce com o tempo" },
    ],
  },
  {
    id: 8,
    texto: "O que é mais importante para você na carreira?",
    opcoes: [
      { valor: "crescimento", texto: "Oportunidades de crescimento" },
      { valor: "equilibrio", texto: "Equilíbrio vida-trabalho" },
      { valor: "salario", texto: "Boa remuneração" },
      { valor: "proposito", texto: "Senso de propósito e significado" },
      { valor: "aprendizado", texto: "Aprendizado constante" },
      { valor: "impacto", texto: "Causar impacto positivo" },
    ],
  },
]

// Matriz de carreiras baseada em MBTI + interesses
const matrizCarreiras = {
  INTJ: {
    tecnologia: ["Arquiteto de Software", "Cientista de Dados", "CTO", "Pesquisador em IA"],
    ciencias: ["Pesquisador", "Cientista", "Analista de Sistemas", "Engenheiro"],
    negocios: ["Consultor Estratégico", "Analista de Negócios", "Planejador Financeiro"],
    saude: ["Médico Especialista", "Pesquisador Médico", "Bioinformático"],
    educacao: ["Professor Universitário", "Pesquisador Acadêmico"],
  },
  INTP: {
    tecnologia: ["Desenvolvedor", "Arquiteto de Sistemas", "Pesquisador em TI"],
    ciencias: ["Matemático", "Físico", "Químico", "Biólogo"],
    negocios: ["Analista Quantitativo", "Economista"],
    educacao: ["Professor", "Pesquisador"],
    arte: ["Designer de Jogos", "Escritor Técnico"],
  },
  ENTJ: {
    negocios: ["CEO", "Diretor Executivo", "Consultor Empresarial", "Empreendedor"],
    tecnologia: ["CTO", "Gerente de TI", "Product Manager"],
    saude: ["Administrador Hospitalar", "Diretor Médico"],
    educacao: ["Reitor", "Diretor Acadêmico"],
    servicos: ["Advogado Corporativo", "Consultor"],
  },
  ENTP: {
    negocios: ["Empreendedor", "Consultor de Inovação", "Gerente de Produto"],
    tecnologia: ["Product Manager", "UX Designer", "Consultor de TI"],
    arte: ["Publicitário", "Designer", "Jornalista"],
    educacao: ["Professor", "Palestrante", "Treinador"],
    servicos: ["Advogado", "Consultor", "Vendedor"],
  },
  INFJ: {
    saude: ["Psicólogo", "Terapeuta", "Conselheiro", "Psiquiatra"],
    educacao: ["Professor", "Orientador Educacional", "Coach"],
    servicos: ["Assistente Social", "Consultor", "Escritor"],
    arte: ["Escritor", "Artista", "Designer"],
    negocios: ["Consultor de RH", "Analista Organizacional"],
  },
  INFP: {
    arte: ["Escritor", "Artista", "Músico", "Designer Gráfico"],
    saude: ["Psicólogo", "Terapeuta", "Conselheiro"],
    educacao: ["Professor", "Bibliotecário", "Tutor"],
    servicos: ["Assistente Social", "Tradutor", "Jornalista"],
    tecnologia: ["UX Writer", "Designer de Experiência"],
  },
  ENFJ: {
    educacao: ["Professor", "Diretor Escolar", "Treinador Corporativo"],
    saude: ["Psicólogo", "Terapeuta", "Coach de Vida"],
    servicos: ["Gerente de RH", "Consultor Organizacional", "Assistente Social"],
    negocios: ["Gerente de Pessoas", "Consultor", "Coordenador"],
    arte: ["Ator", "Apresentador", "Comunicador"],
  },
  ENFP: {
    arte: ["Ator", "Músico", "Escritor", "Designer"],
    servicos: ["Jornalista", "Relações Públicas", "Vendedor"],
    educacao: ["Professor", "Treinador", "Palestrante"],
    saude: ["Psicólogo", "Terapeuta", "Coach"],
    negocios: ["Empreendedor", "Consultor", "Gerente de Marketing"],
  },
  ISTJ: {
    negocios: ["Contador", "Auditor", "Analista Financeiro", "Administrador"],
    saude: ["Farmacêutico", "Técnico em Saúde", "Administrador Hospitalar"],
    servicos: ["Advogado", "Juiz", "Funcionário Público"],
    tecnologia: ["Analista de Sistemas", "Administrador de Banco de Dados"],
    educacao: ["Professor", "Bibliotecário", "Administrador Escolar"],
  },
  ISFJ: {
    saude: ["Enfermeiro", "Médico de Família", "Nutricionista", "Fisioterapeuta"],
    educacao: ["Professor", "Orientador", "Bibliotecário"],
    servicos: ["Assistente Social", "Conselheiro", "Secretário Executivo"],
    negocios: ["Gerente de RH", "Administrador", "Contador"],
    arte: ["Designer", "Fotógrafo", "Artesão"],
  },
  ESTJ: {
    negocios: ["Gerente", "Administrador", "Diretor", "Contador"],
    servicos: ["Advogado", "Juiz", "Policial", "Militar"],
    saude: ["Administrador Hospitalar", "Gerente de Saúde"],
    tecnologia: ["Gerente de TI", "Analista de Negócios"],
    educacao: ["Diretor Escolar", "Administrador Educacional"],
  },
  ESFJ: {
    saude: ["Enfermeiro", "Médico", "Terapeuta", "Nutricionista"],
    educacao: ["Professor", "Orientador", "Coordenador"],
    servicos: ["Gerente de RH", "Atendimento ao Cliente", "Assistente Social"],
    negocios: ["Gerente", "Coordenador", "Vendedor"],
    arte: ["Organizador de Eventos", "Designer", "Comunicador"],
  },
  ISTP: {
    tecnologia: ["Engenheiro", "Técnico", "Desenvolvedor", "Analista de Sistemas"],
    campo: ["Mecânico", "Eletricista", "Técnico", "Piloto"],
    saude: ["Cirurgião", "Paramédico", "Fisioterapeuta"],
    arte: ["Designer", "Fotógrafo", "Artesão"],
    servicos: ["Bombeiro", "Policial", "Investigador"],
  },
  ISFP: {
    arte: ["Artista", "Designer", "Músico", "Fotógrafo"],
    saude: ["Terapeuta", "Veterinário", "Massagista", "Enfermeiro"],
    educacao: ["Professor de Arte", "Instrutor", "Tutor"],
    servicos: ["Chef", "Cabeleireiro", "Personal Trainer"],
    tecnologia: ["Designer UX/UI", "Desenvolvedor Frontend"],
  },
  ESTP: {
    negocios: ["Vendedor", "Empreendedor", "Corretor", "Gerente de Vendas"],
    servicos: ["Policial", "Bombeiro", "Paramédico", "Personal Trainer"],
    arte: ["Ator", "Apresentador", "Atleta Profissional"],
    campo: ["Guia Turístico", "Instrutor", "Técnico"],
    saude: ["Paramédico", "Fisioterapeuta", "Técnico em Emergências"],
  },
  ESFP: {
    arte: ["Ator", "Músico", "Dançarino", "Apresentador"],
    servicos: ["Vendedor", "Atendimento ao Cliente", "Organizador de Eventos"],
    educacao: ["Professor", "Instrutor", "Animador"],
    saude: ["Terapeuta Recreacional", "Enfermeiro", "Fisioterapeuta"],
    negocios: ["Vendedor", "Relações Públicas", "Marketing"],
  },
}

export default function ProfissoesPage() {
  const [etapa, setEtapa] = useState<"inicio" | "mbti" | "teste" | "resultado">("inicio")
  const [tipoMBTI, setTipoMBTI] = useState<string>("")
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [respostas, setRespostas] = useState<Record<number, string>>({})
  const [resultado, setResultado] = useState<string[]>([])

  // Verificar se há resultado MBTI salvo no localStorage
  useEffect(() => {
    const mbtiSalvo = localStorage.getItem("resultadoMBTI")
    if (mbtiSalvo && tiposMBTI[mbtiSalvo as keyof typeof tiposMBTI]) {
      setTipoMBTI(mbtiSalvo)
    }
  }, [])

  const calcularCarreiras = () => {
    if (!tipoMBTI) return []

    const perfil = matrizCarreiras[tipoMBTI as keyof typeof matrizCarreiras]
    if (!perfil) return []

    // Contar preferências por área
    const contadorAreas: Record<string, number> = {}

    Object.values(respostas).forEach((resposta) => {
      // Mapear respostas para áreas de interesse
      if (resposta.includes("tecnologia") || resposta === "analitica" || resposta === "tecnica") {
        contadorAreas.tecnologia = (contadorAreas.tecnologia || 0) + 1
      }
      if (resposta.includes("saude") || resposta === "pessoas" || resposta === "interpessoal") {
        contadorAreas.saude = (contadorAreas.saude || 0) + 1
      }
      if (resposta.includes("educacao") || resposta === "pessoas" || resposta === "proposito") {
        contadorAreas.educacao = (contadorAreas.educacao || 0) + 1
      }
      if (resposta.includes("negocios") || resposta === "liderando" || resposta === "estrategica") {
        contadorAreas.negocios = (contadorAreas.negocios || 0) + 1
      }
      if (resposta.includes("arte") || resposta === "criativa" || resposta === "criatividade") {
        contadorAreas.arte = (contadorAreas.arte || 0) + 1
      }
      if (resposta.includes("ciencias") || resposta === "desafios" || resposta === "analitica") {
        contadorAreas.ciencias = (contadorAreas.ciencias || 0) + 1
      }
      if (resposta === "servicos" || resposta === "pessoas" || resposta === "interpessoal") {
        contadorAreas.servicos = (contadorAreas.servicos || 0) + 1
      }
      if (resposta === "campo" || resposta === "autonomia") {
        contadorAreas.campo = (contadorAreas.campo || 0) + 1
      }
    })

    // Ordenar áreas por preferência
    const areasOrdenadas = Object.entries(contadorAreas)
      .sort(([, a], [, b]) => b - a)
      .map(([area]) => area)

    // Coletar carreiras das áreas mais preferidas
    const carreirasSugeridas: string[] = []

    areasOrdenadas.forEach((area) => {
      if (perfil[area as keyof typeof perfil]) {
        carreirasSugeridas.push(...perfil[area as keyof typeof perfil])
      }
    })

    // Se não houver preferências específicas, usar todas as carreiras do tipo MBTI
    if (carreirasSugeridas.length === 0) {
      Object.values(perfil).forEach((carreiras) => {
        carreirasSugeridas.push(...carreiras)
      })
    }

    // Remover duplicatas e limitar a 10 sugestões
    return [...new Set(carreirasSugeridas)].slice(0, 10)
  }

  const handleResposta = (valor: string) => {
    setRespostas((prev) => ({ ...prev, [perguntasVocacionais[perguntaAtual].id]: valor }))
  }

  const proximaPergunta = () => {
    if (perguntaAtual < perguntasVocacionais.length - 1) {
      setPerguntaAtual((prev) => prev + 1)
    } else {
      const carreiras = calcularCarreiras()
      setResultado(carreiras)
      setEtapa("resultado")
    }
  }

  const perguntaAnterior = () => {
    if (perguntaAtual > 0) {
      setPerguntaAtual((prev) => prev - 1)
    }
  }

  const reiniciarTeste = () => {
    setEtapa("inicio")
    setPerguntaAtual(0)
    setRespostas({})
    setResultado([])
  }

  const progresso = ((perguntaAtual + 1) / perguntasVocacionais.length) * 100

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fa" }}>
      <Header currentPage="profissoes" />

      {/* Conteúdo principal */}
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "calc(100vh - 80px)" }}>
        {etapa === "inicio" && (
          <main
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem", minHeight: "calc(100vh - 100px)" }}
          >
            <div className="text-center mb-8">
              <h2 style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: "2rem", color: "white" }}>
                Teste Vocacional Personalizado
              </h2>
              <p
                style={{
                  marginBottom: "1.5rem",
                  fontSize: "1.1rem",
                  textAlign: "center",
                  color: "rgba(255, 255, 255, 0.9)",
                  maxWidth: "600px",
                  margin: "0 auto 2rem",
                }}
              >
                Descubra as carreiras ideais baseadas no seu tipo MBTI e preferências profissionais
              </p>
            </div>

            <Card
              className="mb-8"
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                marginTop: "3rem",
              }}
            >
              <CardHeader>
                <CardTitle
                  className="flex items-center"
                  style={{ color: "#667eea", fontSize: "1.5rem", marginBottom: "1rem" }}
                >
                  <Target className="h-6 w-6 mr-2 text-purple-600" />
                  Como funciona este teste
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">🧠 Baseado no seu MBTI:</h3>
                    <ul
                      className="space-y-2 text-gray-600"
                      style={{ textAlign: "left", color: "#555", lineHeight: "1.8" }}
                    >
                      <li>• Considera seu tipo de personalidade</li>
                      <li>• Analisa suas preferências naturais</li>
                      <li>• Combina com interesses profissionais</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">💼 Recomendações precisas:</h3>
                    <ul
                      className="space-y-2 text-gray-600"
                      style={{ textAlign: "left", color: "#555", lineHeight: "1.8" }}
                    >
                      <li>• Carreiras alinhadas com sua personalidade</li>
                      <li>• Baseado em suas preferências de trabalho</li>
                      <li>• Sugestões personalizadas e práticas</li>
                    </ul>
                  </div>
                </div>

                <div style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "10px", marginTop: "2rem" }}>
                  <h4 className="font-semibold mb-2">📋 O que você precisa:</h4>
                  <p style={{ textAlign: "left", color: "#555", fontSize: "0.9rem" }}>
                    Conhecer seu tipo MBTI (se não souber, pode fazer o teste primeiro) e responder 8 perguntas sobre
                    suas preferências profissionais.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center space-y-4">
              <Button
                onClick={() => setEtapa(tipoMBTI ? "teste" : "mbti")}
                size="lg"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  padding: "1rem 2rem",
                  textDecoration: "none",
                  borderRadius: "50px",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  margin: "2rem auto",
                  display: "inline-block",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {tipoMBTI ? `Continuar com ${tipoMBTI}` : "Começar Teste Vocacional"}
                <ArrowRight className="ml-2 h-5 w-5" style={{ marginLeft: "0.5rem" }} />
              </Button>

              {!tipoMBTI && (
                <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.8)" }}>
                  Não sabe seu tipo MBTI?{" "}
                  <a href="/quiz" style={{ color: "white", textDecoration: "underline" }}>
                    Faça o teste MBTI primeiro
                  </a>
                </p>
              )}
            </div>
          </main>
        )}

        {etapa === "mbti" && (
          <div className="max-w-2xl mx-auto">
            <Card
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardHeader>
                <CardTitle
                  className="flex items-center"
                  style={{ color: "#667eea", fontSize: "1.5rem", marginBottom: "1rem" }}
                >
                  <Brain className="h-6 w-6 mr-2 text-purple-600" />
                  Qual é o seu tipo MBTI?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p style={{ color: "#666" }}>
                  Para personalizar suas recomendações de carreira, precisamos saber seu tipo de personalidade MBTI.
                </p>

                <div className="space-y-4">
                  <Label htmlFor="mbti-select" className="text-base font-medium">
                    Selecione seu tipo MBTI:
                  </Label>
                  <Select value={tipoMBTI} onValueChange={setTipoMBTI}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Escolha seu tipo MBTI..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(tiposMBTI).map(([tipo, nome]) => (
                        <SelectItem key={tipo} value={tipo}>
                          <div className="flex items-center">
                            <span className="font-bold mr-2">{tipo}</span>
                            <span className="text-gray-600">- {nome}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div
                  style={{ background: "#fff3cd", padding: "1rem", borderRadius: "10px", border: "1px solid #ffeaa7" }}
                >
                  <h4 style={{ fontWeight: "600", color: "#856404", marginBottom: "0.5rem" }}>
                    🤔 Não sabe seu tipo MBTI?
                  </h4>
                  <p style={{ color: "#856404", fontSize: "0.9rem", marginBottom: "1rem" }}>
                    Faça primeiro o teste de personalidade MBTI para descobrir seu tipo e depois volte aqui.
                  </p>
                  <Button
                    onClick={() => (window.location.href = "/quiz")}
                    style={{
                      background: "white",
                      border: "1px solid #ddd",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Fazer Teste MBTI
                  </Button>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    onClick={() => setEtapa("inicio")}
                    style={{
                      background: "transparent",
                      border: "1px solid #ddd",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={() => {
                      localStorage.setItem("resultadoMBTI", tipoMBTI)
                      setEtapa("teste")
                    }}
                    disabled={!tipoMBTI}
                    style={{
                      background: tipoMBTI ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#ccc",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      cursor: tipoMBTI ? "pointer" : "not-allowed",
                    }}
                  >
                    Continuar para o Teste
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {etapa === "teste" && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>Teste Vocacional</h1>
                <div className="flex items-center space-x-4">
                  <Badge
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                    }}
                  >
                    {tipoMBTI} - {tiposMBTI[tipoMBTI as keyof typeof tiposMBTI]}
                  </Badge>
                  <Badge
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Pergunta {perguntaAtual + 1} de {perguntasVocacionais.length}
                  </Badge>
                </div>
              </div>
              <Progress
                value={progresso}
                className="h-2"
                style={{
                  width: "100%",
                  height: "8px",
                  background: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              />
              <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.8)", marginTop: "0.5rem" }}>
                {Math.round(progresso)}% concluído
              </p>
            </div>

            <Card
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardHeader>
                <CardTitle style={{ fontSize: "1.2rem", color: "#667eea" }}>Pergunta {perguntaAtual + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div style={{ fontSize: "1.1rem", fontWeight: "500", color: "#333" }}>
                  {perguntasVocacionais[perguntaAtual].texto}
                </div>

                <RadioGroup
                  value={respostas[perguntasVocacionais[perguntaAtual].id] || ""}
                  onValueChange={handleResposta}
                >
                  <div className="space-y-3">
                    {perguntasVocacionais[perguntaAtual].opcoes.map((opcao) => (
                      <div
                        key={opcao.valor}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.75rem",
                          borderRadius: "8px",
                          border: "1px solid #e5e5e5",
                          cursor: "pointer",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <RadioGroupItem
                          value={opcao.valor}
                          id={`q${perguntasVocacionais[perguntaAtual].id}-${opcao.valor}`}
                        />
                        <Label
                          htmlFor={`q${perguntasVocacionais[perguntaAtual].id}-${opcao.valor}`}
                          style={{ marginLeft: "0.5rem", cursor: "pointer", fontSize: "0.9rem", flex: 1 }}
                        >
                          {opcao.texto}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex justify-between pt-4">
                  <Button
                    onClick={perguntaAnterior}
                    disabled={perguntaAtual === 0}
                    style={{
                      background: "transparent",
                      border: "1px solid #ddd",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      cursor: perguntaAtual === 0 ? "not-allowed" : "pointer",
                      opacity: perguntaAtual === 0 ? 0.5 : 1,
                    }}
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={proximaPergunta}
                    disabled={!respostas[perguntasVocacionais[perguntaAtual].id]}
                    style={{
                      background: respostas[perguntasVocacionais[perguntaAtual].id]
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "#ccc",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      cursor: respostas[perguntasVocacionais[perguntaAtual].id] ? "pointer" : "not-allowed",
                    }}
                  >
                    {perguntaAtual === perguntasVocacionais.length - 1 ? "Ver Resultado" : "Próxima"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {etapa === "resultado" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-600 mr-3" style={{ color: "white" }} />
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "white" }}>Suas Carreiras Recomendadas</h1>
              </div>
              <p style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                Baseado no seu tipo MBTI <strong>{tipoMBTI}</strong> e suas preferências profissionais
              </p>
            </div>

            <div className="grid gap-6">
              {/* Resumo do Perfil */}
              <Card
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "15px",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-xl" style={{ color: "#667eea", fontSize: "1.3rem" }}>
                    <Brain className="h-6 w-6 mr-2 text-purple-600" />
                    Seu Perfil Profissional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-4">
                    <Badge
                      style={{
                        fontSize: "1.1rem",
                        padding: "0.5rem 1rem",
                        background: "#f3e8ff",
                        color: "#7c3aed",
                        borderRadius: "20px",
                      }}
                    >
                      {tipoMBTI} - {tiposMBTI[tipoMBTI as keyof typeof tiposMBTI]}
                    </Badge>
                  </div>
                  <p style={{ textAlign: "center", color: "#666" }}>
                    Com base em suas respostas, identificamos as carreiras que melhor se alinham com sua personalidade e
                    interesses profissionais.
                  </p>
                </CardContent>
              </Card>

              {/* Carreiras Recomendadas */}
              <Card
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "15px",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-xl" style={{ color: "#2563eb", fontSize: "1.3rem" }}>
                    <Briefcase className="h-6 w-6 mr-2 text-blue-600" />
                    Carreiras Ideais para Você
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p style={{ color: "#666", marginBottom: "1.5rem" }}>
                    Com base no seu tipo de personalidade <strong>{tipoMBTI}</strong>, estas são as carreiras que mais
                    se alinham com suas características naturais:
                  </p>

                  {resultado.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {resultado.map((carreira, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "1rem",
                            background: "linear-gradient(to right, #eff6ff, #f3e8ff)",
                            borderRadius: "8px",
                            border: "1px solid #e0e7ff",
                          }}
                        >
                          <div
                            style={{
                              width: "2rem",
                              height: "2rem",
                              background: "#3b82f6",
                              color: "white",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.9rem",
                              fontWeight: "bold",
                              marginRight: "0.75rem",
                              flexShrink: 0,
                            }}
                          >
                            {index + 1}
                          </div>
                          <span style={{ color: "#374151", fontWeight: "500" }}>{carreira}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ textAlign: "center", color: "#9ca3af" }}>
                      Não foi possível gerar recomendações. Tente refazer o teste.
                    </p>
                  )}

                  <div
                    style={{
                      marginTop: "1.5rem",
                      padding: "1rem",
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                      borderRadius: "8px",
                    }}
                  >
                    <h4 style={{ fontWeight: "600", color: "#166534", marginBottom: "0.5rem" }}>💡 Próximos passos:</h4>
                    <ul style={{ color: "#166534", fontSize: "0.9rem", lineHeight: "1.4", paddingLeft: "1rem" }}>
                      <li>• Pesquise mais sobre as carreiras que despertaram seu interesse</li>
                      <li>• Converse com profissionais dessas áreas</li>
                      <li>• Considere fazer cursos ou estágios para experimentar</li>
                      <li>• Lembre-se: estas são sugestões baseadas em seu perfil, explore suas paixões!</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={reiniciarTeste}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Fazer Teste Novamente
              </Button>
            </div>
          </div>
        )}
      </div>

      <footer style={{ background: "#2c3e50", color: "white", textAlign: "center", padding: "2rem 0" }}>
        <p>&copy; 2024 PsiQuiz. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
