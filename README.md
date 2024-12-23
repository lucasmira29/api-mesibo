# API Mesibo Integration

Este projeto implementa uma API em Node.js para integrar a funcionalidade de chamadas de vídeo 1-1 utilizando a plataforma **Mesibo**. Ele também retorna uma página HTML contendo o frontend responsável por gerenciar a chamada de vídeo.

---

## Estrutura do Projeto

```plaintext
api-mesibo/
┣ 📂public
┃ ┣ 📂css
┃ ┃ ┗ style.css
┃ ┣ 📂js
┃ ┃ ┗ main.js
┃ ┗ index.html
┣ 📂src
┃ ┣ 📂config
┃ ┃ ┗ mesiboConfig.js
┃ ┣ 📂controllers
┃ ┃ ┗ mesiboController.js
┃ ┣ 📂routes
┃ ┃ ┗ mesiboRoutes.js
┃ ┣ 📂services
┃ ┃ ┗ mesiboServices.js
┃ ┗ app.js
┣ .env
┣ .gitignore
┣ eslint.config.js
┣ package-lock.json
┣ package.json
┣ README.md
┗ server.js
```

---

## Requisitos

- Node.js v16+
- NPM ou Yarn

---

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/lucasmira29/api-mesibo.git
   cd api-mesibo
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto e adicione:

   ```env
   MESIBO_ACCESS_KEY=<seu_access_key>
   ```

---

## Uso

1. Inicie o servidor:

   ```bash
   npm start
   ```

2. Acesse a aplicação no navegador:

   ```
   http://localhost:3000/video-chamada
   ```

3. Utilize as queries para configurar a chamada de vídeo:

   ```
   http://localhost:3000/video-chamada?token=<user_access_token>&to=<receiver_id>
   ```

4. Gere um token de acesso para o usuário com o endpoint:

   ```bash
   POST /generate-token
   ```

   **Corpo da requisição:**

   ```json
   {
     "address": "user_address",
     "receiver": "receiver_address"
   }
   ```

   **Resposta:**

   ```json
   {
     "message": "Token de acesso e link gerado com sucesso.",
     "token": "<user_access_token>",
     "url": "/video-chamada?token=<user_access_token>&to=<receiver_address>"
   }
   ```

---

## Endpoints

### `GET /video-chamada`

Retorna a interface HTML para a chamada de vídeo.

- **Query Parameters:**
  - `token` (string): Access token do usuário.
  - `to` (string): Endereço do destinatário.

### `POST /generate-token`

Gera um token de acesso para o usuário e retorna o link para iniciar a chamada.

- **Body Parameters:**

  - `address` (string): Endereço do usuário.
  - `receiver` (string): Endereço do destinatário.

- **Resposta:**

  - `message` (string): Mensagem de sucesso ou erro.
  - `token` (string): Token de acesso do usuário.
  - `url` (string): URL para iniciar a chamada.

---

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o back-end.
- **Express**: Framework para a criação das rotas.
- **Axios**: Cliente HTTP para chamadas de APIs externas.
- **Mesibo API**: Plataforma para chamadas de vídeo.
- **HTML/CSS/JavaScript**: Construção da interface do usuário.

---
