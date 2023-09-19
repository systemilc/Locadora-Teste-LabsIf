const sqlite3 = require('sqlite3').verbose();
const banco = new sqlite3.Database('./src/locadora.sqlite');

const atualizarCarro = (req, res) => {
  try {
    const carroId = req.params.id;
    const { modelo, marca, descricao, preco_aluguel, categoria, disponivel } = req.body;
    const query = `
      UPDATE carros 
      SET modelo = ?, marca = ?, descricao = ?, preco_aluguel = ?, categoria = ?, disponivel = ?
      WHERE id = ?
    `;

    banco.run(
      query,
      [modelo, marca, descricao, preco_aluguel, categoria, disponivel, carroId],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Erro ao atualizar o carro' });
        } /*else if (result.changes === 0) {
          res.status(404).json({ error: 'Carro não encontrado' });
        }*/ else {
          res.status(200).json({ message: 'Carro atualizado com sucesso' });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  atualizarCarro
};