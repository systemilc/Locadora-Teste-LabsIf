const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const { format, addDays } = require('date-fns');
const qtdeDias = 7;

const alugarCarro = async (req, res) => {
  try {
    const { carroId } = req.body;
    const db = await open({
      filename: './src/database/locadora.sqlite',
      driver: sqlite3.Database,
    });

    const carro = await db.get('SELECT * FROM carros WHERE id = ?', [carroId]);

    if (!carro) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }
    if (carro.disponivel !== 1) {
      return res.status(400).json({ error: 'O carro não está disponível para aluguel' });
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

    res.status(201).json({ message: 'Carro alugado com sucesso' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  alugarCarro,
};
