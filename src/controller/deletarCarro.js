const sqlite3 = require('sqlite3').verbose();
const banco = new sqlite3.Database('./src/database/locadora.sqlite');

const deletarCarroId = (req, res) => {
    try {
      const carroId = req.params.id;
      const query = "DELETE FROM carros WHERE id = ?";
      banco.run(query, [carroId], function (err) {
        if (err) {
          res.status(500).json({ error: 'Erro ao excluir o carro' });
        } else if (this.changes === 0) {
          res.status(404).json({ error: 'Carro não encontrado' });
        } else {
          res.status(200).json({ message: 'Carro excluído com sucesso' });
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };
  
  module.exports = {
    deletarCarroId
  }