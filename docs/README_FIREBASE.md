# Firebase Integration for Simulados

## Instruções para inicializar

1. Instale o Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Faça login:
   ```bash
   firebase login
   ```
3. Inicialize o projeto:
   ```bash
   firebase init
   ```
   Selecione: Firestore, Functions, Hosting, Storage.

4. Atualize `.firebaserc` com o ID do projeto.
5. Preencha `auth.js` com as credenciais do Firebase.

## Como usar

- `auth.js` contém as funções de registro, login, logout, reset de senha, verificação de e-mail e leitura de perfil de usuário.
- `firestore.rules` protege todas as coleções e valida tipos, tamanho e permissões.
- `storage.rules` permite upload de fotos de perfil e arquivos de simulado com checagem de tipo e tamanho.
- `functions/index.js` implementa basicamente auditoria, backup e criptografia de CPF.

## Regras de segurança

- `users` apenas leitura/escrita do próprio usuário ou admin
- `simulados` criação/edição por admin ou professor proprietário
- `questoes` criação/edição por admin ou professor proprietário
- `redacoes` apenas leitura por autor/admin/professor responsável
- `resultados` escrita pelo dono ou admin; leitura por professor/admin
- `assinaturas` apenas dono e admin; atualização e exclusão apenas admin
- `logs` somente admins podem ler; qualquer usuário autenticado pode criar seu próprio log

## Backups

O modelo de backup deve usar Cloud Scheduler + Cloud Functions ou `gcloud firestore export`.

## Testes

- Use o emulador do Firebase para testar regras localmente:
  ```bash
  firebase emulators:start
  ```
