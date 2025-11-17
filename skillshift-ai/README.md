# SkillShift AI

Plataforma de requalificação profissional com IA focada no **futuro do trabalho**.  
Ajuda usuários a descobrir novas trilhas de carreira, cursos e áreas em alta no mercado.

---

## 📌 Status do Projeto

> ✅ Em desenvolvimento / protótipo funcional para Global Solution 2025 – Front-end Design Engineering

---

## 📚 Sumário

1. [Sobre o Projeto](#-sobre-o-projeto)  
2. [Tecnologias Utilizadas](#-tecnologias-utilizadas)  
3. [Instalação](#-instalação)  
4. [Como Usar](#-como-usar)  
5. [Estrutura de Pastas](#-estrutura-de-pastas)  
6. [Rotas Principais](#-rotas-principais)  
7. [Integração com API](#-integração-com-api)  
8. [Autores e Créditos](#-autores-e-créditos)  
9. [Screenshots / Demonstração](#-screenshots--demonstração)  
10. [Contato](#-contato)  

---

## 🔍 Sobre o Projeto

O **SkillShift AI** está alinhado ao tema “O Futuro do Trabalho” e aos ODS:

- ODS 4 – Educação de qualidade  
- ODS 8 – Trabalho decente e crescimento econômico  

A aplicação permite:

- Visualizar recomendações de carreira e cursos  
- Simular consumo de API (ou usar API Java real, se configurada)  
- Navegar entre páginas obrigatórias da Global Solution  

---

## 🛠 Tecnologias Utilizadas

- **React** + **Vite** + **TypeScript**  
- **React Router DOM** (rotas SPA)  
- **TailwindCSS** (estilização e responsividade)  
- `fetch` nativo para consumo de API (sem axios, sem frameworks extras)  

---

## 💾 Instalação

```bash
git clone https://github.com/leojp04/SkillShift-AI.git
cd SkillShift-AI
npm install

Crie um arquivo .env com:

VITE_API_URL=https://sua-api-no-render.onrender.com


Se não informar a URL, a aplicação usará dados mock na página de recomendações.

▶️ Como Usar

Ambiente de desenvolvimento:

npm run dev


Acesse em:

http://localhost:5173
 (porta padrão do Vite)

Deploy (Vercel):

URL da aplicação: adicionar aqui a URL gerada na Vercel

Na Vercel, a variável de ambiente VITE_API_URL também deve ser configurada para apontar para a API Java publicada.

🗂 Estrutura de Pastas
src/
  components/
    Navbar.tsx
  contexts/
    ThemeContext.tsx
  pages/
    Home.tsx
    Sobre.tsx
    Integrantes.tsx
    Recomendacoes.tsx
    DetalheRecomendacao.tsx
    Contato.tsx
  types/
    recomendacao.ts
  App.tsx
  main.tsx
  index.css

🌐 Rotas Principais

/ – Home

/sobre – Sobre o projeto e ODS

/integrantes – Dados dos integrantes do grupo

/recomendacoes – Lista de recomendações de carreira (lista + CRUD básico)

/recomendacoes/:id – Detalhe de uma recomendação específica (rota dinâmica)

/contato – Página de contato (formulário mock)

🔗 Integração com API

A aplicação foi projetada para consumir uma API Java (Domain Driven Design Using Java):

Base URL configurada via VITE_API_URL

Endpoints esperados:

GET /recomendacoes

POST /recomendacoes

DELETE /recomendacoes/{id}

Quando a API não está configurada, a aplicação utiliza dados mock no front-end para não quebrar a experiência.

👥 Autores e Créditos
Nome	RM	Turma	GitHub	LinkedIn
Leonardo	RM…	1TDSPW	GitHub	LinkedIn
Fabrício	RM…	1TDSPW	GitHub	LinkedIn
Pedro	RM…	1TDSPW	GitHub	LinkedIn
🖼 Screenshots / Demonstração

Home com cards de objetivo e ODS

Página Sobre explicando problema e solução

Página Integrantes com dados e links

Página Recomendações listando e manipulando recomendações

Página Contato com formulário mock

(Screenshots podem ser adicionados como imagens Markdown depois.)

📬 Contato

Para mais informações:

Leonardo – RM… – 1TDSPW – GitHub / LinkedIn

Fabrício – RM… – 1TDSPW – GitHub / LinkedIn

Pedro – RM… – 1TDSPW – GitHub / LinkedIn

Links importantes:

Repositório GitHub: https://github.com/leojp04/SkillShift-AI

Deploy Vercel: colocar link

Vídeo de apresentação (YouTube): colocar link