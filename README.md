# Simulado SEDES-DF — Plataforma Premium de Concursos

Plataforma web de preparação para o concurso da **SEDES-DF (Secretaria de Estado de Desenvolvimento Social do Distrito Federal)**, com foco na banca **Quadrix**. Oferece simulados interativos, acompanhamento de desempenho, biblioteca de materiais e cursos — tudo sustentado pelo ecossistema **Firebase**.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitetura Firebase](#arquitetura-firebase)
- [Coleções do Firestore](#coleções-do-firestore)
- [Regras de Segurança](#regras-de-segurança)
- [Cloud Functions](#cloud-functions)
- [Configuração e Instalação](#configuração-e-instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Executando Localmente](#executando-localmente)
- [Deploy](#deploy)
- [Papéis de Usuário](#papéis-de-usuário)
- [Planos e Pagamento](#planos-e-pagamento)

---

## Visão Geral

O **Simulado SEDES-DF** é uma plataforma educacional voltada à preparação para o concurso público da SEDES-DF, previsto para **06/09/2026**. A plataforma foi desenvolvida pelo **Prof. Betão** e oferece:

- Questões no estilo da banca Quadrix
- Painel de desempenho em tempo real
- Ranking comparativo entre alunos
- Biblioteca de materiais gratuitos (apostilas e PDFs)
- Trilhas de cursos estratégicos

---

## Funcionalidades

| Módulo | Descrição |
|---|---|
| **Landing Page** | Apresentação da plataforma, depoimentos, FAQ e planos de assinatura |
| **Autenticação** | Cadastro, login, verificação de e-mail e recuperação de senha via Firebase Auth |
| **Simulado** | Questões interativas com timer, revisão de alternativas e gabarito comentado |
| **Resultado** | Exibição do percentual de acertos, pontuação e análise por questão |
| **Dashboard** | Painel do aluno com visão geral, ranking, metas e calendário de estudos |
| **Cursos** | Trilhas estratégicas para acelerar a aprovação |
| **Materiais** | Biblioteca com apostilas, PDFs e listas de questões para download |

---

## Estrutura do Projeto

```
├── index.html          # Landing page principal
├── simulados.html      # Página de apresentação do simulado
├── simulado.html       # Motor do simulado interativo
├── resultado.html      # Tela de resultado e gabarito
├── dashboard.html      # Painel do aluno
├── cursos.html         # Catálogo de cursos
├── materiais.html      # Biblioteca de materiais gratuitos
├── auth.js             # Módulo de autenticação Firebase
├── script.js           # Scripts da landing page (nav, FAQ, quiz)
├── cursos.js           # Lógica da página de cursos
├── materiais.js        # Lógica da biblioteca de materiais
├── styles.css          # Estilos globais
├── firebase.json       # Configuração do Firebase (hosting, functions, rules)
├── firestore.rules     # Regras de segurança do Firestore
├── storage.rules       # Regras de segurança do Firebase Storage
├── assets/
│   ├── Logo Betao.png  # Logo da plataforma
│   └── pdfs/           # Materiais em PDF
└── functions/
    ├── index.js        # Cloud Functions (auditoria, backup, criptografia de CPF)
    └── package.json    # Dependências das functions
```

---

## Stack Tecnológico

**Frontend**
- HTML5 + CSS3 + JavaScript (ES Modules, sem framework)
- Google Fonts: Inter, Manrope, Poppins
- Swiper.js (carrossel da landing page)

**Backend / Infraestrutura**
- Firebase Authentication
- Cloud Firestore (banco de dados NoSQL)
- Firebase Storage (arquivos e fotos de perfil)
- Firebase Cloud Functions (Node.js 20)
- Firebase Hosting
- Firebase Security Rules

---

## Arquitetura Firebase

```
Firebase Project
├── Authentication      → login por e-mail/senha com verificação de e-mail
├── Cloud Firestore     → dados de usuários, simulados, questões, resultados
├── Firebase Storage    → PDFs, fotos de perfil
├── Cloud Functions     → auditoria, backup diário, criptografia de CPF
└── Firebase Hosting    → entrega do frontend estático
```

As requisições às Cloud Functions são roteadas via `firebase.json` com o prefixo `/api/**`.

---

## Coleções do Firestore

### `users`
Perfis dos usuários cadastrados.

| Campo | Tipo | Descrição |
|---|---|---|
| `name` | string | Nome completo |
| `email` | string | E-mail |
| `cpfEncrypted` | string | CPF criptografado (AES-256-GCM) |
| `phone` | string | Telefone |
| `role` | string | `admin`, `professor`, `monitor`, `aluno`, `visitante` |
| `plan` | string | Plano ativo (`gratuito`, `premium`, etc.) |
| `paymentStatus` | string | `paid`, `pending`, `cancelled` |
| `status` | string | `active`, `inactive` |
| `permissions` | map | Permissões personalizadas |
| `createdAt` | timestamp | Data de cadastro |
| `lastLogin` | timestamp | Último acesso |
| `photoUrl` | string | URL da foto de perfil |

**Subcoleções:** `users/{userId}/loginLogs`, `users/{userId}/securityEvents`

### `simulados`
Configuração e metadados dos simulados.

| Campo | Tipo | Descrição |
|---|---|---|
| `name` | string | Nome do simulado |
| `category` | string | Categoria |
| `exam` | string | Concurso alvo |
| `position` | string | Cargo |
| `questionCount` | number | Número de questões |
| `durationMinutes` | number | Duração em minutos |
| `status` | string | `draft`, `published`, `archived` |
| `professorId` | string | ID do professor responsável |

**Subcoleções:** `simulados/{simuladoId}/questions`, `simulados/{simuladoId}/attempts`

### `questoes`
Banco de questões reutilizáveis.

| Campo | Tipo | Descrição |
|---|---|---|
| `question` | string | Enunciado |
| `options` | array | Alternativas |
| `correctAnswer` | string | Resposta correta |
| `explanation` | string | Comentário do gabarito |
| `subject` | string | Disciplina |
| `difficulty` | string | `easy`, `medium`, `hard` |
| `weight` | number | Peso da questão |

### `redacoes`
Textos enviados pelos alunos para correção.

### `resultados`
Histórico de tentativas e pontuações por aluno.

### `assinaturas`
Dados de assinatura e pagamento dos usuários.

### `logs`
Auditoria de todas as operações críticas do sistema.

---

## Regras de Segurança

| Coleção | Leitura | Escrita |
|---|---|---|
| `users` | Próprio usuário ou admin | Próprio usuário ou admin |
| `simulados` | Usuários autenticados | Admin ou professor proprietário |
| `questoes` | Usuários autenticados | Admin ou professor proprietário |
| `redacoes` | Autor, admin ou professor responsável | Apenas autor |
| `resultados` | Dono, professor ou admin | Dono ou admin |
| `assinaturas` | Dono ou admin | Apenas admin |
| `logs` | Apenas admins | Qualquer usuário autenticado (próprio log) |

---

## Cloud Functions

Localizadas em `functions/index.js`:

| Função | Gatilho | Descrição |
|---|---|---|
| `createAuditLog` | Firestore `onWrite` | Registra toda criação, atualização e exclusão de documentos em `logs` |
| `backupFirestore` | Agendado (a cada 24h) | Exporta snapshot do Firestore para o bucket de backup no GCS |
| `encryptCpf` | HTTPS Callable | Criptografa o CPF do usuário com AES-256-GCM antes de persistir |
| `restoreBackup` | HTTPS Callable | Restaura backup (somente admins) |

---

## Configuração e Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) v20+
- [Firebase CLI](https://firebase.google.com/docs/cli)

### 1. Instalar o Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Autenticar

```bash
firebase login
```

### 3. Associar ao projeto Firebase

Edite `.firebaserc` e substitua `YOUR_FIREBASE_PROJECT_ID` pelo ID real do seu projeto:

```json
{
  "projects": {
    "default": "seu-projeto-firebase-id"
  }
}
```

### 4. Instalar dependências das Functions

```bash
cd functions
npm install
```

### 5. Configurar credenciais do frontend

Edite `auth.js` e substitua os valores de `firebaseConfig` com as credenciais do seu projeto Firebase:

```js
const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'SEU_PROJETO.firebaseapp.com',
  projectId: 'SEU_PROJETO',
  storageBucket: 'SEU_PROJETO.appspot.com',
  messagingSenderId: 'SEU_SENDER_ID',
  appId: 'SEU_APP_ID'
};
```

> As credenciais estão disponíveis no console do Firebase em **Configurações do Projeto > Seus apps**.

---

## Variáveis de Ambiente

As Cloud Functions utilizam variáveis de ambiente que devem ser configuradas via Firebase:

```bash
firebase functions:config:set cpf.secret="SUA_CHAVE_HEX_64_CHARS" backup.bucket="nome-do-bucket-gcs"
```

| Variável | Descrição |
|---|---|
| `CPF_SECRET` | Chave AES-256 (64 caracteres hexadecimais) para criptografia do CPF |
| `BACKUP_BUCKET` | Nome do bucket do Google Cloud Storage para backups |

---

## Executando Localmente

Use o emulador do Firebase para desenvolver e testar sem afetar dados de produção:

```bash
firebase emulators:start
```

| Serviço | Porta padrão |
|---|---|
| Firebase Hosting | http://localhost:5000 |
| Cloud Functions | http://localhost:5001 |
| Cloud Firestore | http://localhost:8080 |

---

## Deploy

```bash
# Deploy completo (hosting + functions + rules)
firebase deploy

# Apenas hosting
firebase deploy --only hosting

# Apenas functions
firebase deploy --only functions

# Apenas regras de segurança
firebase deploy --only firestore:rules,storage:rules
```

---

## Papéis de Usuário

| Role | Permissões |
|---|---|
| `admin` | Acesso total a todos os recursos e dados |
| `professor` | Criar e editar simulados e questões; visualizar resultados dos alunos |
| `monitor` | Suporte a alunos; acesso limitado a resultados |
| `aluno` | Realizar simulados, acessar materiais e cursos, ver próprio desempenho |
| `visitante` | Acesso apenas a conteúdo público |

---

## Planos e Pagamento

A plataforma suporta múltiplos planos de acesso. O campo `plan` no perfil do usuário e o campo `paymentStatus` (`paid`, `pending`, `cancelled`) controlam o acesso aos recursos premium.

---

> Desenvolvido por **Prof. Betão** — Preparatório SEDES-DF
