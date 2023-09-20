const { novoCarroDao } = require("../dao/carroDao");

const novoCarro = (req, res) => {
    try {
      const { modelo, marca, descricao, preco_aluguel, categoria, disponivel } = req.body;
      
      if (!modelo || !marca || !descricao || !preco_aluguel || !categoria || !disponivel) {
        return res.status(400).json({ error: "É necessário informar todos os campos para criar ou atualizar um veículo." })
    }
       novoCarroDao(res, modelo, marca, descricao, preco_aluguel, categoria, disponivel) ;
       
       res.status(201).json({ message: 'Novo carro criado com sucesso'});
        
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };

  module.exports ={
    novoCarro
  }
  