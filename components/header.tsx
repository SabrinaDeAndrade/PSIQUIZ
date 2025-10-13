import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <Link href="/">
            <Image src="/placeholder.svg?height=50&width=50" alt="Logo Borboleta" width={50} height={50} />
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/">Início</Link>
            </li>
            <li>
              <Link href="/mbti">MBTIs</Link>
            </li>
            <li>
              <Link href="/tipos">Tipos de MBTI</Link>
            </li>
            <li>
              <Link href="/quiz">Quiz</Link>
            </li>
            <li>
              <Link href="/profissoes">Profissões</Link>
            </li>
            <li>
              <Link href="/perfil">Perfil</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
