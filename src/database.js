const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/locadora.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS carros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      modelo TEXT,
      marca TEXT,
      descricao TEXT,
      preco_aluguel REAL,
      categoria TEXT,
      disponivel BOOLEAN
    )
  `);

  db.run(`
    INSERT INTO carros (modelo, marca, descricao, preco_aluguel, categoria, disponivel)
    VALUES ('Toyota Corolla', 'Toyota', 'Um sedã popular com bom consumo de combustível.', 120.00, 'Sedã', 1)
  `);

  db.run(`
    INSERT INTO carros (modelo, marca, descricao, preco_aluguel, categoria, disponivel)
    VALUES ('Honda Civic', 'Honda', 'Um sedã esportivo com ótimo desempenho.', 140.00, 'Sedã', 1)
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS aluguel (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      carro_id INT,
      data_hora_inicio DATETIME,
      data_hora_fim DATETIME,
      FOREIGN KEY (carro_id) REFERENCES carros(id)
    )
  `);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conexão com o banco de dados fechada.');
});
