const { alugarCarroDao } = require("../dao/carroDao");

const enviarResposta = (res, status, message) => {
  res.status(status).json({ message });
};

const alugarCarro = async (req, res) => {
  try {
    const { carroId } = req.body;
    await alugarCarroDao(carroId);
    enviarResposta(res, 201, 'Carro alugado com sucesso');
  } catch (error) {
    console.log(error);
    if (error.message === 'Carro não encontrado') {
      enviarResposta(res, 404, 'Carro não encontrado');
    } else if (error.message === 'O carro não está disponível para aluguel') {
      enviarResposta(res, 400, 'O carro não está disponível para aluguel');
    } else {
      enviarResposta(res, 500, 'Erro interno do servidor');
    }
  }
};

module.exports = {
  alugarCarro,
};