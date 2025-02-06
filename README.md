<div align="center">
  
  <h1 align="center">API Mesibo Integration </h1>    

  <p align="center">
    <strong>Integração de chamadas de vídeo 1-1 com a plataforma Mesibo usando Node.js.</strong>
  </p>

  [![pt-BR](https://img.shields.io/badge/lang-pt--BR-green.svg)](./README.md)   [![en](https://img.shields.io/badge/lang-en-red.svg)](./README-en.md)

</div>

---

## Requisitos ⚙️

- Node.js v16+
- NPM ou Yarn

---

## Instalação 🔧

1. Clone o repositório:

   ```bash
   git clone
   cd api-mesibo
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto e adicione:

   ```env
   MESIBO_TOKEN=<seu_access_key>
   ```

---

## Uso 🚀

1. Inicie o servidor:

   ```bash
   node server.js
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

## Fluxo de Integração 🔄

A API pode ser integrada a qualquer plataforma que necessite de chamadas de vídeo 1-1, seguindo o seguinte fluxo:

1. **Geração de Token e Link**:
   - Quando um usuário deseja iniciar uma sessão de vídeo, o sistema faz uma requisição `POST` para o endpoint `/generate-token`, passando os identificadores do chamador e do destinatário.
   - A API retorna um token de acesso exclusivo e um link para a chamada de vídeo.

2. **Link da Chamada**:
   - O link gerado contém os parâmetros `token` e `to`, que são utilizados para redirecionar os usuários para a interface da chamada de vídeo.
   - Exemplo de link gerado:
     ```
     http://localhost:3000/video-chamada?token=<user_access_token>&to=<receiver_address>
     ```

3. **Interface de Vídeo**:
   - A API fornece uma página HTML que carrega a interface da Mesibo para iniciar a chamada de vídeo.

---

## Tecnologias Utilizadas 💻

- **Node.js**: Ambiente de execução para o back-end.
- **Express**: Framework para a criação das rotas.
- **Axios**: Cliente HTTP para chamadas de APIs externas.
- **Mesibo API**: Plataforma para chamadas de vídeo.
- **HTML/CSS/JavaScript**: Construção da interface do usuário.

---

## Licença 📜

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
