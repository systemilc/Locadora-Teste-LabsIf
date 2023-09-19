const sqlite3 = require('sqlite3').verbose();
const banco = new sqlite3.Database('./src/locadora.sqlite');

const NovoCarro = (req, res) => {
    try {
      const { modelo, marca, descricao, preco_aluguel, categoria, disponivel } = req.body;
      const query = `
        INSERT INTO carros (modelo, marca, descricao, preco_aluguel, categoria, disponivel)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      banco.run(
        query,
        [modelo, marca, descricao, preco_aluguel, categoria, disponivel],
        function (err) {
          if (err) {
            res.status(500).json({ error: 'Erro, não foi possível criar o novo carro' });
          } else {
            res.status(201).json({ message: 'Novo carro criado com sucesso'});
          }
        }
      );
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };

  module.exports ={
    NovoCarro
  }
  