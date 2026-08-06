# Arquitetura Firebase para o Sistema de Simulados

## Visão geral

Este projeto utiliza o ecossistema Firebase para oferecer autenticação, persistência de dados, armazenamento e funções serverless com segurança de nível profissional.

Tecnologias definidas:
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Firebase Functions
- Firebase Hosting
- Firebase Security Rules

## Coleções principais

### `users`
Documentos de usuários cadastrados.
Campos principais:
- `name`: string
- `email`: string
- `cpfEncrypted`: string (dados sensíveis criptografados)
- `phone`: string
- `role`: string (`admin`, `professor`, `monitor`, `aluno`, `visitante`)
- `plan`: string
- `paymentStatus`: string (`paid`, `pending`, `cancelled`)
- `status`: string (`active`, `inactive`)
- `permissions`: map
- `createdAt`: timestamp
- `lastLogin`: timestamp
- `photoUrl`: string
- `updatedAt`: timestamp

Subcoleções:
- `users/{userId}/loginLogs`
- `users/{userId}/securityEvents`

### `simulados`
Configuração dos simulados.
Campos principais:
- `name`: string
- `category`: string
- `exam`: string
- `position`: string
- `description`: string
- `questionCount`: number
- `weight`: number
- `durationMinutes`: number
- `createdAt`: timestamp
- `professorId`: string
- `status`: string (`draft`, `published`, `archived`)
- `tags`: array

Subcoleções:
- `simulados/{simuladoId}/questions`
- `simulados/{simuladoId}/attempts`

### `questoes`
Banco de questões reutilizáveis.
Campos principais:
- `question`: string
- `options`: array
- `correctAnswer`: string
- `explanation`: string
- `subject`: string
- `difficulty`: string (`easy`, `medium`, `hard`)
- `weight`: number
- `authorId`: string
- `createdAt`: timestamp
- `updatedAt`: timestamp

### `redacoes`
Textos enviados pelos alunos.
Campos principais:
- `userId`: string
- `tema`: string
- `submissionText`: string
- `grade`: number
- `review`: string
- `comments`: string
- `professorId`: string
- `submittedAt`: timestamp
- `reviewedAt`: timestamp

### `resultados`
Resultados dos simulados.
Campos principais:
- `userId`: string
- `simuladoId`: string
- `correctCount`: number
- `wrongCount`: number
- `percentage`: number
- `score`: number
- `timeSpentSeconds`: number
- `ranking`: number
- `attemptedAt`: timestamp
- `history`: array

### `assinaturas`
Assinaturas e histórico financeiro.
Campos principais:
- `userId`: string
- `plan`: string
- `price`: number
- `purchaseDate`: timestamp
- `expiryDate`: timestamp
- `status`: string (`active`, `expired`, `cancelled`)
- `transactionHistory`: array

Subcoleções:
- `assinaturas/{assinaturaId}/transactions`

### `logs`
Auditoria e rastreamento de eventos.
Campos principais:
- `actorId`: string
- `actorRole`: string
- `action`: string
- `resource`: string
- `resourceId`: string
- `changeType`: string (`create`, `update`, `delete`, `login`, `logout`, `password_change`)
- `details`: map
- `ip`: string
- `userAgent`: string
- `location`: string
- `device`: string
- `createdAt`: timestamp

## Segurança e permissões

- Usuário autenticado só acessa seus próprios dados.
- Administrador tem acesso total.
- Professor só acessa simulados e questões autorizadas.
- Aluno não pode alterar notas, simulado ou assinaturas de outros usuários.
- Leitura e escrita pública são bloqueadas.
- Campos são validados por tipo, tamanho e existência obrigatória.

## Backup e recuperação

- A arquitetura prevê backups agendados para:
  - diário
  - semanal
  - mensal
- Scripts de backup usam `gcloud firestore export` e `gcloud firestore import`.
- O versionamento de dados fica registrado nos backups armazenados em bucket Cloud Storage.

## Observações

- Senhas devem ser gerenciadas via Firebase Authentication e nunca armazenadas em texto.
- Dados sensíveis como CPF devem ser criptografados antes de gravar no banco.
- A aplicação deve usar HTTPS e tokens seguros em todas as chamadas.
- Regras de segurança do Firestore e Storage são a primeira linha de defesa.
