const sqlite3 = require('sqlite3').verbose();
const banco = new sqlite3.Database('./src/locadora.sqlite');

const listarCarros = async (req, res) => {
  try {
   const rows = await new Promise((resolve, reject) => {
     banco.all("SELECT * FROM carros", (err, rows) => {
       if (err) {
         reject(err);
       } else {
         resolve(rows);
       }
     });
   });

   if (rows.length === 0) {
     return res.status(404).json({ error: 'Não existem carros cadastrados' });
   }

   res.status(200).json({ carros: rows });
 } catch (error) {
   res.status(500).json({ error: 'Erro: Não foi possível listar os veículos' });
 }
};


const listarCarrosDisponiveis = async (req, res) => {
  console.log('Entrei na rota')
  try {
    const rows = await new Promise((resolve, reject) => {
      banco.all("SELECT * FROM carros WHERE disponivel = true", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    if (rows.length === 0) {
      res.status(404).json({ error: 'No momento, todos os carros estão alugados' });
    } else {
      res.status(200).json({ carros: rows });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro: Não foi possível listar os carros disponíveis' });
  }
};

const listarCarrosAlugados = async (req, res) => {
  console.log('Entrei na rota')
  try {
    const rows = await new Promise((resolve, reject) => {
      banco.all("SELECT * FROM carros WHERE disponivel = false", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    if (rows.length === 0) {
      res.status(404).json({ error: 'No momento todos os carros estão disponíveis' });
    } else {
      res.status(200).json({ carros: rows });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro: Não foi possível listar os carros disponíveis' });
  }
};

const listarCarroId = (req, res) => {
  try {
    const carroId = req.params.id;
    const query = "SELECT * FROM carros WHERE id = ?";
    banco.get(query, [carroId], (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao buscar o carro' });
      } else if (!row) {
        res.status(404).json({ error: 'Carro não encontrado' });
      } else {
        res.status(200).json({ carro: row });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  listarCarros,
  listarCarrosDisponiveis,
  listarCarrosAlugados,
  listarCarroId
};