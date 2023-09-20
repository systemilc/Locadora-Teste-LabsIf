const sqlite3 = require('sqlite3').verbose();
const banco = new sqlite3.Database('./src/database/locadora.sqlite');

const atualizarCarro = (req, res) => {
  try {
    const carroId = req.params.id;
    const { modelo, marca, descricao, preco_aluguel, categoria, disponivel } = req.body;
   
    if (!modelo || !marca || !descricao || !preco_aluguel || !categoria || !disponivel) {
      return res.status(400).json({ error: "É necessário informar todos os campos para criar ou atualizar um veículo." })
  }

    const selectQuery = "SELECT * FROM carros WHERE id = ?";
    banco.get(selectQuery, [carroId], (Err, row) => {
      if (Err) {
        res.status(500).json({ error: 'Erro ao verificar a existência do carro' });
      } else if (!row) {
        res.status(404).json({ error: 'Carro não encontrado' });
      } else {
        const updateQuery = `
          UPDATE carros 
          SET modelo = ?, marca = ?, descricao = ?, preco_aluguel = ?, categoria = ?, disponivel = ?
          WHERE id = ?
        `;
        
        banco.run(
          updateQuery,
          [modelo, marca, descricao, preco_aluguel, categoria, disponivel, carroId],
          (Err) => {
            if (Err) {
              res.status(500).json({ error: 'Erro ao atualizar o carro' });
            } else {
              res.status(200).json({ message: 'Carro atualizado com sucesso' });
            }
          }
        );
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  atualizarCarro
};