<div align="center">

  <h1 align="center">Mesibo API Integration</h1>

  [<img src="https://mesibo.com/assets/images/favicon/favicon-32x32.png"/>](https://mesibo.com)

  <p align="center">
    <strong>1-1 video call integration with the Mesibo platform using Node.js.</strong>
  </p>

  [![pt-BR](https://img.shields.io/badge/lang-pt--BR-green.svg)](./README.md)   [![en](https://img.shields.io/badge/lang-en-red.svg)](./README-en.md)

</div>

---

## Requirements ⚙️

- Node.js v16+
- NPM or Yarn

---

## Installation 🔧

1. Clone the repository:

   ```bash
   git clone
   cd api-mesibo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the root of the project and add:

   ```env
   MESIBO_TOKEN=<your_access_key>
   ```

---

## Usage 🚀

1. Start the server:

   ```bash
   node server.js
   ```

2. Access the application in the browser:

   ```
   http://localhost:3000/video-call
   ```

3. Use the queries to configure the video call:

   ```
   http://localhost:3000/video-call?token=<user_access_token>&to=<receiver_id>
   ```

4. Generate an access token for the user with the endpoint:

   ```bash
   POST /generate-token
   ```

   **Request Body:**

   ```json
   {
     "address": "user_address",
     "receiver": "receiver_address"
   }
   ```

   **Response:**

   ```json
   {
     "message": "Access token and link generated successfully.",
     "token": "<user_access_token>",
     "url": "/video-call?token=<user_access_token>&to=<receiver_address>"
   }
   ```

---

## Endpoints

### `GET /video-call`

Returns the HTML interface for the video call.

- **Query Parameters:**
  - `token` (string): User's access token.
  - `to` (string): Recipient's address.

### `POST /generate-token`

Generates an access token for the user and returns the link to start the call.

- **Body Parameters:**

  - `address` (string): User's address.
  - `receiver` (string): Recipient's address.

- **Response:**

  - `message` (string): Success or error message.
  - `token` (string): User's access token.
  - `url` (string): URL to start the video call.

---

## Integration Flow 🔄

The API can be integrated into any platform that requires 1-1 video calls, following this flow:

1. **Token and Link Generation**:
   - When a user wants to start a video session, the system makes a `POST` request to the `/generate-token` endpoint, passing the caller's and recipient's identifiers.
   - The API returns a unique access token and a link for the video call.

2. **Video Call Link**:
   - The generated link contains the `token` and `to` parameters, which are used to redirect users to the video call interface.
   - Example of generated link:
     ```
     http://localhost:3000/video-call?token=<user_access_token>&to=<receiver_address>
     ```

3. **Video Interface**:
   - The API provides an HTML page that loads the Mesibo interface to start the video call.

---

## Technologies Used 💻

- **Node.js**: Runtime environment for the backend.
- **Express**: Framework for creating routes.
- **Axios**: HTTP client for making external API calls.
- **Mesibo API**: Platform for video calls.
- **HTML/CSS/JavaScript**: Frontend user interface development.

---

## License 📜

This project is licensed under the MIT license. See the [LICENSE](./LICENSE) file for more details.
