const { deletarCarroIdDao } = require("../dao/carroDao");

const enviarResposta = (res, status, message) => {
    res.status(status).json({ message });
  };
  
const deletarCarroId = async (req, res) => {
    try {
      const carroId = req.params.id;
      await deletarCarroIdDao(carroId);
      enviarResposta(res, 200, 'Carro excluído com sucesso');
    } catch (error) {
      if (error.message === 'Carro não encontrado') {
        enviarResposta(res, 404, 'Carro não encontrado');
      } else {
        enviarResposta(res, 500, 'Erro interno do servidor');
      }
    }
  };
  
  module.exports = {
    deletarCarroId
  }