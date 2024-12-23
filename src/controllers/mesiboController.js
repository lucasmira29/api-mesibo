import { generateUserAcessToken } from "../services/mesiboServices.js";

class MesiboController {
  static async createUserToken(req, res) {
    try {
      const { address, receiver } = req.body;

      if (!address || !receiver) {
        return res.status(400).json({ message: 'O endereço e destinatário são obrigatórios.' });
      }

      const response = await generateUserAcessToken(address);

      if (response && response.result) {
        const route = `/video-chamada?token=${response.user.token}&to=${receiver}`;

        return res.status(200).json({
          message: 'Token de acesso e link gerado com sucesso.',
          token: response.user.token,
          url: route // URL relativa com token e destinatário
        });
      } else {
        return res.status(400).json({ message: 'Erro ao gerar o token de acesso do usuário', erro: response });
      }

    } catch (error) {
      res.status(500).json({ message: 'Ocorreu um erro ao gerar o token de acesso do usuário.', error: error.message });
    }
  }
}

export default MesiboController;
