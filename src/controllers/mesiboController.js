import { generateUserAcessToken } from "../services/mesiboServices.js";

class MesiboController {
  static async createUserToken(req, res) {
    try {
      const { address, appId } = req.body;

      if (!address || !appId) {
        return res.status(400).json({ message: 'O endereço e o ID do aplicativo são obrigatórios.' });
      }

      const response = await generateUserAcessToken(address, appId);

      if (response && response.result) {
        return res.status(200).json({
          message: 'Token de acesso do usuário gerado com sucesso.',
          token: response.user.token
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
