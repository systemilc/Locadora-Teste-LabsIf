const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const banco = new sqlite3.Database('./src/database/locadora.sqlite');
const { format, addDays } = require('date-fns');
const qtdeDias = 7;

const novoCarroDao = (res, modelo, marca, descricao, preco_aluguel, categoria, disponivel) => {
  const query = `
        INSERT INTO carros (modelo, marca, descricao, preco_aluguel, categoria, disponivel)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      banco.run(
        query,
        [modelo, marca, descricao, preco_aluguel, categoria, disponivel]
      );
    }      

const listarCarroDao = async () => {    
    const rows = await new Promise((resolve, reject) => {

        banco.all("SELECT * FROM carros", (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        
    });
    return rows;
   
}

const listarCarrosDisponiveisDao = async ()=>{
    const rows = await new Promise((resolve, reject) => {
        banco.all("SELECT * FROM carros WHERE disponivel = true", (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
      return rows;
}

const listarCarrosAlugadosDao = async ()=>{
    const query = `
      SELECT carros.*, MAX(aluguel.data_hora_fim) AS data_hora_fim
      FROM carros
      LEFT JOIN aluguel ON carros.id = aluguel.carro_id
      WHERE carros.disponivel = 0
      GROUP BY carros.id
    `;

    const rows = await new Promise((resolve, reject) => {
      banco.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
      return rows;
}

const listarCarroIdDao = (req, res) => {
    return new Promise((resolve, reject) => {
      const carroId = req.params.id;
      const query = "SELECT * FROM carros WHERE id = ?";
  
      banco.get(query, [carroId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  };

  const deletarCarroIdDao = (carroId) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM carros WHERE id = ?";
      banco.run(query, [carroId], function (err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          reject(new Error('Carro não encontrado'));
        } else {
          resolve();
        }
      });
    });
  };

  const atualizarCarroDao = (carroId, { modelo, marca, descricao, preco_aluguel, categoria, disponivel }) => {
    return new Promise((resolve, reject) => {
      const selectQuery = "SELECT * FROM carros WHERE id = ?";
      banco.get(selectQuery, [carroId], (Err, row) => {
        if (Err) {
          reject(new Error('Erro ao verificar a existência do carro'));
        } else if (!row) {
          reject(new Error('Carro não encontrado'));
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
                reject(new Error('Erro ao atualizar o carro'));
              } else {
                resolve();
              }
            }
          );
        }
      });
    });
  };

const alugarCarroDao = async (carroId) => {
  const db = await open({
    filename: './src/database/locadora.sqlite',
    driver: sqlite3.Database,
  });

  const carro = await db.get('SELECT * FROM carros WHERE id = ?', [carroId]);

  if (!carro) {
    throw new Error('Carro não encontrado');
  }
  if (carro.disponivel !== 1) {
    throw new Error('O carro não está disponível para aluguel');
  }

  const dataInicio = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
  const dataFim = format(addDays(new Date(), qtdeDias), 'dd-MM-yyyy HH:mm:ss');

  await db.run('BEGIN TRANSACTION');
  const queryInserirAluguel = `
    INSERT INTO aluguel (carro_id, data_hora_inicio, data_hora_fim)
    VALUES (?, ?, ?)
  `;
  const queryAtualizarStatus = `
    UPDATE carros
    SET disponivel = 0
    WHERE id = ?
  `;

  await db.run(queryInserirAluguel, [carroId, dataInicio, dataFim]);
  await db.run(queryAtualizarStatus, [carroId]);
  await db.run('COMMIT');
};

const enviarResposta = (res, status, message) => {
  res.status(status).json({ message });
};

  
    

module.exports = {
    novoCarroDao,
    listarCarroDao,
    listarCarrosDisponiveisDao,
    listarCarrosAlugadosDao,
    listarCarroIdDao,
    deletarCarroIdDao,
    atualizarCarroDao,
    alugarCarroDao
}    