# SkillShift AI — Global Solution 2025 (Front-End Design Engineering)

Plataforma acadêmica de requalificação profissional com IA, alinhada ao Futuro do Trabalho e às ODS 4, 8, 9 e 10. Ajudamos pessoas em risco de automação a encontrarem novas rotas de carreira, trilhas de estudo e cursos recomendados.

---

## 📌 Status do Projeto
✅ Em desenvolvimento / protótipo funcional (Vercel + APIs na Render)

---

## 📚 Sumário
1. [Sobre o Projeto](#-sobre-o-projeto)  
2. [Tecnologias Utilizadas](#-tecnologias-utilizadas)  
3. [Instalação](#-instalação)  
4. [Como Usar](#-como-usar)  
5. [Estrutura de Pastas](#estrutura-de-pastas)  
6. [Rotas Principais](#-rotas-principais)  
7. [Integração com APIs](#-integração-com-apis)  
8. [Integrantes](#integrantes)  
9. [Screenshots / Demonstração](#-screenshots--demonstração)  
10. [Vídeo de Demonstração](#vídeo-de-demonstração)  
11. [Contato](#-contato)  

---

## 🔍 Sobre o Projeto
- Tema: Futuro do Trabalho e requalificação profissional (reskilling).  
- Objetivo: avaliar perfil e risco de automação, sugerir macro-áreas, trilhas de estudo e cursos.  
- ODS trabalhadas:  
  - ODS 4 — Educação de Qualidade  
  - ODS 8 — Trabalho Decente e Crescimento Econômico  
  - ODS 9 — Indústria, Inovação e Infraestrutura  
  - ODS 10 — Redução das Desigualdades  
- Stack: React + Vite + TypeScript + TailwindCSS, SPA com rotas client-side.  
- Integrações:
  - API Java (Quarkus) para autenticação/usuários e histórico.
  - API Python (Flask) para IA de recomendações (macro-área + cursos).

---

## 🛠 Tecnologias Utilizadas
- React 19, Vite, TypeScript  
- React Router DOM (SPA)  
- TailwindCSS (estilização e responsividade)  
- Context API (tema e autenticação)  
- Fetch nativo para chamadas HTTP  

---

## 💾 Instalação
```bash
git clone https://github.com/leojp04/SkillShift-AI.git
cd SkillShift-AI/skillshift-ai
npm install
```

Crie o arquivo `.env` na raiz do front:
```
VITE_API_URL=https://skillshiftai-api-gs.onrender.com
VITE_IA_BASE_URL=https://skillshift-ai-platform.onrender.com
```

---

## ▶️ Como Usar
- Desenvolvimento:  
  ```bash
  npm run dev
  ```  
  Acesse http://localhost:5173

- Build:  
  ```bash
  npm run build
  npm run preview
  ```

- Produção (Vercel):  
  https://skill-shift-ai-rust.vercel.app  
  Configure as variáveis de ambiente na Vercel com os mesmos valores do `.env`.

---

## Estrutura de Pastas
```
skillshift-ai/
├── public/
│   ├── Fabricio.jpg
│   ├── Leonardo.jpg
│   ├── Pedro.jpeg
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── RequireAuth.tsx
│   ├── config/
│   │   └── api.ts
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── pages/
│   │   ├── Cadastro.tsx
│   │   ├── Contato.tsx
│   │   ├── DetalheRecomendacao.tsx
│   │   ├── FAQ.tsx
│   │   ├── Historico.tsx
│   │   ├── Home.tsx
│   │   ├── Integrantes.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   ├── Perfil.tsx
│   │   ├── Recomendacoes.tsx
│   │   └── Sobre.tsx
│   ├── services/
│   │   ├── apiClient.ts
│   │   ├── authApi.ts
│   │   ├── historyApi.ts
│   │   └── iaApi.ts
│   ├── types/
│   │   └── recomendacao.ts
│   ├── utils/
│   │   └── recommendationHistory.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🌐 Rotas Principais
- `/` — Home  
- `/sobre` — Sobre o projeto e ODS  
- `/integrantes` — Dados completos dos integrantes (foto, RM, turma, GitHub, LinkedIn)  
- `/recomendacoes` — Formulário de IA para gerar macro-área e cursos  
- `/recomendacoes/:id` — Detalhe de recomendação (rota dinâmica)  
- `/historico` — Histórico das consultas (requer login)  
- `/faq` — Perguntas frequentes  
- `/contato` — Contato  
- `/login` e `/cadastro` — Autenticação  
- `/perfil` — Dados do usuário e troca de senha  
- `*` — NotFound  

---

## 🔗 Integração com APIs
- **API Java (Quarkus) — https://skillshiftai-api-gs.onrender.com**
  - `POST /auth/register` — cadastro
  - `POST /auth/login` — login (retorna token)
  - `GET /me` — dados do usuário autenticado
  - `PATCH|PUT|POST /me/password` — alterar senha
  - `GET /recomendacoes/historico` — histórico de recomendações do usuário
  - `POST /recomendacoes/historico` — salvar recomendação gerada

- **API IA (Python/Flask) — https://skillshift-ai-platform.onrender.com**
  - `POST /predict-area` — retorna macro-área sugerida e explicação
  - `POST /cluster-profile` — retorna cluster e cursos recomendados

Erros são tratados com mensagens amigáveis e estados de loading nas telas de Login, Cadastro, Recomendações e Histórico.

---

## Integrantes

- **Leonardo José Pereira** — RM **563065** — 1TDSPW  
  GitHub: https://github.com/leojp04 • LinkedIn: https://www.linkedin.com/in/leonardo-pereira-adm/
- **Fabrício Henrique Pereira** — RM **563237** — 1TDSPW  
  GitHub: https://github.com/Fabriciopereira-sp • LinkedIn: https://www.linkedin.com/in/fabr%C3%ADcio-henrique-pereira-3aa94933b/
- **Pedro Henrique de Oliveira** — RM **562312** — 1TDSPW  
  GitHub: https://github.com/pedrinzz10 • LinkedIn: https://www.linkedin.com/in/pedro-henrique-oliveira-484336261/


---

## 🖼 Screenshots / Demonstração

> As imagens abaixo ilustram as principais telas da aplicação SkillShift AI.

- **Home / Início**

  ![Home](./docs/screenshots/home.png)

- **Recomendações de Carreira**

  ![Recomendações](./docs/screenshots/recomendacoes.png)

- **Histórico de Recomendações**

  ![Histórico](./docs/screenshots/historico.png)

- **Perfil do Usuário**

  ![Perfil](./docs/screenshots/perfil.png)

- **Integrantes do Projeto**

  ![Integrantes](./docs/screenshots/integrantes.png)

---

## Vídeo de Demonstração


- 🔗 [Assista ao vídeo no YouTube](https://youtu.be/SEU_VIDEO_AQUI)

---

## 📬 Contato
- Projeto: https://github.com/leojp04/SkillShift-AI  
- Deploy: https://skill-shift-ai-rust.vercel.app  
- Equipe (RMs e turma): ver seção de Integrantes.  
 
