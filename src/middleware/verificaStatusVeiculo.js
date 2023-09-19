const sqlite3 = require('sqlite3').verbose();
const banco = new sqlite3.Database('./src/locadora.sqlite');

const verificarDisponibilidade = (req, res, next) => {
  try {
    const carroId = req.params.id;
    const query = "SELECT disponivel FROM carros WHERE id = ?";
    
    banco.get(query, [carroId], (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao verificar a disponibilidade do carro' });
      } else if (row && row.disponivel === 0) {
        res.status(400).json({ error: 'Só é possível deletar um carro com status disponível' });
      } else {
        next();
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  verificarDisponibilidade
};
