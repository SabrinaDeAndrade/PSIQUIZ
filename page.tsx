"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Briefcase, Target, ArrowRight, RotateCcw, CheckCircle } from "lucide-react"

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
  // Analistas (NT)
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

  // Diplomatas (NF)
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

  // Sentinelas (SJ)
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

  // Exploradores (SP)
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

export default function TesteVocacional() {
  const [etapa, setEtapa] = useState<"inicio" | "mbti" | "teste" | "resultado">("inicio")
  const [tipoMBTI, setTipoMBTI] = useState<string>("")
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [respostas, setRespostas] = useState<Record<number, string>>({})
  const [resultado, setResultado] = useState<string[]>([])

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
    setTipoMBTI("")
  }

  const progresso = ((perguntaAtual + 1) / perguntasVocacionais.length) * 100

  if (etapa === "inicio") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Briefcase className="h-12 w-12 text-purple-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-800">Teste Vocacional Personalizado</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra as carreiras ideais baseadas no seu tipo MBTI e preferências profissionais
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 mr-2 text-purple-600" />
                Como funciona este teste
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">🧠 Baseado no seu MBTI:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Considera seu tipo de personalidade</li>
                    <li>• Analisa suas preferências naturais</li>
                    <li>• Combina com interesses profissionais</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">💼 Recomendações precisas:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Carreiras alinhadas com sua personalidade</li>
                    <li>• Baseado em suas preferências de trabalho</li>
                    <li>• Sugestões personalizadas e práticas</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h4 className="font-semibold mb-2">📋 O que você precisa:</h4>
                <p className="text-sm text-gray-600">
                  Conhecer seu tipo MBTI (se não souber, pode fazer o teste primeiro) e responder 8 perguntas sobre suas
                  preferências profissionais.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <Button
              onClick={() => setEtapa("mbti")}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg mr-4"
            >
              Começar Teste Vocacional
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-sm text-gray-500">
              Não sabe seu tipo MBTI?{" "}
              <a href="/quiz" className="text-purple-600 hover:underline">
                Faça o teste MBTI primeiro
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (etapa === "mbti") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-6 w-6 mr-2 text-purple-600" />
                Qual é o seu tipo MBTI?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
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

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">🤔 Não sabe seu tipo MBTI?</h4>
                <p className="text-yellow-700 text-sm mb-3">
                  Faça primeiro o teste de personalidade MBTI para descobrir seu tipo e depois volte aqui.
                </p>
                <Button variant="outline" size="sm" className="bg-white">
                  Fazer Teste MBTI
                </Button>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setEtapa("inicio")}>
                  Voltar
                </Button>
                <Button
                  onClick={() => setEtapa("teste")}
                  disabled={!tipoMBTI}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Continuar para o Teste
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (etapa === "teste") {
    const pergunta = perguntasVocacionais[perguntaAtual]

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Teste Vocacional</h1>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-sm">
                  {tipoMBTI} - {tiposMBTI[tipoMBTI as keyof typeof tiposMBTI]}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Pergunta {perguntaAtual + 1} de {perguntasVocacionais.length}
                </Badge>
              </div>
            </div>
            <Progress value={progresso} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">{Math.round(progresso)}% concluído</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-purple-700">Pergunta {perguntaAtual + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg font-medium text-gray-800">{pergunta.texto}</div>

              <RadioGroup value={respostas[pergunta.id] || ""} onValueChange={handleResposta}>
                <div className="space-y-3">
                  {pergunta.opcoes.map((opcao) => (
                    <div
                      key={opcao.valor}
                      className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      <RadioGroupItem value={opcao.valor} id={`q${pergunta.id}-${opcao.valor}`} />
                      <Label htmlFor={`q${pergunta.id}-${opcao.valor}`} className="flex-1 cursor-pointer text-sm">
                        {opcao.texto}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={perguntaAnterior} disabled={perguntaAtual === 0}>
                  Anterior
                </Button>
                <Button
                  onClick={proximaPergunta}
                  disabled={!respostas[pergunta.id]}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {perguntaAtual === perguntasVocacionais.length - 1 ? "Ver Resultado" : "Próxima"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (etapa === "resultado") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">Suas Carreiras Recomendadas</h1>
            </div>
            <p className="text-gray-600">
              Baseado no seu tipo MBTI <strong>{tipoMBTI}</strong> e suas preferências profissionais
            </p>
          </div>

          <div className="grid gap-6">
            {/* Resumo do Perfil */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Brain className="h-6 w-6 mr-2 text-purple-600" />
                  Seu Perfil Profissional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <Badge variant="secondary" className="text-lg px-4 py-2 bg-purple-100 text-purple-800">
                    {tipoMBTI} - {tiposMBTI[tipoMBTI as keyof typeof tiposMBTI]}
                  </Badge>
                </div>
                <p className="text-center text-gray-600">
                  Com base em suas respostas, identificamos as carreiras que melhor se alinham com sua personalidade e
                  interesses profissionais.
                </p>
              </CardContent>
            </Card>

            {/* Carreiras Recomendadas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Briefcase className="h-6 w-6 mr-2 text-blue-600" />
                  Carreiras Ideais para Você
                </CardTitle>
              </CardHeader>
              <CardContent>
                {resultado.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {resultado.map((carreira, index) => (
                      <div
                        key={index}
                        className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100"
                      >
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-800 font-medium">{carreira}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    Não foi possível gerar recomendações. Tente refazer o teste.
                  </p>
                )}

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">💡 Próximos passos:</h4>
                  <ul className="text-green-700 text-sm space-y-1">
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
            <Button onClick={reiniciarTeste} variant="outline" size="lg" className="mr-4 bg-transparent">
              <RotateCcw className="mr-2 h-5 w-5" />
              Fazer Teste Novamente
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
