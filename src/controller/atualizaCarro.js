const { atualizarCarroDao } = require("../dao/carroDao");

const enviarResposta = (res, status, message) => {
  res.status(status).json({ message });
};

const atualizarCarro = async (req, res) => {
  try {
    const carroId = req.params.id;
    const { modelo, marca, descricao, preco_aluguel, categoria, disponivel } = req.body;

    if (!modelo || !marca || !descricao || !preco_aluguel || !categoria || !disponivel) {
      return res.status(400).json({ error: "É necessário informar todos os campos para criar ou atualizar um veículo." });
    }

    await atualizarCarroDao(carroId, { modelo, marca, descricao, preco_aluguel, categoria, disponivel });
    enviarResposta(res, 200, 'Carro atualizado com sucesso');
  } catch (error) {
    if (error.message === 'Carro não encontrado') {
      enviarResposta(res, 404, 'Carro não encontrado');
    } else if (error.message === 'Erro ao verificar a existência do carro') {
      enviarResposta(res, 500, 'Erro ao verificar a existência do carro');
    } else {
      enviarResposta(res, 500, 'Erro interno do servidor');
    }
  }
};

module.exports = {
  atualizarCarro
};