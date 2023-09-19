const sqlite3 = require('sqlite3').verbose();
const banco = new sqlite3.Database('./src/locadora.sqlite');

const verificarIdCarro = (req, res, next) => {
    const carroId = req.params.id;
    const query = "SELECT * FROM carros WHERE id = ?";
    
    banco.get(query, [carroId], (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao verificar o ID do carro' });
      } else if (!row) {
        res.status(404).json({ error: 'Não foi possível encontrar o carro' });
      } else {
         next();
      }
    });
  };
  
  module.exports = {
    verificarIdCarro
  };
  